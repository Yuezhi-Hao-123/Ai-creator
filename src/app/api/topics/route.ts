import { type NextRequest, NextResponse } from "next/server";
import { buildTopicPrompt } from "@/lib/prompts";
import { callDeepSeek } from "@/lib/ai-client";
import { parseJSONResponse } from "@/lib/result-parser";
import { TopicGenerationResultSchema } from "@/lib/types";
import { createClient } from "@supabase/supabase-js";

/**
 * POST /api/topics
 * Body: { topic: string, device_id?: string }
 * Loads creator profile for the device and injects into AI prompt.
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      topic?: string;
      device_id?: string;
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
    const messages = buildTopicPrompt(body.topic.trim(), profile);

    // Call AI
    const raw = await callDeepSeek(messages);

    // Parse + validate
    const result = parseJSONResponse(raw, TopicGenerationResultSchema);

    return NextResponse.json(result);
  } catch (err) {
    console.error("/api/topics error:", err);

    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

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
