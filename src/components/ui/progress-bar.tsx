import { cn } from "@/lib/utils";

type Segment = { percent: number; className: string; label?: string };

/** Barra de proporção com um ou mais segmentos. Valores são limitados a 0-100. */
export function ProgressBar({ segments, className }: { segments: Segment[]; className?: string }) {
  return (
    <div className={cn("flex h-2.5 overflow-hidden rounded-full bg-panel-raised", className)}>
      {segments.map((segment, index) => (
        <div
          key={index}
          title={segment.label}
          className={cn("h-full transition-[width]", segment.className)}
          style={{ width: `${Math.min(100, Math.max(0, segment.percent))}%` }}
        />
      ))}
    </div>
  );
}
