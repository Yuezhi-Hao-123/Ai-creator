import type { InputHTMLAttributes } from "react";

/**
 * Input — unified text input with focus ring in indigo.
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export default function Input({
  label,
  id,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        ].join(" ")}
        {...props}
      />
    </div>
  );
}
