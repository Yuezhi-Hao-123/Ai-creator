"use client";

import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import type { ContentPlanResult } from "@/lib/types";
import strings from "@/strings/en";

/**
 * PlanResult — displays the AI-generated content plan.
 * 5 styled sections + Copy/Download actions.
 */
interface PlanResultProps {
  plan: ContentPlanResult;
}

export default function PlanResult({ plan }: PlanResultProps) {
  const buildMarkdown = () => {
    return `# Video Content Plan

## 🎣 Opening Hook
${plan.opening_hook}

## 📋 Content Structure
${plan.content_structure}

## 💡 Key Points
${plan.key_points.map((p, i) => `${i + 1}. ${p}`).join("\n")}

## 🗣️ Ending CTA
${plan.ending_cta}

## 🖼️ Cover Text
${plan.cover_text}
`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(buildMarkdown());
    alert(strings.plan.copySuccess);
  };

  const handleDownload = () => {
    const blob = new Blob([buildMarkdown()], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "content-plan.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5 animate-fade-in">
      {/* 1. Opening Hook */}
      <Card className="border-l-4 border-l-[var(--color-primary)]">
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-2">
          🎣 {strings.plan.sections.openingHook}
        </h3>
        <blockquote className="text-base text-[var(--color-foreground)] italic leading-relaxed pl-2">
          &ldquo;{plan.opening_hook}&rdquo;
        </blockquote>
      </Card>

      {/* 2. Content Structure */}
      <Card>
        <h3 className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wide mb-3">
          📋 {strings.plan.sections.contentStructure}
        </h3>
        <div className="text-sm text-[var(--color-foreground)] leading-relaxed whitespace-pre-wrap">
          {plan.content_structure}
        </div>
      </Card>

      {/* 3. Key Points */}
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

      {/* 4. Ending CTA */}
      <Card className="bg-orange-50 border-orange-200">
        <h3 className="text-sm font-semibold text-orange-700 uppercase tracking-wide mb-2">
          🗣️ {strings.plan.sections.endingCta}
        </h3>
        <p className="text-sm text-orange-800 leading-relaxed">
          {plan.ending_cta}
        </p>
      </Card>

      {/* 5. Cover Text */}
      <Card className="border-2 border-dashed border-[var(--color-border)] bg-gray-50">
        <h3 className="text-sm font-semibold text-[var(--color-muted)] uppercase tracking-wide mb-2">
          🖼️ {strings.plan.sections.coverText}
        </h3>
        <p className="text-lg font-bold text-[var(--color-foreground)] text-center py-3">
          {plan.cover_text}
        </p>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-3">
        <Button variant="secondary" onClick={handleCopy}>
          {strings.plan.copyAll}
        </Button>
        <Button onClick={handleDownload}>
          {strings.plan.downloadMd}
        </Button>
      </div>
    </div>
  );
}
