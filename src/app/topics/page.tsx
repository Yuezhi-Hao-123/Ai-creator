import EmptyState from "@/components/ui/EmptyState";
import strings from "@/strings/en";

/**
 * Topic Ideas page — Stage 2 placeholder.
 * Full generation UI will be added in Stage 5.
 */
export default function TopicsPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.topics.title}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {strings.topics.description}
      </p>
      <EmptyState
        title={strings.topics.idleTitle}
        description={strings.topics.idleDescription}
      />
    </div>
  );
}
