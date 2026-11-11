"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CoinTable } from "@/components/ui/coin-table";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { trendsText, trendTabs } from "@/content/trends";
import { rankCoins, searchCoins, type TrendRanking } from "@/domain/market/coin-queries";
import type { MarketCoin } from "@/domain/market/types";

export function TrendsExplorer({ coins }: { coins: MarketCoin[] }) {
  const initialQuery = useSearchParams().get("q") ?? "";
  const [ranking, setRanking] = useState<TrendRanking>("gainers");
  // null = o usuário ainda não digitou; vale o termo vindo da busca do topo (?q=).
  const [typed, setTyped] = useState<string | null>(null);
  const query = typed ?? initialQuery;

  const rows = rankCoins(searchCoins(coins, query), ranking);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SegmentedTabs options={trendTabs} value={ranking} onChange={setRanking} label={trendsText.tabsLabel} />
        <label className="rounded-control border border-line bg-panel-raised px-4 py-3 focus-within:border-accent">
          <span className="sr-only">{trendsText.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setTyped(event.target.value)}
            placeholder={trendsText.searchPlaceholder}
            className="bg-transparent placeholder:text-ink-muted focus:outline-none"
          />
        </label>
      </div>
      <CoinTable coins={rows} emptyText={trendsText.empty} />
    </div>
  );
}
