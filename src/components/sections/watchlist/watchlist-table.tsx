"use client";

import { CoinTable } from "@/components/ui/coin-table";
import { watchlistText } from "@/content/watchlist";
import { useFavorites } from "@/lib/use-favorites";
import type { MarketCoin } from "@/types/market";

export function WatchlistTable({ coins }: { coins: MarketCoin[] }) {
  const { ids } = useFavorites();
  const rows = coins.filter((c) => ids.includes(c.id));
  return <CoinTable coins={rows} emptyText={watchlistText.empty} />;
}
