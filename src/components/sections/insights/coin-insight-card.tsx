import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { CoinBadge } from "@/components/ui/coin-badge";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";

type CoinInsightCardProps = {
  title: string;
  coin: MarketCoin;
  highlight: ReactNode;
};

export function CoinInsightCard({ title, coin, highlight }: CoinInsightCardProps) {
  return (
    <Card>
      <p className="text-ink-muted">{title}</p>
      <div className="mt-4 flex items-center gap-3">
        <CoinBadge image={coin.image} name={coin.name} className="size-10" />
        <div className="leading-tight">
          <p className="text-xl">{coin.name}</p>
          <p className="text-sm text-ink-muted">{formatUsd(coin.price)}</p>
        </div>
        <div className="ml-auto">{highlight}</div>
      </div>
    </Card>
  );
}
