/**
 * Skeleton — pulsing placeholder for loading states.
 * Used while waiting for AI results.
 */
interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={[
        "rounded-[var(--radius-card)] bg-gray-200 animate-skeleton",
        className,
      ].join(" ")}
    />
  );
}

/** Pre-built topic card skeleton — matches TopicCard layout. */
export function TopicCardSkeleton() {
  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-5 border border-[var(--color-border)] space-y-3">
      <div className="flex justify-between">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <Skeleton className="h-5 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <div className="pt-3 border-t border-[var(--color-border)]">
        <Skeleton className="h-9 w-full rounded-[var(--radius-button)]" />
      </div>
    </div>
  );
}
