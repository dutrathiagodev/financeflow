import { cn } from "@/lib/utils";

type SwitchProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
};

/** Interruptor acessível (role="switch") com rótulo e descrição opcional. */
export function Switch({ checked, onChange, label, description }: SwitchProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-base">{label}</p>
        {description && <p className="text-sm text-ink-muted">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-7 w-12 shrink-0 rounded-full border transition-colors",
          checked ? "border-accent bg-accent-soft" : "border-line-strong bg-panel-raised",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5.5 rounded-full transition-all",
            checked ? "left-[calc(100%-1.625rem)] bg-accent" : "left-0.5 bg-ink-muted",
          )}
        />
      </button>
    </div>
  );
}
