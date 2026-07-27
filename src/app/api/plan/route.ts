import { type NextRequest, NextResponse } from "next/server";
import { buildPlanPrompt } from "@/lib/prompts";
import { callDeepSeek } from "@/lib/ai-client";
import { parseJSONResponse } from "@/lib/result-parser";
import { ContentPlanResultSchema, TopicIdeaSchema } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/plan
 * Body: { selected_topic: TopicIdea, device_id?: string }
 * Loads creator profile and injects into AI prompt.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      selected_topic?: unknown;
      device_id?: string;
      model?: string;
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

    // Load creator profile if device_id provided
    let profile = null;
    if (body.device_id) {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data } = await supabase
          .from("creator_profiles")
          .select("*")
          .eq("device_id", body.device_id)
          .maybeSingle();
        profile = data;
      } catch {
        // Profile not available — continue without it
      }
    }

    // Build prompt with profile context
    const messages = buildPlanPrompt(topicResult.data, profile);

    // Call AI
    const raw = await callDeepSeek(messages, body.model);

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
