import { cn } from "@/lib/utils";

type ChangePillProps = {
  value: number;
  size?: "sm" | "md";
};

export function formatChange(value: number) {
  const abs = Math.abs(value).toFixed(2).replace(".", ",");
  return `${value >= 0 ? "+" : "-"} ${abs}%`;
}

export function ChangePill({ value, size = "md" }: ChangePillProps) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        up ? "bg-up-soft text-up" : "bg-down-soft text-down",
        size === "md" ? "px-3 py-1.5 text-base" : "px-3 py-1 text-xs",
      )}
    >
      {formatChange(value)}
    </span>
  );
}
