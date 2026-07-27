import type { SelectHTMLAttributes } from "react";

/**
 * Select — unified dropdown matching Input styling.
 */
interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  label,
  options,
  placeholder,
  id,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-sm font-medium text-[var(--color-foreground)]"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={[
          "w-full rounded-[var(--radius-button)] border border-[var(--color-border)] bg-white px-3 py-2 text-sm text-[var(--color-foreground)] transition-colors appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        ].join(" ")}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
