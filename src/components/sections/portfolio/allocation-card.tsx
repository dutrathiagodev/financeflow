import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { portfolioText } from "@/content/trading";
import type { allocation } from "@/domain/account/portfolio";
import { formatPlainPercent } from "@/lib/format";
import { cn } from "@/lib/utils";

const COLORS = ["bg-accent", "bg-brand-leaf", "bg-brand-mid", "bg-brand-mint", "bg-btc", "bg-eth"];

export function AllocationCard({ slices }: { slices: ReturnType<typeof allocation> }) {
  const colorOf = (index: number) => COLORS[index % COLORS.length];

  return (
    <Card>
      <h2 className="text-xl font-medium">{portfolioText.allocation}</h2>
      <ProgressBar
        className="mt-4"
        segments={slices.map((slice, index) => ({
          percent: slice.percent,
          className: colorOf(index),
          label: `${slice.symbol}: ${formatPlainPercent(slice.percent)}`,
        }))}
      />
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
        {slices.map((slice, index) => (
          <li key={slice.assetId} className="flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", colorOf(index))} />
            {slice.symbol} {formatPlainPercent(slice.percent)}
          </li>
        ))}
      </ul>
    </Card>
  );
}
