import { cn } from "@/lib/utils";

type Option<T extends string> = { id: T; label: string };

type SegmentedTabsProps<T extends string> = {
  options: readonly Option<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
};

/** Grupo de botões exclusivos (filtro/aba). */
export function SegmentedTabs<T extends string>({ options, value, onChange, label }: SegmentedTabsProps<T>) {
  return (
    <ul role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <li key={option.id}>
          <button
            type="button"
            aria-pressed={value === option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "rounded-control px-5 py-3 text-lg transition-colors",
              value === option.id ? "bg-accent-soft text-ink" : "text-ink-muted hover:text-ink",
            )}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  );
}
