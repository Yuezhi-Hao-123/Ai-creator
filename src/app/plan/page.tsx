import EmptyState from "@/components/ui/EmptyState";
import strings from "@/strings/en";

/**
 * Content Plan page — Stage 2 placeholder.
 * Full content plan UI will be added in Stage 6.
 */
export default function PlanPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.plan.title}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {strings.plan.description}
      </p>
      <EmptyState
        title={strings.plan.emptyTitle}
        description={strings.plan.emptyDescription}
      />
    </div>
  );
}
