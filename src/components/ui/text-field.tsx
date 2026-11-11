import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

export function TextField({ label, className, ...props }: TextFieldProps) {
  return (
    <label className="flex flex-col gap-2 text-sm text-ink-muted">
      {label}
      <input
        className={cn(
          "rounded-control border border-line bg-panel-raised px-4 py-3 text-base text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none",
          className,
        )}
        {...props}
      />
    </label>
  );
}
