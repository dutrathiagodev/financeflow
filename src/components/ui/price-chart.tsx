"use client";

import { useId, useRef, useState, type PointerEvent } from "react";
import { formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";

export type ChartPoint = {
  label: string;
  value: number;
};

type PriceChartProps = {
  points: ChartPoint[];
  tone: "up" | "down";
  className?: string;
};

const WIDTH = 400;
const HEIGHT = 150;
const PAD = 14;

export function PriceChart({ points, tone, className }: PriceChartProps) {
  const gradientId = useId();
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<number | null>(null);

  if (points.length < 2) return null;

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = WIDTH / (points.length - 1);
  const coords = points.map((p, i) => ({
    x: i * step,
    y: HEIGHT - PAD - ((p.value - min) / range) * (HEIGHT - PAD * 2),
  }));
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(" ");
  const area = `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;
  const color = tone === "up" ? "var(--color-accent)" : "var(--color-down)";

  const index = active ?? points.length - 1;
  const point = coords[index];
  const left = (point.x / WIDTH) * 100;
  const top = (point.y / HEIGHT) * 100;

  const onMove = (event: PointerEvent<SVGSVGElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
    setActive(Math.round(ratio * (points.length - 1)));
  };

  return (
    <div className={cn("relative touch-pan-y select-none", className)}>
      <svg
        ref={ref}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label="Gráfico de preço. Passe o mouse para ver os valores."
        className="h-auto w-full cursor-crosshair overflow-visible"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setActive(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gradientId})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={1.6} strokeLinejoin="round" />
        {active !== null && (
          <line x1={point.x} x2={point.x} y1={0} y2={HEIGHT} stroke="var(--color-line-strong)" strokeDasharray="3 3" />
        )}
        {/* Desenhado dentro do SVG, sem transição, para ficar sempre exatamente sobre a linha. */}
        <circle cx={point.x} cy={point.y} r={4.5} fill="var(--color-canvas)" stroke={color} strokeWidth={1.8} />
      </svg>

      {active !== null && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 -translate-y-full whitespace-nowrap rounded-xl border border-line-strong bg-panel-raised px-3 py-2 text-xs shadow-glow"
          style={{
            left: `${Math.min(80, Math.max(20, left))}%`,
            top: `${Math.max(top - 8, 20)}%`,
            transform: "translate(-50%, -100%)",
          }}
        >
          <p className="text-ink-muted">{points[active].label}</p>
          <p className="mt-0.5 text-sm text-ink">{formatUsd(points[active].value)}</p>
        </div>
      )}
    </div>
  );
}
