import type { VideoMetrics, EngagementMetrics, EngagementLevel } from "./types";

/**
 * MetricsService — calculates engagement rate and level.
 * Pure computation, no side effects.
 *
 * Formula: (likes + comments + saves + shares) / views * 100
 * Levels: <1% Low, 1-3% Medium, 3-10% High, >10% Viral
 */

export function calculateEngagement(metrics: VideoMetrics): EngagementMetrics {
  const { views, likes, comments, saves, shares } = metrics;

  if (views === 0) {
    return { rate: 0, level: "low" };
  }

  const interactions = likes + comments + saves + shares;
  const rate = (interactions / views) * 100;

  let level: EngagementLevel;
  if (rate >= 10) {
    level = "viral";
  } else if (rate >= 3) {
    level = "high";
  } else if (rate >= 1) {
    level = "medium";
  } else {
    level = "low";
  }

  return { rate: Math.round(rate * 100) / 100, level };
}
