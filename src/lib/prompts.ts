import type { CreatorProfile, TopicIdea, VideoMetrics } from "./types";

/**
 * PromptBuilder — builds structured prompts for each AI task.
 * Auto-detects Chinese input and switches AI output language.
 */

interface ChatMessage {
  role: "system" | "user";
  content: string;
}

/** Detect if text contains Chinese characters */
function isChinese(text: string): boolean {
  return /[一-鿿]/.test(text);
}

/** Get language instruction based on input language */
function langHint(input: string): { systemHint: string; outputLang: string } {
  if (isChinese(input)) {
    return {
      systemHint: "Reply in Chinese (Simplified). 用简体中文回复。",
      outputLang: "Chinese, output all content in Simplified Chinese",
    };
  }
  return {
    systemHint: "Reply in English.",
    outputLang: "English",
  };
}

// ---- Topic Generation ----

export function buildTopicPrompt(
  topic: string,
  profile?: CreatorProfile | null
): ChatMessage[] {
  const { systemHint, outputLang } = langHint(topic);

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
        `You are an expert short-video content strategist. You help creators generate engaging video topic ideas tailored to their niche and audience. ${systemHint} Always respond with valid JSON only, no extra text.`,
    },
    {
      role: "user",
      content: `Generate 3-5 short-video topic ideas about "${topic}".${contextBlock}

For each idea, provide:
- title: a catchy, clickable video title (in ${outputLang})
- angle: the unique perspective or hook angle (in ${outputLang})
- description: a 1-2 sentence summary (in ${outputLang})

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
  // Detect language from the selected topic's title
  const { systemHint, outputLang } = langHint(selectedTopic.title);

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
        `You are an expert short-video script writer. You craft engaging, structured video scripts optimized for short-form platforms. ${systemHint} Always respond with valid JSON only, no extra text.`,
    },
    {
      role: "user",
      content: `Create a detailed short-video content plan for this topic:

Title: "${selectedTopic.title}"
Angle: "${selectedTopic.angle}"
Description: "${selectedTopic.description}"${contextBlock}

Provide (all in ${outputLang}):
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
  // Detect language from optional video topic, default to English for numbers
  const { systemHint, outputLang } = videoTopic
    ? langHint(videoTopic)
    : { systemHint: "Reply in English.", outputLang: "English" };

  const contextParts: string[] = [];
  if (profile) {
    contextParts.push(`Platform: ${profile.platform}`);
    contextParts.push(`Category: ${profile.category}`);
    contextParts.push(`Typical duration: ${profile.video_duration}`);
  }

  const contextBlock = contextParts.length
    ? `\n\nCreator context:\n${contextParts.join("\n")}`
    : "";

  const topicLine = videoTopic ? `\nVideo topic: "${videoTopic}"` : "";

  return [
    {
      role: "system",
      content:
        `You are an expert short-video performance analyst. You analyze engagement metrics and provide actionable improvement suggestions for content creators. ${systemHint} Always respond with valid JSON only, no extra text.`,
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

Based on these numbers, provide 3-5 specific, actionable suggestions (in ${outputLang}) to improve future content performance. Focus on what the creator can change: hooks, pacing, visuals, storytelling, audience targeting, format adjustments.

Output as JSON:
{
  "suggestions": ["suggestion 1", "suggestion 2", "..."]
}`,
    },
  ];
}
