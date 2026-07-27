"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useStrings } from "@/lib/i18n";
import type { ContentPlanResult } from "@/lib/types";

interface PlanResultProps {
  plan: ContentPlanResult;
}

export default function PlanResult({ plan }: PlanResultProps) {
  const strings = useStrings();

  // Build HTML suitable for Word (.doc) export
  const buildHtml = () => {
    const points = plan.key_points.map((p, i) => `<li>${p}</li>`).join("");
    return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Content Plan</title></head>
<body>
<h1>Video Content Plan</h1>

<h2>🎣 ${strings.plan.sections.openingHook}</h2>
<blockquote>${plan.opening_hook}</blockquote>

<h2>📋 ${strings.plan.sections.contentStructure}</h2>
<p>${plan.content_structure.replace(/\n/g, "<br>")}</p>

<h2>💡 ${strings.plan.sections.keyPoints}</h2>
<ol>${points}</ol>

<h2>🗣️ ${strings.plan.sections.endingCta}</h2>
<p>${plan.ending_cta}</p>

<h2>🖼️ ${strings.plan.sections.coverText}</h2>
<p style="font-weight:bold;font-size:1.2em;text-align:center">${plan.cover_text}</p>
</body>
</html>`;
  };

  const handleCopy = async () => {
    // plain text version for copy
    const text = [
      "Video Content Plan",
      "===================",
      "",
      `🎣 ${strings.plan.sections.openingHook}`,
      plan.opening_hook,
      "",
      `📋 ${strings.plan.sections.contentStructure}`,
      plan.content_structure,
      "",
      `💡 ${strings.plan.sections.keyPoints}`,
      ...plan.key_points.map((p, i) => `${i + 1}. ${p}`),
      "",
      `🗣️ ${strings.plan.sections.endingCta}`,
      plan.ending_cta,
      "",
      `🖼️ ${strings.plan.sections.coverText}`,
      plan.cover_text,
    ].join("\n");

    await navigator.clipboard.writeText(text);
    alert(strings.plan.copySuccess);
  };

  const handleDownload = () => {
    const blob = new Blob([buildHtml()], {
      type: "application/msword",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content-plan.doc";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      <Card className="border-l-4 border-l-[var(--color-primary)]">
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-2">
          🎣 {strings.plan.sections.openingHook}
        </h3>
        <blockquote className="text-base text-[var(--color-foreground)] italic leading-relaxed pl-2">
          &ldquo;{plan.opening_hook}&rdquo;
        </blockquote>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-3">
          📋 {strings.plan.sections.contentStructure}
        </h3>
        <div className="text-sm text-[var(--color-foreground)] leading-relaxed whitespace-pre-wrap">
          {plan.content_structure}
        </div>
      </Card>
      <Card>
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-3">
          💡 {strings.plan.sections.keyPoints}
        </h3>
        <ul className="space-y-2">
          {plan.key_points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-[var(--color-foreground)] leading-relaxed"
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-[var(--color-primary)] text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              {point}
            </li>
          ))}
        </ul>
      </Card>
      <Card className="bg-orange-50 border-orange-200">
        <h3 className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-2">
          🗣️ {strings.plan.sections.endingCta}
        </h3>
        <p className="text-sm text-orange-800 leading-relaxed">
          {plan.ending_cta}
        </p>
      </Card>
      <Card className="border-2 border-dashed border-[var(--color-border)] bg-gray-50">
        <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">
          🖼️ {strings.plan.sections.coverText}
        </h3>
        <p className="text-lg font-bold text-[var(--color-foreground)] text-center py-3">
          {plan.cover_text}
        </p>
      </Card>
      <div className="flex justify-end gap-3 pt-3">
        <Button variant="secondary" onClick={handleCopy}>
          {strings.plan.copyAll}
        </Button>
        <Button onClick={handleDownload}>{strings.plan.downloadWord}</Button>
      </div>
    </div>
  );
}
