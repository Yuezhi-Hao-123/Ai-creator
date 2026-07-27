import type { ReactNode } from "react";

/**
 * Badge — small label for categories, platforms, and engagement levels.
 * Variants: default (gray), accent (coral), primary (indigo), success (green), warning (yellow).
 */
type BadgeVariant = "default" | "accent" | "primary" | "success" | "warning";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700",
  accent: "bg-red-50 text-[var(--color-accent)]",
  primary: "bg-indigo-50 text-[var(--color-primary)]",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
};

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}
