import { PlatformEnum, ContentStyleEnum, VideoDurationEnum } from "./types";
import type { VideoMetrics, CreatorProfile } from "./types";

// ---- Topic input ----

export function validateTopicInput(
  input: string
): { valid: true } | { valid: false; errors: string[] } {
  const errors: string[] = [];
  if (!input || input.trim().length === 0) {
    errors.push("Topic cannot be empty.");
  }
  if (input.trim().length > 200) {
    errors.push("Topic must be 200 characters or fewer.");
  }
  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

// ---- Video metrics ----

export function validateMetrics(
  metrics: VideoMetrics
): { valid: true } | { valid: false; errors: string[] } {
  const errors: string[] = [];

  if (metrics.views < 0) errors.push("Views cannot be negative.");
  if (metrics.likes < 0) errors.push("Likes cannot be negative.");
  if (metrics.comments < 0) errors.push("Comments cannot be negative.");
  if (metrics.saves < 0) errors.push("Saves cannot be negative.");
  if (metrics.shares < 0) errors.push("Shares cannot be negative.");

  const nonZeroFields = [
    metrics.views,
    metrics.likes,
    metrics.comments,
    metrics.saves,
    metrics.shares,
  ].filter((v) => v > 0);

  if (nonZeroFields.length === 0) {
    errors.push("At least one metric must be greater than zero.");
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

// ---- Creator Profile ----

export function validateProfile(
  profile: Partial<CreatorProfile>
): { valid: true } | { valid: false; errors: string[] } {
  const errors: string[] = [];

  if (!profile.platform) {
    errors.push("Platform is required.");
  } else {
    const result = PlatformEnum.safeParse(profile.platform);
    if (!result.success) errors.push("Invalid platform value.");
  }

  if (!profile.category || profile.category.trim().length === 0) {
    errors.push("Category is required.");
  }

  if (!profile.content_style) {
    errors.push("Content style is required.");
  } else {
    const result = ContentStyleEnum.safeParse(profile.content_style);
    if (!result.success) errors.push("Invalid content style value.");
  }

  if (!profile.video_duration) {
    errors.push("Video duration is required.");
  } else {
    const result = VideoDurationEnum.safeParse(profile.video_duration);
    if (!result.success) errors.push("Invalid video duration value.");
  }

  if (
    !profile.target_audience ||
    profile.target_audience.trim().length === 0
  ) {
    errors.push("Target audience is required.");
  }

  if (!profile.language || profile.language.trim().length === 0) {
    errors.push("Language is required.");
  }

  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}
