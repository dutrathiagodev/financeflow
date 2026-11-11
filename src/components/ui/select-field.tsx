import type { SelectHTMLAttributes } from "react";

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "children"> & {
  label: string;
  options: readonly { value: string; label: string }[];
};

export function SelectField({ label, options, ...props }: SelectFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink-muted">
      {label}
      <select
        className="rounded-control border border-line bg-panel-raised px-4 py-3 text-base text-ink focus:border-accent focus:outline-none"
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
