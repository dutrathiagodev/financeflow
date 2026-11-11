import { Card } from "@/components/ui/card";
import { ChangePill } from "@/components/ui/change-pill";
import { ProgressBar } from "@/components/ui/progress-bar";
import { StatCard } from "@/components/ui/stat-card";
import { insightsText, sentimentText } from "@/content/insights";
import { computeInsights } from "@/domain/market/insights";
import type { MarketCoin } from "@/domain/market/types";
import { formatCompactUsd, formatPlainPercent } from "@/lib/format";
import { CoinInsightCard } from "./coin-insight-card";

export function InsightsGrid({ coins }: { coins: MarketCoin[] }) {
  const insights = computeInsights(coins);
  if (!insights) return null;

  return (
    <div className="flex flex-col gap-6">
      <StatCard
        label={insightsText.breadth}
        value={`${insights.risingCount}/${insights.totalCount}`}
        className="bg-linear-to-br from-[#1b3023] to-panel"
      >
        <ProgressBar className="mt-4" segments={[{ percent: insights.risingShare, className: "bg-accent" }]} />
        <p className="mt-3 text-ink-muted">{sentimentText[insights.sentiment]}</p>
        <p className="mt-1 text-sm text-ink-faint">{insightsText.breadthHint(insights.totalCount)}</p>
      </StatCard>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <CoinInsightCard
          title={insightsText.topGainer}
          coin={insights.topGainer}
          highlight={<ChangePill value={insights.topGainer.change24h} />}
        />
        <CoinInsightCard
          title={insightsText.topLoser}
          coin={insights.topLoser}
          highlight={<ChangePill value={insights.topLoser.change24h} />}
        />
        <CoinInsightCard
          title={insightsText.topVolume}
          coin={insights.topVolume}
          highlight={<span className="text-lg">{formatCompactUsd(insights.topVolume.volume24h)}</span>}
        />
        <CoinInsightCard
          title={insightsText.weekLeader}
          coin={insights.weekLeader}
          highlight={<ChangePill value={insights.weekLeader.change7d} />}
        />
        <Card className="xl:col-span-2">
          <p className="text-ink-muted">{insightsText.dominance}</p>
          <p className="mt-2 text-4xl font-medium tracking-tight">{formatPlainPercent(insights.bitcoinDominance)}</p>
          <ProgressBar className="mt-4" segments={[{ percent: insights.bitcoinDominance, className: "bg-btc" }]} />
          <p className="mt-3 text-sm text-ink-faint">{insightsText.dominanceHint}</p>
        </Card>
      </div>
    </div>
  );
}
