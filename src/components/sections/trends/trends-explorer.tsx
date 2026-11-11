"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CoinTable } from "@/components/ui/coin-table";
import { trendsText, trendTabs } from "@/content/trends";
import { cn } from "@/lib/utils";
import type { MarketCoin } from "@/types/market";

type TabId = (typeof trendTabs)[number]["id"];

const sorters: Record<TabId, (a: MarketCoin, b: MarketCoin) => number> = {
  gainers: (a, b) => b.change24h - a.change24h,
  losers: (a, b) => a.change24h - b.change24h,
  volume: (a, b) => b.volume24h - a.volume24h,
};

export function TrendsExplorer({ coins }: { coins: MarketCoin[] }) {
  const params = useSearchParams();
  const [tab, setTab] = useState<TabId>("gainers");
  const [typed, setTyped] = useState<string | null>(null);
  const query = (typed ?? params.get("q") ?? "").trim().toLowerCase();

  const rows = coins
    .filter((c) => !query || c.name.toLowerCase().includes(query) || c.symbol.toLowerCase().includes(query))
    .sort(sorters[tab]);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex gap-2">
          {trendTabs.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-pressed={tab === item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "rounded-control px-5 py-3 text-lg transition-colors",
                  tab === item.id ? "bg-accent-soft text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <label className="rounded-control border border-line bg-panel-raised px-4 py-3">
          <span className="sr-only">{trendsText.searchLabel}</span>
          <input
            type="search"
            value={typed ?? params.get("q") ?? ""}
            onChange={(e) => setTyped(e.target.value)}
            placeholder={trendsText.searchPlaceholder}
            className="bg-transparent placeholder:text-ink-muted focus:outline-none"
          />
        </label>
      </div>
      <CoinTable coins={rows} emptyText={trendsText.empty} />
    </>
  );
}
