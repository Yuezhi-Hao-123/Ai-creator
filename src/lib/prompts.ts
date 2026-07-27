import type { CreatorProfile, TopicIdea, VideoMetrics } from "./types";

/**
 * PromptBuilder — builds structured prompts for each AI task.
 * Pure functions: no API calls, no side effects.
 */

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

// ---- Topic Generation ----

export function buildTopicPrompt(
  topic: string,
  profile?: CreatorProfile | null
): ChatMessage[] {
  const contextParts: string[] = [];

  if (profile) {
    contextParts.push(`Platform: ${profile.platform}`);
    contextParts.push(`Content category: ${profile.category}`);
    contextParts.push(`Target audience: ${profile.target_audience}`);
    contextParts.push(`Content style: ${profile.content_style}`);
    contextParts.push(`Video duration: ${profile.video_duration}`);
    contextParts.push(`Language: ${profile.language}`);
  }

  const contextBlock = contextParts.length
    ? `\n\nCreator context:\n${contextParts.join("\n")}`
    : "";

  return [
    {
      role: "system",
      content:
        "You are an expert short-video content strategist. You help creators generate engaging video topic ideas tailored to their niche and audience. Always respond with valid JSON only, no extra text.",
    },
    {
      role: "user",
      content: `Generate 3-5 short-video topic ideas about "${topic}".${contextBlock}

For each idea, provide:
- title: a catchy, clickable video title
- angle: the unique perspective or hook angle
- description: a 1-2 sentence summary of what the video would cover

Output as JSON:
{
  "ideas": [
    { "title": "...", "angle": "...", "description": "..." }
  ]
}`,
    },
  ];
}

// ---- Content Plan ----

export function buildPlanPrompt(
  selectedTopic: TopicIdea,
  profile?: CreatorProfile | null
): ChatMessage[] {
  const contextParts: string[] = [];
  if (profile) {
    contextParts.push(`Platform: ${profile.platform}`);
    contextParts.push(`Style: ${profile.content_style}`);
    contextParts.push(`Duration: ${profile.video_duration}`);
    contextParts.push(`Audience: ${profile.target_audience}`);
  }

  const contextBlock = contextParts.length
    ? `\n\nCreator context:\n${contextParts.join("\n")}`
    : "";

  return [
    {
      role: "system",
      content:
        "You are an expert short-video script writer. You craft engaging, structured video scripts optimized for short-form platforms. Always respond with valid JSON only, no extra text.",
    },
    {
      role: "user",
      content: `Create a detailed short-video content plan for this topic:

Title: "${selectedTopic.title}"
Angle: "${selectedTopic.angle}"
Description: "${selectedTopic.description}"${contextBlock}

Provide:
- opening_hook: an attention-grabbing first 3-5 seconds line
- content_structure: a step-by-step flow of the video (timeline or numbered structure)
- key_points: 3-5 main points to cover (as an array of strings)
- ending_cta: a closing call-to-action or engagement question
- cover_text: suggested text overlay for the video thumbnail/cover

Output as JSON:
{
  "opening_hook": "...",
  "content_structure": "...",
  "key_points": ["...", "..."],
  "ending_cta": "...",
  "cover_text": "..."
}`,
    },
  ];
}

// ---- Video Analysis ----

export function buildAnalysisPrompt(
  metrics: VideoMetrics,
  engagementRate: number,
  engagementLevel: string,
  profile?: CreatorProfile | null,
  videoTopic?: string
): ChatMessage[] {
  const contextParts: string[] = [];
  if (profile) {
    contextParts.push(`Platform: ${profile.platform}`);
    contextParts.push(`Category: ${profile.category}`);
    contextParts.push(`Typical duration: ${profile.video_duration}`);
  }

  const contextBlock = contextParts.length
    ? `\n\nCreator context:\n${contextParts.join("\n")}`
    : "";

  const topicLine = videoTopic
    ? `\nVideo topic: "${videoTopic}"`
    : "";

  return [
    {
      role: "system",
      content:
        "You are an expert short-video performance analyst. You analyze engagement metrics and provide actionable improvement suggestions for content creators. Always respond with valid JSON only, no extra text.",
    },
    {
      role: "user",
      content: `Analyze this video's performance metrics:

Views: ${metrics.views}
Likes: ${metrics.likes}
Comments: ${metrics.comments}
Saves: ${metrics.saves}
Shares: ${metrics.shares}

Calculated engagement rate: ${engagementRate.toFixed(2)}%
Engagement level: ${engagementLevel}${topicLine}${contextBlock}

Based on these numbers, provide 3-5 specific, actionable suggestions to improve future content performance. Focus on what the creator can change: hooks, pacing, visuals, storytelling, audience targeting, format adjustments.

Output as JSON:
{
  "suggestions": ["suggestion 1", "suggestion 2", "..."]
}`,
    },
  ];
}
