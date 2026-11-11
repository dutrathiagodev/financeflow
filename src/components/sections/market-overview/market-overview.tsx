import { Icon } from "@/components/ui/icon";
import { marketOverview } from "@/content/market";
import { getMarkets } from "@/lib/coingecko";
import { MarketTable } from "./market-table";

export async function MarketOverview() {
  const coins = await getMarkets();

  return (
    <section
      aria-labelledby="market-overview-title"
      className="mx-6 border-t border-line py-10 lg:mx-10"
    >
      <div className="mb-6">
        <p className="flex items-center gap-2 text-sm text-ink-muted">
          <Icon name="clock" className="size-4" />
          {marketOverview.eyebrow}
        </p>
        <h2 id="market-overview-title" className="mt-2 text-3xl font-medium tracking-tight">
          {marketOverview.title}
        </h2>
      </div>
      {coins.length === 0 ? (
        <p className="text-ink-muted">{marketOverview.unavailable}</p>
      ) : (
        <MarketTable coins={coins} />
      )}
    </section>
  );
}
