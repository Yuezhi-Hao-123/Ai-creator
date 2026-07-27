import { type NextRequest, NextResponse } from "next/server";
import { buildTopicPrompt } from "@/lib/prompts";
import { callDeepSeek } from "@/lib/ai-client";
import { parseJSONResponse } from "@/lib/result-parser";
import { TopicGenerationResultSchema } from "@/lib/types";

/**
 * POST /api/topics
 * Body: { topic: string, profile_id?: string }
 * Returns: { ideas: TopicIdea[] }
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      topic?: string;
      profile_id?: string;
    };

    // Validate
    if (!body.topic || body.topic.trim().length === 0) {
      return NextResponse.json(
        { error: "Topic is required." },
        { status: 400 }
      );
    }

    if (body.topic.trim().length > 200) {
      return NextResponse.json(
        { error: "Topic must be 200 characters or fewer." },
        { status: 400 }
      );
    }

    // Build prompt (profile_id is reserved for future use)
    const messages = buildTopicPrompt(body.topic.trim());

    // Call AI
    const raw = await callDeepSeek(messages);

    // Parse + validate
    const result = parseJSONResponse(raw, TopicGenerationResultSchema);

    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/topics error:", err);

    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    // Determine appropriate status code
    const status = message.includes("not configured")
      ? 500
      : message.includes("invalid")
        ? 401
        : message.includes("timed out")
          ? 504
          : message.includes("parse")
            ? 502
            : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
