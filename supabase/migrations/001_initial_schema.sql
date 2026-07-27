-- ============================================================
-- AI Content Planner — Initial Schema
-- ⚠️ 请在 Supabase SQL Editor 中运行此脚本后再继续 Stage 3。
-- ============================================================

-- 1. Creator Profiles
CREATE TABLE IF NOT EXISTS creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('tiktok', 'youtube_shorts', 'xiaohongshu', 'douyin', 'instagram_reels')),
  category TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  content_style TEXT NOT NULL CHECK (content_style IN ('professional', 'casual_humor', 'storytelling', 'tutorial')),
  video_duration TEXT NOT NULL CHECK (video_duration IN ('<30s', '30-60s', '1-3min', '3min+')),
  language TEXT NOT NULL DEFAULT 'English',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Generated Topics
CREATE TABLE IF NOT EXISTS generated_topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  profile_id UUID REFERENCES creator_profiles(id) ON DELETE SET NULL,
  input_topic TEXT NOT NULL,
  topics_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Content Plans
CREATE TABLE IF NOT EXISTS content_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  topic_id UUID REFERENCES generated_topics(id) ON DELETE SET NULL,
  selected_topic_json JSONB NOT NULL,
  plan_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Video Analyses
CREATE TABLE IF NOT EXISTS video_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  comments INTEGER NOT NULL DEFAULT 0,
  saves INTEGER NOT NULL DEFAULT 0,
  shares INTEGER NOT NULL DEFAULT 0,
  engagement_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  suggestions_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  video_topic TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_profiles_device ON creator_profiles(device_id);
CREATE INDEX IF NOT EXISTS idx_topics_device ON generated_topics(device_id);
CREATE INDEX IF NOT EXISTS idx_topics_created ON generated_topics(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_plans_device ON content_plans(device_id);
CREATE INDEX IF NOT EXISTS idx_plans_created ON content_plans(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analyses_device ON video_analyses(device_id);
CREATE INDEX IF NOT EXISTS idx_analyses_created ON video_analyses(created_at DESC);

-- ============================================================
-- Row Level Security
-- V1: 匿名访问，允许所有操作（通过 anon key）。
--     数据隔离由应用层保证（所有查询带 device_id）。
-- 后期: 接入 Supabase Auth 后，改为 user_id 匹配策略。
-- ============================================================

ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE generated_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_analyses ENABLE ROW LEVEL SECURITY;

-- V1 permissive policies (anon users can access all)
CREATE POLICY "Allow all for anon" ON creator_profiles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON generated_topics FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON content_plans FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON video_analyses FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- Auto-update updated_at trigger
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON creator_profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON creator_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
