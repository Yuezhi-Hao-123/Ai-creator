import EmptyState from "@/components/ui/EmptyState";
import strings from "@/strings/en";

/**
 * Performance Analysis page — Stage 2 placeholder.
 * Full analysis UI will be added in Stage 7.
 */
export default function AnalyzePage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.analyze.title}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {strings.analyze.description}
      </p>
      <EmptyState
        title={strings.analyze.idleTitle}
        description={strings.analyze.idleDescription}
      />
    </div>
  );
}
