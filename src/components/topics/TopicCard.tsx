"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useStrings } from "@/lib/i18n";
import type { TopicIdea } from "@/lib/types";

interface TopicCardProps {
  idea: TopicIdea;
  index: number;
  onSelect: (idea: TopicIdea) => void;
}

export default function TopicCard({ idea, index, onSelect }: TopicCardProps) {
  const strings = useStrings();
  const [expanded, setExpanded] = useState(false);

  const descShort = idea.description.length > 100 ? idea.description.slice(0, 100) + "..." : idea.description;

  return (
    <Card className="animate-fade-in flex flex-col h-full" style={{ animationDelay: `${index * 80}ms` } as React.CSSProperties}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-bold text-[var(--color-muted)] uppercase tracking-wider">Idea #{index + 1}</span>
        <Badge variant="accent">{idea.angle}</Badge>
      </div>
      <h3 className="text-base font-semibold text-[var(--color-foreground)] leading-snug">{idea.title}</h3>
      <p className="mt-2 text-sm text-[var(--color-muted)] leading-relaxed flex-1">
        {expanded ? idea.description : descShort}
        {idea.description.length > 100 && (
          <button onClick={() => setExpanded(!expanded)} className="ml-1 text-[var(--color-primary)] hover:underline text-sm cursor-pointer">
            {expanded ? "Show less" : "Read more"}
          </button>
        )}
      </p>
      <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
        <Button variant="secondary" size="sm" className="w-full" onClick={() => onSelect(idea)}>
          {strings.topics.createPlan} →
        </Button>
      </div>
    </Card>
  );
}
