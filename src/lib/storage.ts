import { createClient } from "@supabase/supabase-js";
import type { CreatorProfile, TopicIdea } from "./types";

/**
 * StorageService — Supabase CRUD wrapper.
 * All DB operations go through this module; components never call Supabase directly.
 *
 * V1 uses device_id for anonymous identification.
 * Later: swap device_id for user_id from Supabase Auth.
 */

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local."
    );
  }
  return createClient(url, key);
}

// ---- Creator Profile ----

export async function saveProfile(
  deviceId: string,
  data: {
    platform: string;
    category: string;
    target_audience: string;
    content_style: string;
    video_duration: string;
    language: string;
  }
): Promise<CreatorProfile> {
  const supabase = getSupabase();

  // Upsert: one profile per device
  const { data: existing } = await supabase
    .from("creator_profiles")
    .select("id")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (existing) {
    const { data: updated, error } = await supabase
      .from("creator_profiles")
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq("id", existing.id)
      .select()
      .single();

    if (error) throw new Error(`Failed to update profile: ${error.message}`);
    return updated as CreatorProfile;
  } else {
    const { data: inserted, error } = await supabase
      .from("creator_profiles")
      .insert({ device_id: deviceId, ...data })
      .select()
      .single();

    if (error) throw new Error(`Failed to save profile: ${error.message}`);
    return inserted as CreatorProfile;
  }
}

export async function getProfile(
  deviceId: string
): Promise<CreatorProfile | null> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("creator_profiles")
    .select("*")
    .eq("device_id", deviceId)
    .maybeSingle();

  if (error) throw new Error(`Failed to load profile: ${error.message}`);
  return data as CreatorProfile | null;
}

// ---- Topic Generation ----

export async function saveTopics(
  deviceId: string,
  inputTopic: string,
  topicsJson: { ideas: TopicIdea[] },
  profileId?: string
): Promise<string> {
  const supabase = getSupabase();

  const { data, error } = await supabase
    .from("generated_topics")
    .insert({
      device_id: deviceId,
      profile_id: profileId || null,
      input_topic: inputTopic,
      topics_json: topicsJson,
    })
    .select("id")
    .single();

  if (error) throw new Error(`Failed to save topics: ${error.message}`);
  return data.id;
}

// ---- Content Plan ----

export async function savePlan(
  deviceId: string,
  selectedTopicJson: TopicIdea,
  planJson: object,
  topicId?: string
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase.from("content_plans").insert({
    device_id: deviceId,
    topic_id: topicId || null,
    selected_topic_json: selectedTopicJson,
    plan_json: planJson,
  });

  if (error) throw new Error(`Failed to save plan: ${error.message}`);
}

// ---- Video Analysis ----

export async function saveAnalysis(
  deviceId: string,
  data: {
    views: number;
    likes: number;
    comments: number;
    saves: number;
    shares: number;
    engagement_rate: number;
    suggestions_json: string[];
    video_topic?: string;
  }
): Promise<void> {
  const supabase = getSupabase();

  const { error } = await supabase.from("video_analyses").insert({
    device_id: deviceId,
    ...data,
  });

  if (error) throw new Error(`Failed to save analysis: ${error.message}`);
}
