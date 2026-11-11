import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { Icon } from "@/components/ui/icon";
import { Sparkline } from "@/components/ui/sparkline";
import { dashboardHeader, marketOverview } from "@/content/market";
import { toChartSeries } from "@/lib/chart";
import { getMarkets } from "@/lib/coingecko";
import { formatPercent, formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";

const accents = ["bg-btc", "bg-eth", "bg-accent", "bg-brand-mid"];

function splitPrice(price: string) {
  const index = price.lastIndexOf(",");
  return index === -1
    ? { main: price, decimal: "" }
    : { main: price.slice(0, index), decimal: price.slice(index) };
}

export async function LivePrices() {
  const cards = (await getMarkets()).slice(0, 4);

  return (
    <section aria-labelledby="live-prices-title" className="px-6 py-10 lg:px-10">
      <p className="flex items-center gap-3 text-ink-muted">
        <span className="grid size-6 place-items-center rounded-full bg-white/10">
          <span className="size-2 rounded-full bg-accent" />
        </span>
        {dashboardHeader.lastUpdateLabel}{" "}
        <span className="text-ink">{dashboardHeader.lastUpdateValue}</span>
      </p>
      <h1
        id="live-prices-title"
        className="mt-6 max-w-sm text-5xl font-medium leading-none tracking-tight"
      >
        {dashboardHeader.title}
      </h1>

      {cards.length === 0 ? (
        <p className="mt-10 text-ink-muted">{marketOverview.unavailable}</p>
      ) : (
        <ul className="mt-10 flex gap-5 overflow-x-auto pb-2">
          {cards.map((coin, index) => {
            const up = coin.change24h >= 0;
            const { series, markers } = toChartSeries(coin.sparkline);
            const { main, decimal } = splitPrice(formatUsd(coin.price));
            return (
              <li
                key={coin.id}
                className="relative min-w-80 flex-1 overflow-hidden rounded-card border border-line bg-panel p-6 pb-0"
              >
                <span
                  className={cn(
                    "absolute left-0 top-36 h-8 w-0.5 rounded-full",
                    accents[index % accents.length],
                  )}
                />
                <div className="flex items-center gap-4">
                  <CoinBadge image={coin.image} name={coin.name} className="size-12" />
                  <div className="leading-tight">
                    <p className="text-sm text-ink-muted">{coin.symbol}/USD</p>
                    <p className="text-xl">{coin.name}</p>
                  </div>
                  <div className="ml-auto">
                    <FavoriteButton id={coin.id} name={coin.name} />
                  </div>
                </div>

                <p className="mt-6 text-ink-muted">Preço</p>
                <p className="mt-1 text-5xl font-medium tracking-tight">
                  {main}
                  <span className="text-ink-muted">{decimal}</span>
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={cn(
                      "grid size-9 place-items-center rounded-full",
                      up ? "bg-up-soft text-up" : "bg-down-soft text-down",
                    )}
                  >
                    <Icon name={up ? "trendUp" : "trendDown"} className="size-4" />
                  </span>
                  <ChangePill value={coin.change24h} />
                </div>

                <div className="-mx-6 mt-2">
                  <Sparkline
                    series={series}
                    markers={markers}
                    markerLabel={formatPercent(coin.change7d)}
                    tone={up ? "up" : "down"}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
