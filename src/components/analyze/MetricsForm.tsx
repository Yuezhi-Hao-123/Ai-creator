"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import type { VideoMetrics } from "@/lib/types";
import strings from "@/strings/en";

/**
 * MetricsForm — 5 number inputs for video performance data.
 * Validates at least one non-zero value before allowing submission.
 */
interface MetricsFormProps {
  onSubmit: (metrics: VideoMetrics, videoTopic: string) => void;
  loading: boolean;
}

const defaultMetrics: VideoMetrics = {
  views: 0,
  likes: 0,
  comments: 0,
  saves: 0,
  shares: 0,
};

export default function MetricsForm({ onSubmit, loading }: MetricsFormProps) {
  const [metrics, setMetrics] = useState<VideoMetrics>({ ...defaultMetrics });
  const [videoTopic, setVideoTopic] = useState("");

  const update = (field: keyof VideoMetrics, value: string) => {
    const num = parseInt(value, 10);
    setMetrics((prev) => ({
      ...prev,
      [field]: isNaN(num) ? 0 : Math.max(0, num),
    }));
  };

  const hasAnyValue = Object.values(metrics).some((v) => v > 0);

  const handleSubmit = () => {
    if (!hasAnyValue || loading) return;
    onSubmit(metrics, videoTopic.trim());
  };

  return (
    <div className="space-y-4">
      {/* 5 metric inputs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <MetricField
          icon="👁️"
          label={strings.analyze.metrics.views}
          value={metrics.views}
          onChange={(v) => update("views", v)}
          disabled={loading}
        />
        <MetricField
          icon="❤️"
          label={strings.analyze.metrics.likes}
          value={metrics.likes}
          onChange={(v) => update("likes", v)}
          disabled={loading}
        />
        <MetricField
          icon="💬"
          label={strings.analyze.metrics.comments}
          value={metrics.comments}
          onChange={(v) => update("comments", v)}
          disabled={loading}
        />
        <MetricField
          icon="🔖"
          label={strings.analyze.metrics.saves}
          value={metrics.saves}
          onChange={(v) => update("saves", v)}
          disabled={loading}
        />
        <MetricField
          icon="📤"
          label={strings.analyze.metrics.shares}
          value={metrics.shares}
          onChange={(v) => update("shares", v)}
          disabled={loading}
        />
      </div>

      {/* Optional video topic */}
      <Input
        label={strings.analyze.videoTopic}
        placeholder={strings.analyze.videoTopicPlaceholder}
        value={videoTopic}
        onChange={(e) => setVideoTopic(e.target.value)}
        disabled={loading}
      />

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          loading={loading}
          disabled={!hasAnyValue || loading}
          size="lg"
        >
          {loading
            ? strings.analyze.analyzing
            : strings.analyze.analyzeButton}
        </Button>
      </div>
    </div>
  );
}

/** Single metric input with icon + label */
function MetricField({
  icon,
  label,
  value,
  onChange,
  disabled,
}: {
  icon: string;
  label: string;
  value: number;
  onChange: (v: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[var(--color-foreground)] flex items-center gap-1.5">
        <span>{icon}</span>
        {label}
      </label>
      <input
        type="number"
        min="0"
        value={value || ""}
        placeholder="0"
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent disabled:opacity-50"
      />
    </div>
  );
}
