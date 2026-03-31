import { NextRequest, NextResponse } from "next/server";
import { fetchTranscript } from "youtube-transcript";

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

/**
 * Send a message via OpenClaw's OpenAI-compatible HTTPS API
 * and collect the full response.
 */
async function chatViaOpenClaw(prompt: string): Promise<string> {
  const gatewayUrl = process.env.OPENCLAW_URL;
  const token = process.env.OPENCLAW_TOKEN || "";
  const model = process.env.OPENCLAW_MODEL || "openclaw/default";

  if (!gatewayUrl) {
    throw new Error(
      "OPENCLAW_URL is not set. Use the public https:// gateway URL for your OpenClaw instance."
    );
  }

  const baseUrl = gatewayUrl.replace(/\/+$/, "");
  const response = await fetch(`${baseUrl}/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-openclaw-scopes": "operator.read,operator.write,operator.admin",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || data?.error || `OpenClaw request failed (${response.status})`
    );
  }

  const text = data?.choices?.[0]?.message?.content;
  if (!text || typeof text !== "string") {
    throw new Error("OpenClaw response did not include assistant content");
  }

  return text;
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

    const prompt = `You are an expert content analyst. Analyze the following YouTube video transcript and return a JSON object with this exact structure (no markdown, just raw JSON):

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
${transcript}`;

    // Call OpenClaw via HTTPS /v1/chat/completions
    let text: string;
    try {
      text = await chatViaOpenClaw(prompt);
    } catch (err) {
      console.error("OpenClaw error:", err);
      return NextResponse.json(
        { error: `AI service error: ${err instanceof Error ? err.message : "Unknown"}` },
        { status: 502 }
      );
    }

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
