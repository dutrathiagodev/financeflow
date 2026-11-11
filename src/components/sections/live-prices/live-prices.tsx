import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { Icon } from "@/components/ui/icon";
import { Sparkline } from "@/components/ui/sparkline";
import { dashboardHeader, priceCards } from "@/content/market";
import { cn } from "@/lib/utils";

function splitPrice(price: string) {
  const index = price.lastIndexOf(",");
  return index === -1
    ? { main: price, decimal: "" }
    : { main: price.slice(0, index), decimal: price.slice(index) };
}

export function LivePrices() {
  return (
    <section aria-labelledby="live-prices-title" className="px-6 py-10 lg:px-10">
      <p className="flex items-center gap-3 text-ink-muted">
        <span className="grid size-6 place-items-center rounded-full bg-white/10">
          <span className="size-2 rounded-full bg-ink" />
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

      <ul className="mt-10 flex gap-5 overflow-x-auto pb-2">
        {priceCards.map((card) => {
          const up = card.change >= 0;
          const { main, decimal } = splitPrice(card.price);
          return (
            <li
              key={card.pair}
              className="relative min-w-80 flex-1 overflow-hidden rounded-card border border-line bg-panel p-6 pb-0"
            >
              <span
                className={cn(
                  "absolute left-0 top-36 h-8 w-0.5 rounded-full",
                  up ? "bg-btc" : "bg-eth",
                )}
              />
              <div className="flex items-center gap-4">
                <CoinBadge
                  coin={card.coin}
                  className="size-12 rounded-2xl bg-opacity-20 text-xl"
                />
                <div className="leading-tight">
                  <p className="text-sm text-ink-muted">{card.pair}</p>
                  <p className="text-xl">{card.name}</p>
                </div>
                <button
                  type="button"
                  aria-label={`Opções de ${card.name}`}
                  className="ml-auto grid size-10 place-items-center rounded-control bg-white/5 text-ink-muted"
                >
                  <Icon name="more" className="size-5" />
                </button>
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
                <ChangePill value={card.change} />
              </div>

              <div className="-mx-6 mt-2">
                <Sparkline
                  series={card.series}
                  markers={card.markers}
                  markerLabel={card.markerLabel}
                  tone={up ? "up" : "down"}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
