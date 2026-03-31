import { NextRequest, NextResponse } from "next/server";
import { fetchTranscript } from "youtube-transcript";
import Anthropic from "@anthropic-ai/sdk";

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }

    // Fetch transcript
    let transcript: string;
    try {
      const entries = await fetchTranscript(videoId);
      transcript = entries.map((e) => e.text).join(" ");
    } catch {
      return NextResponse.json(
        { error: "Could not fetch transcript. The video may not have captions available." },
        { status: 422 }
      );
    }

    if (!transcript || transcript.trim().length < 50) {
      return NextResponse.json(
        { error: "Transcript is too short or empty." },
        { status: 422 }
      );
    }

    // Call Claude
    const client = new Anthropic();

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `You are an expert content analyst. Analyze the following YouTube video transcript and return a JSON object with this exact structure (no markdown, just raw JSON):

{
  "title": "A compelling title for the video content",
  "speakers": "Speaker names if mentioned, or 'Unknown'",
  "duration": "Estimated duration based on transcript length",
  "summary": ["paragraph1", "paragraph2", "paragraph3"],
  "takeaways": [
    {"emoji": "relevant emoji", "title": "short title", "description": "1-2 sentence explanation"}
  ],
  "topics": [
    {"label": "Topic Name", "colorClass": "purple|rose|blue|cyan|emerald|amber|orange|violet"}
  ]
}

Rules:
- summary should have 3-5 paragraphs
- takeaways should have 6-10 items
- topics should have 5-8 items
- Be specific and informative using actual content
- Use varied colorClass values from the list provided

TRANSCRIPT:
${transcript}`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    // Parse JSON from response
    let analysis;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      analysis = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      videoId,
      transcript: transcript.slice(0, 500) + "...",
      analysis,
    });
  } catch (error) {
    console.error("Summarize error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
