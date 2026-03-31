import { NextRequest, NextResponse } from "next/server";

async function generateWithOpenClaw(prompt: string): Promise<string> {
  const baseUrl = (process.env.OPENCLAW_URL || "").replace(/\/+$/, "");
  const token = process.env.OPENCLAW_TOKEN || "";
  const model = process.env.OPENCLAW_MODEL || "openclaw/default";

  if (!baseUrl) {
    throw new Error("OPENCLAW_URL is not set.");
  }

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
    throw new Error("OpenClaw response did not include content");
  }

  return text;
}

export async function POST(req: NextRequest) {
  try {
    const { idea, tone, length } = await req.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 3) {
      return NextResponse.json(
        { error: "Please provide a blog idea (at least a few words)." },
        { status: 400 }
      );
    }

    const toneInstruction = tone ? `Tone: ${tone}.` : "Tone: professional yet conversational.";
    const lengthInstruction =
      length === "short" ? "Keep it around 600-800 words." :
      length === "long" ? "Make it comprehensive, around 1800-2500 words." :
      "Aim for around 1000-1400 words.";

    const prompt = `You are an expert blog writer and content strategist. Write a complete, publish-ready blog article based on the following idea. Return a JSON object with this exact structure (no markdown wrapping, just raw JSON):

{
  "title": "Compelling, SEO-friendly blog title",
  "subtitle": "A one-line subtitle or tagline",
  "metaDescription": "SEO meta description under 160 characters",
  "readTime": "Estimated read time, e.g. '5 min read'",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "sections": [
    {
      "heading": "Section heading",
      "content": "Full paragraph(s) for this section. Use markdown for bold, italic, lists where appropriate."
    }
  ],
  "conclusion": "A strong closing paragraph with a call to action",
  "tweetThread": ["Tweet 1 (hook)", "Tweet 2", "Tweet 3 (CTA)"]
}

Rules:
- Write an engaging introduction as the first section (heading can be empty string for intro)
- Include 4-7 body sections with clear headings
- ${toneInstruction}
- ${lengthInstruction}
- Make it informative, actionable, and engaging
- Include specific examples, data points, or analogies where relevant
- The tweetThread should be a 3-tweet summary to promote the article
- Do NOT wrap the JSON in markdown code fences

BLOG IDEA: ${idea.trim()}`;

    let text: string;
    try {
      text = await generateWithOpenClaw(prompt);
    } catch (err) {
      console.error("OpenClaw error:", err);
      return NextResponse.json(
        { error: `AI service error: ${err instanceof Error ? err.message : "Unknown"}` },
        { status: 502 }
      );
    }

    let article;
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      article = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch {
      return NextResponse.json(
        { error: "Failed to parse AI response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ article });
  } catch (error) {
    console.error("Generate blog error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
