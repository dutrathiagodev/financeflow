import { Card } from "@/components/ui/card";
import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { PageHeading } from "@/components/ui/page-heading";
import { insightsText } from "@/content/insights";
import { getMarkets } from "@/lib/coingecko";
import { formatCompactUsd, formatUsd } from "@/lib/format";
import type { MarketCoin } from "@/types/market";

function CoinInsight({ title, coin, value }: { title: string; coin: MarketCoin; value: React.ReactNode }) {
  return (
    <Card>
      <p className="text-ink-muted">{title}</p>
      <div className="mt-4 flex items-center gap-3">
        <CoinBadge image={coin.image} name={coin.name} className="size-10" />
        <div className="leading-tight">
          <p className="text-xl">{coin.name}</p>
          <p className="text-sm text-ink-muted">{formatUsd(coin.price)}</p>
        </div>
        <div className="ml-auto">{value}</div>
      </div>
    </Card>
  );
}

export async function Insights() {
  const coins = await getMarkets();

  if (coins.length === 0) {
    return (
      <section className="px-6 py-10 lg:px-10">
        <PageHeading title={insightsText.title} />
        <p className="mt-6 text-ink-muted">{insightsText.unavailable}</p>
      </section>
    );
  }

  const by24h = [...coins].sort((a, b) => b.change24h - a.change24h);
  const by7d = [...coins].sort((a, b) => b.change7d - a.change7d);
  const byVolume = [...coins].sort((a, b) => b.volume24h - a.volume24h);
  const totalCap = coins.reduce((s, c) => s + c.marketCap, 0);
  const btc = coins.find((c) => c.id === "bitcoin");
  const dominance = btc ? (btc.marketCap / totalCap) * 100 : 0;
  const rising = coins.filter((c) => c.change24h > 0).length;
  const share = (rising / coins.length) * 100;
  const sentiment = share >= 60 ? insightsText.sentimentUp : share <= 40 ? insightsText.sentimentDown : insightsText.sentimentFlat;

  return (
    <section className="flex flex-col gap-8 px-6 py-10 lg:px-10">
      <PageHeading title={insightsText.title} description={insightsText.description} />

      <Card className="bg-linear-to-br from-[#1b3023] to-panel">
        <p className="text-ink-muted">{insightsText.breadth}</p>
        <p className="mt-2 text-5xl font-medium tracking-tight">
          {rising}/{coins.length}
        </p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-panel-raised">
          <div className="h-full rounded-full bg-accent" style={{ width: `${share}%` }} />
        </div>
        <p className="mt-3 text-ink-muted">{sentiment}</p>
        <p className="mt-1 text-sm text-ink-faint">{insightsText.breadthHint}</p>
      </Card>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        <CoinInsight title={insightsText.topGainer} coin={by24h[0]} value={<ChangePill value={by24h[0].change24h} />} />
        <CoinInsight title={insightsText.topLoser} coin={by24h[by24h.length - 1]} value={<ChangePill value={by24h[by24h.length - 1].change24h} />} />
        <CoinInsight title={insightsText.topVolume} coin={byVolume[0]} value={<span className="text-lg">{formatCompactUsd(byVolume[0].volume24h)}</span>} />
        <CoinInsight title={insightsText.weekLeader} coin={by7d[0]} value={<ChangePill value={by7d[0].change7d} />} />
        <Card className="md:col-span-1 xl:col-span-2">
          <p className="text-ink-muted">{insightsText.dominance}</p>
          <p className="mt-2 text-4xl font-medium tracking-tight">{dominance.toFixed(1).replace(".", ",")}%</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-panel-raised">
            <div className="h-full rounded-full bg-btc" style={{ width: `${dominance}%` }} />
          </div>
          <p className="mt-3 text-sm text-ink-faint">{insightsText.dominanceHint}</p>
        </Card>
      </div>
    </section>
  );
}
