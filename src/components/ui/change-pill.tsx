import { formatPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

type ChangePillProps = {
  value: number;
  size?: "sm" | "md";
};

export function ChangePill({ value, size = "md" }: ChangePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        value >= 0 ? "bg-up-soft text-up" : "bg-down-soft text-down",
        size === "md" ? "px-3 py-1.5 text-base" : "px-3 py-1 text-xs",
      )}
    >
      {formatPercent(value)}
    </span>
  );
}
