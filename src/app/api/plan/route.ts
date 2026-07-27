import { type NextRequest, NextResponse } from "next/server";
import { buildPlanPrompt } from "@/lib/prompts";
import { callDeepSeek } from "@/lib/ai-client";
import { parseJSONResponse } from "@/lib/result-parser";
import { ContentPlanResultSchema, TopicIdeaSchema } from "@/lib/types";

/**
 * POST /api/plan
 * Body: { selected_topic: TopicIdea, profile_id?: string }
 * Returns: ContentPlanResult
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      selected_topic?: unknown;
      profile_id?: string;
    };

    // Validate selected_topic
    if (!body.selected_topic) {
      return NextResponse.json(
        { error: "Selected topic is required." },
        { status: 400 }
      );
    }

    const topicResult = TopicIdeaSchema.safeParse(body.selected_topic);
    if (!topicResult.success) {
      return NextResponse.json(
        { error: "Invalid topic format. Expected { title, angle, description }." },
        { status: 400 }
      );
    }

    // Build prompt
    const messages = buildPlanPrompt(topicResult.data);

    // Call AI
    const raw = await callDeepSeek(messages);

    // Parse + validate
    const result = parseJSONResponse(raw, ContentPlanResultSchema);

    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/plan error:", err);

    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    return NextResponse.json(
      { error: message },
      { status: message.includes("not configured") ? 500 : 500 }
    );
  }
}
