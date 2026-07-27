import type { ReactNode } from "react";

/**
 * EmptyState — placeholder shown when a feature area has no data yet.
 * Icon + title + description + optional CTA button text + action.
 */
interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in",
        className,
      ].join(" ")}
    >
      {icon ? (
        <div className="mb-4 text-[var(--color-muted)]">{icon}</div>
      ) : (
        <div className="mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-[var(--color-muted)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
            />
          </svg>
        </div>
      )}
      <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
        {title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-[var(--color-muted)]">
        {description}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex items-center gap-2 rounded-[var(--radius-button)] bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] transition-colors cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
