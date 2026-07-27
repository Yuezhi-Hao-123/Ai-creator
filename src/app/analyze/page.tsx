"use client";

import { useState } from "react";
import MetricsForm from "@/components/analyze/MetricsForm";
import AnalysisResult from "@/components/analyze/AnalysisResult";
import EmptyState from "@/components/ui/EmptyState";
import { TopicCardSkeleton } from "@/components/ui/Skeleton";
import { useStrings } from "@/lib/i18n";
import { useModel } from "@/lib/model";
import type { VideoMetrics, AnalysisResult as AnalysisResultType } from "@/lib/types";

export default function AnalyzePage() {
  const strings = useStrings();
  const { model } = useModel();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResultType | null>(null);

  const handleSubmit = async (metrics: VideoMetrics, videoTopic: string) => {
    setLoading(true); setError(null); setResult(null);
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ metrics, video_topic: videoTopic || undefined, model }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || strings.errors.unknown);
      setResult(data as AnalysisResultType);
    } catch (err) {
      setError(err instanceof Error ? err.message : strings.errors.unknown);
    } finally { setLoading(false); }
  };

  const handleReset = () => { setResult(null); setError(null); };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">{strings.analyze.title}</h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">{strings.analyze.description}</p>
      <MetricsForm onSubmit={handleSubmit} loading={loading} />
      <div className="mt-8">
        {loading && <div className="space-y-4">{[1,2,3].map((i) => <TopicCardSkeleton key={i} />)}</div>}
        {error && !loading && (
          <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-5">
            <p className="text-sm font-medium text-red-800">{strings.errors.parseFailed}</p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
            <button onClick={handleReset} className="mt-2 text-sm font-medium text-red-700 underline cursor-pointer">{strings.analyze.startOver}</button>
          </div>
        )}
        {result && !loading && !error && <AnalysisResult result={result} onReset={handleReset} />}
        {!result && !loading && !error && <EmptyState title={strings.analyze.idleTitle} description={strings.analyze.idleDescription} />}
      </div>
    </div>
  );
}
