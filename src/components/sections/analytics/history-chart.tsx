"use client";

import { useHistory } from "@/application/hooks/use-history";
import { Card } from "@/components/ui/card";
import { ChangePill } from "@/components/ui/change-pill";
import { PriceChart } from "@/components/ui/price-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { analyticsText } from "@/content/analytics";
import { downsample, priceStats } from "@/domain/market/chart";
import { timeLabel } from "@/lib/chart-labels";
import { formatUsd } from "@/lib/format";

const MAX_POINTS = 120;

export function HistoryChart({ assetId, days }: { assetId: string; days: number }) {
  const history = useHistory(assetId, days);

  if (history.status === "loading") return <Skeleton className="h-80" />;
  if (history.status === "error") return <p className="text-down">{analyticsText.error}</p>;

  const stats = priceStats(history.points.map((point) => point.price));
  if (!stats) return <p className="text-down">{analyticsText.error}</p>;

  const points = downsample(history.points, MAX_POINTS).map((point) => ({
    value: point.price,
    label: timeLabel(point.time, days),
  }));

  return (
    <>
      <Card>
        <div className="flex items-baseline gap-4">
          <p className="text-4xl font-medium tracking-tight">{formatUsd(stats.end)}</p>
          <ChangePill value={stats.changePercent} />
        </div>
        <PriceChart points={points} tone={stats.changePercent >= 0 ? "up" : "down"} className="mt-6" />
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label={analyticsText.stats.start} value={formatUsd(stats.start)} />
        <StatCard label={analyticsText.stats.end} value={formatUsd(stats.end)} />
        <StatCard label={analyticsText.stats.high} value={formatUsd(stats.high)} />
        <StatCard label={analyticsText.stats.low} value={formatUsd(stats.low)} />
      </div>
    </>
  );
}
