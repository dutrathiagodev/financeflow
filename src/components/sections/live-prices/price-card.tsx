import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { Icon } from "@/components/ui/icon";
import { PriceChart, type ChartPoint } from "@/components/ui/price-chart";
import { priceCardText } from "@/content/market";
import { downsample } from "@/domain/market/chart";
import type { MarketCoin } from "@/domain/market/types";
import { hoursAgoLabel } from "@/lib/chart-labels";
import { formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";

const CHART_POINTS = 56;

/** O sparkline da API é horário e termina "agora"; cada ponto recebe um rótulo relativo. */
function toChartPoints(sparkline: number[]): ChartPoint[] {
  const lastIndex = sparkline.length - 1;
  const hourly = sparkline.map((value, index) => ({ value, hoursAgo: lastIndex - index }));
  return downsample(hourly, CHART_POINTS).map(({ value, hoursAgo }) => ({ value, label: hoursAgoLabel(hoursAgo) }));
}

/** Separa a parte decimal para exibi-la com menos destaque. */
function splitDecimals(formatted: string) {
  const index = formatted.lastIndexOf(",");
  return index === -1 ? { main: formatted, decimals: "" } : { main: formatted.slice(0, index), decimals: formatted.slice(index) };
}

type PriceCardProps = {
  coin: MarketCoin;
  accentClassName: string;
};

export function PriceCard({ coin, accentClassName }: PriceCardProps) {
  const rising = coin.change24h >= 0;
  const { main, decimals } = splitDecimals(formatUsd(coin.price));

  return (
    <li className="relative min-w-80 flex-1 overflow-hidden rounded-card border border-line bg-panel p-6 pb-0 transition-colors hover:border-line-strong">
      <span className={cn("absolute left-0 top-36 h-8 w-0.5 rounded-full", accentClassName)} />

      <div className="flex items-center gap-4">
        <CoinBadge image={coin.image} name={coin.name} className="size-12" />
        <div className="leading-tight">
          <p className="text-sm text-ink-muted">{priceCardText.pair(coin.symbol)}</p>
          <p className="text-xl">{coin.name}</p>
        </div>
        <div className="ml-auto">
          <FavoriteButton id={coin.id} name={coin.name} />
        </div>
      </div>

      <p className="mt-6 text-ink-muted">{priceCardText.price}</p>
      <p className="mt-1 text-5xl font-medium tracking-tight">
        {main}
        <span className="text-ink-muted">{decimals}</span>
      </p>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={cn(
            "grid size-9 place-items-center rounded-full",
            rising ? "bg-up-soft text-up" : "bg-down-soft text-down",
          )}
        >
          <Icon name={rising ? "trendUp" : "trendDown"} className="size-4" />
        </span>
        <ChangePill value={coin.change24h} />
      </div>

      <PriceChart points={toChartPoints(coin.sparkline)} tone={rising ? "up" : "down"} className="-mx-6 mt-2" />
    </li>
  );
}
