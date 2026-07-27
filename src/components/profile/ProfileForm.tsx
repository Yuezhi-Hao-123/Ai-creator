"use client";

import { useState, useEffect, useCallback } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Spinner from "@/components/ui/Spinner";
import { getDeviceId } from "@/lib/device-id";
import { saveProfile, getProfile } from "@/lib/storage";
import { validateProfile } from "@/lib/validation";
import strings from "@/strings/en";
import type { CreatorProfile } from "@/lib/types";

/**
 * ProfileForm — create/edit the creator profile.
 * Loads existing profile on mount, supports save/update.
 */

const PLATFORM_OPTIONS = [
  { value: "tiktok", label: "TikTok" },
  { value: "youtube_shorts", label: "YouTube Shorts" },
  { value: "xiaohongshu", label: "Xiaohongshu (小红书)" },
  { value: "douyin", label: "Douyin (抖音)" },
  { value: "instagram_reels", label: "Instagram Reels" },
];

const STYLE_OPTIONS = [
  { value: "professional", label: "Professional" },
  { value: "casual_humor", label: "Casual Humor" },
  { value: "storytelling", label: "Storytelling" },
  { value: "tutorial", label: "Tutorial" },
];

const DURATION_OPTIONS = [
  { value: "<30s", label: "Under 30 seconds" },
  { value: "30-60s", label: "30-60 seconds" },
  { value: "1-3min", label: "1-3 minutes" },
  { value: "3min+", label: "3 minutes or longer" },
];

export default function ProfileForm() {
  const [deviceId, setDeviceId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Form fields
  const [platform, setPlatform] = useState("");
  const [category, setCategory] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [contentStyle, setContentStyle] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [language, setLanguage] = useState("English");

  // Init device ID and load existing profile
  useEffect(() => {
    const id = getDeviceId();
    setDeviceId(id);

    getProfile(id)
      .then((profile) => {
        if (profile) {
          setPlatform(profile.platform);
          setCategory(profile.category);
          setTargetAudience(profile.target_audience);
          setContentStyle(profile.content_style);
          setVideoDuration(profile.video_duration);
          setLanguage(profile.language);
        }
      })
      .catch((err) => {
        console.error("Failed to load profile:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSave = useCallback(async () => {
    // Validate
    const validation = validateProfile({
      platform,
      category,
      target_audience: targetAudience,
      content_style: contentStyle,
      video_duration: videoDuration,
      language,
    } as Partial<CreatorProfile>);

    if (!validation.valid) {
      setMessage({ type: "error", text: validation.errors[0] });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      await saveProfile(deviceId, {
        platform,
        category,
        target_audience: targetAudience,
        content_style: contentStyle,
        video_duration: videoDuration,
        language,
      });
      setMessage({ type: "success", text: strings.profile.saveSuccess });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : strings.errors.unknown,
      });
    } finally {
      setSaving(false);
    }
  }, [
    platform,
    category,
    targetAudience,
    contentStyle,
    videoDuration,
    language,
    deviceId,
  ]);

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <Card className="max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="space-y-6"
      >
        {/* Platform */}
        <Select
          label={strings.profile.platform.label}
          options={PLATFORM_OPTIONS}
          placeholder={strings.profile.platform.placeholder}
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        />

        {/* Category */}
        <Input
          label={strings.profile.category.label}
          placeholder={strings.profile.category.placeholder}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        {/* Target Audience */}
        <Input
          label={strings.profile.targetAudience.label}
          placeholder={strings.profile.targetAudience.placeholder}
          value={targetAudience}
          onChange={(e) => setTargetAudience(e.target.value)}
        />

        {/* Content Style */}
        <Select
          label={strings.profile.contentStyle.label}
          options={STYLE_OPTIONS}
          placeholder={strings.profile.contentStyle.placeholder}
          value={contentStyle}
          onChange={(e) => setContentStyle(e.target.value)}
        />

        {/* Video Duration */}
        <Select
          label={strings.profile.videoDuration.label}
          options={DURATION_OPTIONS}
          placeholder={strings.profile.videoDuration.placeholder}
          value={videoDuration}
          onChange={(e) => setVideoDuration(e.target.value)}
        />

        {/* Language */}
        <Input
          label={strings.profile.language.label}
          placeholder={strings.profile.language.placeholder}
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />

        {/* Feedback message */}
        {message && (
          <div
            className={[
              "px-4 py-3 rounded-[var(--radius-button)] text-sm font-medium",
              message.type === "success"
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-[var(--color-accent)]",
            ].join(" ")}
          >
            {message.text}
          </div>
        )}

        {/* Save button */}
        <div className="flex justify-end">
          <Button type="submit" loading={saving} size="lg">
            {strings.profile.saveButton}
          </Button>
        </div>
      </form>
    </Card>
  );
}
