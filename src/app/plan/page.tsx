"use client";

import { useState, useEffect, useCallback } from "react";
import PlanResult from "@/components/plan/PlanResult";
import EmptyState from "@/components/ui/EmptyState";
import { TopicCardSkeleton } from "@/components/ui/Skeleton";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import strings from "@/strings/en";
import type { TopicIdea, ContentPlanResult } from "@/lib/types";

/**
 * Content Plan page — auto-generates plan from selected topic.
 * Falls back to manual input if no topic was selected.
 */
export default function PlanPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ContentPlanResult | null>(null);
  const [topic, setTopic] = useState<TopicIdea | null>(null);

  // Manual input fallback fields
  const [manualTitle, setManualTitle] = useState("");
  const [manualAngle, setManualAngle] = useState("");
  const [manualDesc, setManualDesc] = useState("");

  // Define generatePlan before the effect that calls it
  const generatePlan = useCallback(async (idea: TopicIdea) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selected_topic: idea }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || strings.errors.unknown);
      }

      setResult(data as ContentPlanResult);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : strings.errors.unknown
      );
    } finally {
      setLoading(false);
    }
  }, []);

  // Load topic from localStorage on mount and auto-generate
  useEffect(() => {
    try {
      const stored = localStorage.getItem("selected_topic");
      if (stored) {
        const parsed = JSON.parse(stored) as TopicIdea;
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time init from external source
        setTopic(parsed);
        generatePlan(parsed);
        localStorage.removeItem("selected_topic");
      }
    } catch {
      // Invalid stored data — ignore
    }
  }, [generatePlan]);

  const handleManualGenerate = () => {
    if (!manualTitle.trim() || !manualAngle.trim()) return;

    const idea: TopicIdea = {
      title: manualTitle.trim(),
      angle: manualAngle.trim(),
      description: manualDesc.trim() || "No description provided.",
    };
    setTopic(idea);
    generatePlan(idea);
  };

  // ---- Render ----

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.plan.title}
      </h1>
      <p className="mt-1 mb-6 text-sm text-[var(--color-muted)]">
        {strings.plan.description}
      </p>

      {/* Loading */}
      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <TopicCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-[var(--radius-card)] p-5">
          <p className="text-sm font-medium text-red-800">
            {strings.errors.parseFailed}
          </p>
          <p className="mt-1 text-sm text-red-600">{error}</p>
          {topic && (
            <button
              onClick={() => generatePlan(topic)}
              className="mt-2 text-sm font-medium text-red-700 underline cursor-pointer"
            >
              {strings.general.retry}
            </button>
          )}
        </div>
      )}

      {/* Success */}
      {result && !loading && !error && topic && <PlanResult plan={result} />}

      {/* Idle / no topic */}
      {!topic && !loading && !error && !result && (
        <div className="space-y-6">
          <EmptyState
            title={strings.plan.emptyTitle}
            description={strings.plan.emptyDescription}
          />

          {/* Manual input fallback */}
          <Card className="max-w-lg mx-auto">
            <h2 className="text-sm font-semibold text-[var(--color-foreground)] mb-4">
              Or enter a topic manually
            </h2>
            <div className="space-y-4">
              <Input
                label="Title"
                placeholder="Your video title..."
                value={manualTitle}
                onChange={(e) => setManualTitle(e.target.value)}
              />
              <Input
                label="Angle"
                placeholder="Unique perspective..."
                value={manualAngle}
                onChange={(e) => setManualAngle(e.target.value)}
              />
              <Input
                label="Description"
                placeholder="Brief summary (optional)..."
                value={manualDesc}
                onChange={(e) => setManualDesc(e.target.value)}
              />
              <Button
                onClick={handleManualGenerate}
                disabled={!manualTitle.trim() || !manualAngle.trim()}
                className="w-full"
              >
                Generate Plan
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
