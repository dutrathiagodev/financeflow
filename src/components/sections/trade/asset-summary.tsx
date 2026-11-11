import { Card } from "@/components/ui/card";
import { CoinBadge } from "@/components/ui/coin-badge";
import { tradeText } from "@/content/trading";
import type { MarketCoin } from "@/domain/market/types";
import { formatQuantity, formatUsd } from "@/lib/format";

type AssetSummaryProps = {
  coin: MarketCoin;
  cash: number;
  holdingQuantity: number;
};

export function AssetSummary({ coin, cash, holdingQuantity }: AssetSummaryProps) {
  return (
    <Card className="h-fit">
      <div className="flex items-center gap-3">
        <CoinBadge image={coin.image} name={coin.name} className="size-10" />
        <div className="leading-tight">
          <p className="text-lg">{coin.name}</p>
          <p className="text-sm text-ink-muted">{coin.symbol}</p>
        </div>
      </div>
      <dl className="mt-6 flex flex-col gap-4">
        <div>
          <dt className="text-sm text-ink-muted">{tradeText.price}</dt>
          <dd className="text-2xl">{formatUsd(coin.price)}</dd>
        </div>
        <div>
          <dt className="text-sm text-ink-muted">{tradeText.available}</dt>
          <dd className="text-lg">{formatUsd(cash)}</dd>
        </div>
        <div>
          <dt className="text-sm text-ink-muted">{tradeText.holding}</dt>
          <dd className="text-lg">
            {formatQuantity(holdingQuantity)} {coin.symbol}
          </dd>
        </div>
      </dl>
    </Card>
  );
}
