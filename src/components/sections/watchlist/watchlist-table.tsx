"use client";

import { useFavorites } from "@/application/hooks/use-favorites";
import { CoinTable } from "@/components/ui/coin-table";
import { Skeleton } from "@/components/ui/skeleton";
import { watchlistText } from "@/content/watchlist";
import type { MarketCoin } from "@/domain/market/types";

export function WatchlistTable({ coins }: { coins: MarketCoin[] }) {
  const { ids, ready } = useFavorites();
  if (!ready) return <Skeleton className="h-48" />;

  return <CoinTable coins={coins.filter((coin) => ids.includes(coin.id))} emptyText={watchlistText.empty} />;
}
