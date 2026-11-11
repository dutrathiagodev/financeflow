import { MarketData } from "@/components/data/market-data";
import { dashboardHeader } from "@/content/market";
import { PriceCard } from "./price-card";

const CARD_COUNT = 4;
const ACCENTS = ["bg-btc", "bg-eth", "bg-accent", "bg-brand-mid"];

export function LivePrices() {
  return (
    <section aria-labelledby="live-prices-title" className="px-6 py-10 lg:px-10">
      <p className="flex items-center gap-3 text-ink-muted">
        <span className="grid size-6 place-items-center rounded-full bg-white/10">
          <span className="size-2 rounded-full bg-accent" />
        </span>
        {dashboardHeader.sourceLabel} <span className="text-ink">{dashboardHeader.sourceValue}</span>
      </p>
      <h1 id="live-prices-title" className="mt-6 max-w-sm text-5xl font-medium leading-none tracking-tight">
        {dashboardHeader.title}
      </h1>

      <div className="mt-10">
        <MarketData>
          {(coins) => (
            <ul className="flex gap-5 overflow-x-auto pb-2">
              {coins.slice(0, CARD_COUNT).map((coin, index) => (
                <PriceCard key={coin.id} coin={coin} accentClassName={ACCENTS[index % ACCENTS.length]} />
              ))}
            </ul>
          )}
        </MarketData>
      </div>
    </section>
  );
}
