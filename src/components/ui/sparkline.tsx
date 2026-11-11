import { useId } from "react";

type SparklineProps = {
  series: number[];
  markers: number[];
  markerLabel?: string;
  tone: "up" | "down";
};

const WIDTH = 400;
const HEIGHT = 150;
const PAD = 12;

const tones = {
  up: { stroke: "var(--color-ink-muted)", glow: "var(--color-accent)" },
  down: { stroke: "var(--color-down)", glow: "var(--color-down)" },
};

export function Sparkline({ series, markers, markerLabel, tone }: SparklineProps) {
  const gradientId = useId();
  const step = WIDTH / (series.length - 1);
  const points = series.map((value, index) => ({
    x: index * step,
    y: HEIGHT - PAD - (value / 100) * (HEIGHT - PAD * 2),
  }));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const area = `${line} L${WIDTH},${HEIGHT} L0,${HEIGHT} Z`;
  const { stroke, glow } = tones[tone];
  const labelPoint = points[markers[markers.length - 1]];

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
     
      role="img"
      aria-label="Variação de preço recente"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={glow} stopOpacity="0.25" />
          <stop offset="100%" stopColor={glow} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gradientId})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {markers.map((index) => (
        <circle
          key={index}
          cx={points[index].x}
          cy={points[index].y}
          r={5}
          fill="var(--color-canvas)"
          stroke="var(--color-ink-muted)"
          strokeWidth={1.5}
        />
      ))}
      {markerLabel && (
        <text
          x={labelPoint.x - 8}
          y={labelPoint.y - 12}
          textAnchor="end"
          fontSize={12}
          fill="var(--color-ink)"
        >
          {markerLabel}
        </text>
      )}
    </svg>
  );
}
