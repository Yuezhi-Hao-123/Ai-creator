import EmptyState from "@/components/ui/EmptyState";
import strings from "@/strings/en";

/**
 * Creator Profile page — Stage 2 placeholder.
 * Full form will be added in Stage 3.
 */
export default function ProfilePage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--color-foreground)]">
        {strings.profile.title}
      </h1>
      <p className="mt-1 text-sm text-[var(--color-muted)]">
        {strings.profile.description}
      </p>
      <EmptyState
        title={strings.profile.emptyTitle}
        description={strings.profile.emptyDescription}
      />
    </div>
  );
}
