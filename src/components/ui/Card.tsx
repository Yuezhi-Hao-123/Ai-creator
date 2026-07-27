import type { ReactNode } from "react";

/**
 * Card — white rounded container with shadow.
 * Clean Minimal style: shadow-sm default, shadow-md on hover.
 */
interface CardProps {
  children: ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  hover = true,
  className = "",
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={[
        "bg-[var(--color-surface)] rounded-[var(--radius-card)] p-5 shadow-[var(--shadow-card)] border border-[var(--color-border)]",
        hover
          ? "transition-all duration-200 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-0.5"
          : "",
        onClick ? "cursor-pointer" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  );
}
