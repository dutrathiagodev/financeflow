"use client";

import { useState } from "react";
import { useAccount } from "@/application/hooks/use-account";
import { Skeleton } from "@/components/ui/skeleton";
import { findCoin } from "@/domain/market/coin-queries";
import type { MarketCoin } from "@/domain/market/types";
import { AssetSummary } from "./asset-summary";
import { OrderForm } from "./order-form";

export function TradePanel({ coins }: { coins: MarketCoin[] }) {
  const { account, ready, buy, sell } = useAccount();
  const [coinId, setCoinId] = useState(coins[0].id);

  if (!ready) return <Skeleton className="h-96" />;

  const coin = findCoin(coins, coinId) ?? coins[0];
  const holdingQuantity = account.holdings.find((holding) => holding.assetId === coin.id)?.quantity ?? 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <OrderForm
        coins={coins}
        coin={coin}
        holdingQuantity={holdingQuantity}
        onCoinChange={setCoinId}
        onBuy={buy}
        onSell={sell}
      />
      <AssetSummary coin={coin} cash={account.cash} holdingQuantity={holdingQuantity} />
    </div>
  );
}
