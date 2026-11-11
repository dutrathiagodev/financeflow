"use client";

import { useState } from "react";
import { CoinTable, type SortKey } from "@/components/ui/coin-table";
import { marketFilters } from "@/content/market";
import { cn } from "@/lib/utils";
import type { MarketCoin } from "@/types/market";

export function MarketTable({ coins }: { coins: MarketCoin[] }) {
  const [filter, setFilter] = useState<(typeof marketFilters)[number]["id"]>("all");
  const [sort, setSort] = useState<{ key: SortKey; desc: boolean }>({ key: "rank", desc: false });

  const rows = coins
    .filter((c) => (filter === "gainers" ? c.change24h > 0 : filter === "losers" ? c.change24h < 0 : true))
    .sort((a, b) => (sort.desc ? -1 : 1) * (a[sort.key] - b[sort.key]))
    .slice(0, 15);

  const toggleSort = (key: SortKey) =>
    setSort((s) => ({ key, desc: s.key === key ? !s.desc : key === "price" }));

  return (
    <>
      <ul className="mb-6 flex gap-2">
        {marketFilters.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              aria-pressed={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "rounded-control px-5 py-3 text-lg transition-colors",
                filter === item.id ? "bg-accent-soft text-ink" : "text-ink-muted hover:text-ink",
              )}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
      <CoinTable coins={rows} onSort={toggleSort} />
    </>
  );
}
