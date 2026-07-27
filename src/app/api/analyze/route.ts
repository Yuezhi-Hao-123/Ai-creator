import { type NextRequest, NextResponse } from "next/server";
import { buildAnalysisPrompt } from "@/lib/prompts";
import { callDeepSeek } from "@/lib/ai-client";
import { parseJSONResponse } from "@/lib/result-parser";
import { calculateEngagement } from "@/lib/metrics";
import { createClient } from "@supabase/supabase-js";
import { AnalysisResultSchema, VideoMetricsSchema } from "@/lib/types";

/**
 * POST /api/analyze
 * Body: { metrics: VideoMetrics, video_topic?: string, profile_id?: string }
 * Returns: AnalysisResult
 */
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as {
      metrics?: unknown;
      video_topic?: string;
      profile_id?: string;
      model?: string;
      device_id?: string;
    };

    // Validate metrics
    if (!body.metrics) {
      return NextResponse.json(
        { error: "Video metrics are required." },
        { status: 400 }
      );
    }

    const metricsResult = VideoMetricsSchema.safeParse(body.metrics);
    if (!metricsResult.success) {
      return NextResponse.json(
        { error: "Invalid metrics. All fields must be non-negative integers." },
        { status: 400 }
      );
    }

    const metrics = metricsResult.data;

    // Check at least one non-zero value
    const allZero =
      metrics.views === 0 &&
      metrics.likes === 0 &&
      metrics.comments === 0 &&
      metrics.saves === 0 &&
      metrics.shares === 0;

    if (allZero) {
      return NextResponse.json(
        { error: "At least one metric must be greater than zero." },
        { status: 400 }
      );
    }

    // Calculate engagement
    const engagement = calculateEngagement(metrics);

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
      } catch { /* ignore */ }
    }

    // Build prompt
    const messages = buildAnalysisPrompt(
      metrics,
      engagement.rate,
      engagement.level,
      profile,
      body.video_topic
    );

    // Call AI
    const raw = await callDeepSeek(messages, body.model);

    // Parse AI suggestions
    const parsed = parseJSONResponse(
      raw,
      AnalysisResultSchema.pick({ suggestions: true })
    );

    // Combine computed + AI results
    const result = {
      engagement_rate: engagement.rate,
      engagement_level: engagement.level,
      suggestions: parsed.suggestions,
    };

    const validated = AnalysisResultSchema.parse(result);

    return NextResponse.json(validated);
  } catch (err) {
    console.error("/api/analyze error:", err);

    const message =
      err instanceof Error ? err.message : "An unexpected error occurred.";

    return NextResponse.json(
      { error: message },
      { status: message.includes("not configured") ? 500 : 500 }
    );
  }
}
