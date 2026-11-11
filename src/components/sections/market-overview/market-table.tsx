"use client";

import { useState } from "react";
import { CoinTable } from "@/components/ui/coin-table";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { marketFilters, marketOverview } from "@/content/market";
import { filterByTrend, sortCoins, type SortKey, type TrendFilter } from "@/domain/market/coin-queries";
import type { MarketCoin } from "@/domain/market/types";

const VISIBLE_ROWS = 15;

type Sort = { key: SortKey; descending: boolean };

export function MarketTable({ coins }: { coins: MarketCoin[] }) {
  const [filter, setFilter] = useState<TrendFilter>("all");
  const [sort, setSort] = useState<Sort>({ key: "rank", descending: false });

  const rows = sortCoins(filterByTrend(coins, filter), sort.key, sort.descending).slice(0, VISIBLE_ROWS);

  // Mesma coluna inverte a direção; coluna nova começa em ordem natural (preço: maior primeiro).
  const toggleSort = (key: SortKey) =>
    setSort((current) => ({ key, descending: current.key === key ? !current.descending : key === "price" }));

  return (
    <div className="flex flex-col gap-6">
      <SegmentedTabs options={marketFilters} value={filter} onChange={setFilter} label={marketOverview.filterLabel} />
      <CoinTable coins={rows} onSort={toggleSort} />
    </div>
  );
}
