"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopicInput from "@/components/topics/TopicInput";
import TopicCard from "@/components/topics/TopicCard";
import EmptyState from "@/components/ui/EmptyState";
import { TopicCardSkeleton } from "@/components/ui/Skeleton";
import { getProfile } from "@/lib/storage";
import { getDeviceId } from "@/lib/device-id";
import { useStrings } from "@/lib/i18n";
import { useModel } from "@/lib/model";
import type { TopicIdea, TopicGenerationResult } from "@/lib/types";

export default function TopicsPage() {
  const router = useRouter();
  const strings = useStrings();
  const { model } = useModel();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<TopicGenerationResult | null>(null);
  const [profilePlatform, setProfilePlatform] = useState<string | null>(null);
  const [deviceId, setDeviceId] = useState<string>("");

  useEffect(() => {
    try {
      const id = getDeviceId();
      setDeviceId(id);
      getProfile(id).then((p) => { if (p) setProfilePlatform(p.platform); });
    } catch { /* ignore */ }
  }, []);

  const handleGenerate = async (topic: string) => {
    setLoading(true); setError(null); setResult(null);
    try {
      const response = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, device_id: deviceId, model }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || strings.errors.unknown);
      setResult(data as TopicGenerationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : strings.errors.unknown);
    } finally { setLoading(false); }
  };

  const handleSelect = (idea: TopicIdea) => {
    localStorage.setItem("selected_topic", JSON.stringify(idea));
    router.push("/plan");
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">{strings.topics.title}</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">{strings.topics.description}</p>
      <TopicInput onGenerate={handleGenerate} loading={loading} />
      {profilePlatform && result && (
        <p className="mt-4 text-xs text-[var(--color-muted)]">{strings.topics.profileContext.replace("{platform}", profilePlatform)}</p>
      )}
      <div className="mt-8">
        {loading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{[1,2,3].map((i) => <TopicCardSkeleton key={i} />)}</div>}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-5">
            <p className="text-sm font-medium text-red-800">{strings.errors.parseFailed}</p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
            <button onClick={() => setError(null)} className="mt-2 text-sm font-medium text-red-700 underline cursor-pointer">{strings.general.retry}</button>
          </div>
        )}
        {result && !loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.ideas.map((idea, i) => <TopicCard key={i} idea={idea} index={i} onSelect={handleSelect} />)}
          </div>
        )}
        {!result && !loading && !error && <EmptyState title={strings.topics.idleTitle} description={strings.topics.idleDescription} />}
      </div>
    </div>
  );
}
