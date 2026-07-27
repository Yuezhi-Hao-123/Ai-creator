"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useStrings } from "@/lib/i18n";
import type { VideoMetrics } from "@/lib/types";

interface MetricsFormProps {
  onSubmit: (metrics: VideoMetrics, videoTopic: string) => void;
  loading: boolean;
}

export default function MetricsForm({ onSubmit, loading }: MetricsFormProps) {
  const strings = useStrings();
  const [metrics, setMetrics] = useState<VideoMetrics>({ views: 0, likes: 0, comments: 0, saves: 0, shares: 0 });
  const [videoTopic, setVideoTopic] = useState("");

  const update = (field: keyof VideoMetrics, value: string) => {
    const num = parseInt(value, 10);
    setMetrics((prev) => ({ ...prev, [field]: isNaN(num) ? 0 : Math.max(0, num) }));
  };

  const hasAnyValue = Object.values(metrics).some((v) => v > 0);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricField icon="👁️" label={strings.analyze.metrics.views} value={metrics.views} onChange={(v) => update("views", v)} disabled={loading} />
        <MetricField icon="❤️" label={strings.analyze.metrics.likes} value={metrics.likes} onChange={(v) => update("likes", v)} disabled={loading} />
        <MetricField icon="💬" label={strings.analyze.metrics.comments} value={metrics.comments} onChange={(v) => update("comments", v)} disabled={loading} />
        <MetricField icon="🔖" label={strings.analyze.metrics.saves} value={metrics.saves} onChange={(v) => update("saves", v)} disabled={loading} />
        <MetricField icon="📤" label={strings.analyze.metrics.shares} value={metrics.shares} onChange={(v) => update("shares", v)} disabled={loading} />
      </div>
      <Input label={strings.analyze.videoTopic} placeholder={strings.analyze.videoTopicPlaceholder} value={videoTopic} onChange={(e) => setVideoTopic(e.target.value)} disabled={loading} />
      <div className="flex justify-end">
        <Button onClick={() => { if (hasAnyValue && !loading) onSubmit(metrics, videoTopic.trim()); }} loading={loading} disabled={!hasAnyValue || loading} size="lg">
          {loading ? strings.analyze.analyzing : strings.analyze.analyzeButton}
        </Button>
      </div>
    </div>
  );
}

function MetricField({ icon, label, value, onChange, disabled }: { icon: string; label: string; value: number; onChange: (v: string) => void; disabled: boolean }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-foreground)] flex items-center gap-1.5"><span>{icon}</span>{label}</label>
      <input type="number" min="0" value={value || ""} placeholder="0" onChange={(e) => onChange(e.target.value)} disabled={disabled} className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent disabled:opacity-50" />
    </div>
  );
}
