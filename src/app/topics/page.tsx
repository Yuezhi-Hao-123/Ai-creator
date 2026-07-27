"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopicInput from "@/components/topics/TopicInput";
import TopicCard from "@/components/topics/TopicCard";
import EmptyState from "@/components/ui/EmptyState";
import { TopicCardSkeleton } from "@/components/ui/Skeleton";
import { getProfile } from "@/lib/storage";
import { getDeviceId } from "@/lib/device-id";
import strings from "@/strings/en";
import type { TopicIdea, TopicGenerationResult } from "@/lib/types";

/**
 * Topic Ideas page — full generation flow.
 * Input → Loading → Cards / Error
 */
export default function TopicsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TopicGenerationResult | null>(null);
  const [profilePlatform, setProfilePlatform] = useState<string | null>(null);

  // Load profile for context display
  useEffect(() => {
    try {
      const id = getDeviceId();
      getProfile(id).then((p) => {
        if (p) setProfilePlatform(p.platform);
      });
    } catch {
      // Profile not available — fine, works without it
    }
  }, []);

  const handleGenerate = async (topic: string) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || strings.errors.unknown);
      }

      setResult(data as TopicGenerationResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : strings.errors.unknown
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (idea: TopicIdea) => {
    // Store selected topic in localStorage for /plan to read
    localStorage.setItem("selected_topic", JSON.stringify(idea));
    router.push("/plan");
  };

  const handleRetry = () => {
    setError(null);
  };

  // ---- Render ----

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.topics.title}
      </h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">
        {strings.topics.description}
      </p>

      {/* Input */}
      <TopicInput onGenerate={handleGenerate} loading={loading} />

      {/* Profile context hint */}
      {profilePlatform && result && (
        <p className="mt-4 text-xs text-[var(--color-muted)]">
          {strings.topics.profileContext.replace("{platform}", profilePlatform)}
        </p>
      )}

      {/* States */}
      <div className="mt-8">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <TopicCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-red-800">
                  {strings.errors.parseFailed}
                </p>
                <p className="mt-1 text-sm text-red-600">{error}</p>
              </div>
              <button
                onClick={handleRetry}
                className="shrink-0 text-sm font-medium text-red-700 hover:text-red-800 underline cursor-pointer"
              >
                {strings.general.retry}
              </button>
            </div>
          </div>
        )}

        {/* Success */}
        {result && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.ideas.map((idea, i) => (
              <TopicCard
                key={i}
                idea={idea}
                index={i}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}

        {/* Idle */}
        {!result && !loading && !error && (
          <EmptyState
            title={strings.topics.idleTitle}
            description={strings.topics.idleDescription}
          />
        )}
      </div>
    </div>
  );
}
