"use client";

import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { AnalysisResult } from "@/lib/types";
import strings from "@/strings/en";

/**
 * AnalysisResult — engagement stats row + AI suggestions list.
 */
interface AnalysisResultProps {
  result: AnalysisResult;
  onReset: () => void;
}

const levelVariant: Record<string, "default" | "warning" | "success" | "accent"> = {
  low: "default",
  medium: "warning",
  high: "success",
  viral: "accent",
};

const levelEmoji: Record<string, string> = {
  low: "📉",
  medium: "📊",
  high: "📈",
  viral: "🔥",
};

export default function AnalysisResult({
  result,
  onReset,
}: AnalysisResultProps) {
  const buildReportText = () => {
    const lines = [
      `Video Performance Report`,
      `========================`,
      ``,
      `Engagement Rate: ${result.engagement_rate}%`,
      `Engagement Level: ${result.engagement_level.toUpperCase()}`,
      ``,
      `AI Suggestions:`,
      ...result.suggestions.map((s, i) => `${i + 1}. ${s}`),
    ];
    return lines.join("\n");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildReportText());
    alert(strings.plan.copySuccess);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Engagement rate */}
        <Card className="text-center">
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-wide mb-1">
            {strings.analyze.engagementRate}
          </p>
          <p className="text-4xl font-bold text-[var(--color-foreground)]">
            {result.engagement_rate.toFixed(1)}%
          </p>
        </Card>

        {/* Engagement level */}
        <Card className="text-center">
          <p className="text-xs text-[var(--color-muted)] uppercase tracking-wide mb-1">
            {strings.analyze.engagementLevel}
          </p>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="text-2xl">
              {levelEmoji[result.engagement_level]}
            </span>
            <Badge variant={levelVariant[result.engagement_level]}>
              {result.engagement_level.toUpperCase()}
            </Badge>
          </div>
        </Card>
      </div>

      {/* AI Suggestions */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-3">
          💡 {strings.analyze.suggestions}
        </h3>
        <div className="space-y-3">
          {result.suggestions.map((suggestion, i) => (
            <Card key={i} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--color-primary)] text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-[var(--color-foreground)] leading-relaxed">
                {suggestion}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3">
        <Button variant="ghost" onClick={onReset}>
          {strings.analyze.startOver}
        </Button>
        <Button variant="secondary" onClick={handleCopy}>
          {strings.analyze.copyReport}
        </Button>
      </div>
    </div>
  );
}
