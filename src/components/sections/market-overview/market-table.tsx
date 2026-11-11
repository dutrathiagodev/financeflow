"use client";

import { useState } from "react";
import { ChangePill } from "@/components/ui/change-pill";
import { CoinBadge } from "@/components/ui/coin-badge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { Icon } from "@/components/ui/icon";
import { marketFilters, marketOverview } from "@/content/market";
import { formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MarketCoin } from "@/types/market";

type SortKey = "rank" | "price";

const headCell = "px-4 py-4 text-left text-sm font-normal text-ink-muted";

export function MarketTable({ coins }: { coins: MarketCoin[] }) {
  const { columns } = marketOverview;
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
      <ul className="flex gap-2">
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

      <div className="mt-6 overflow-x-auto rounded-3xl border border-line">
        <table className="w-full min-w-xl">
          <thead className="border-b border-line">
            <tr>
              <th scope="col" className={headCell}>
                <button type="button" onClick={() => toggleSort("rank")} className="inline-flex items-center gap-1">
                  {columns.rank}
                  <Icon name="sort" className="size-4" />
                </button>
              </th>
              <th scope="col" className={headCell}>{columns.coin}</th>
              <th scope="col" className={headCell}>
                <button type="button" onClick={() => toggleSort("price")} className="inline-flex items-center gap-1">
                  {columns.price}
                  <Icon name="sort" className="size-4" />
                </button>
              </th>
              <th scope="col" className={headCell}>{columns.change7d}</th>
              <th scope="col" className={headCell}>{columns.change24h}</th>
              <th scope="col" className={headCell}><span className="sr-only">{columns.favorite}</span></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((coin) => (
              <tr key={coin.id} className="border-b border-line last:border-b-0">
                <td className="px-4 py-5 text-sm text-ink-muted">#{coin.rank}</td>
                <td className="px-4 py-5">
                  <span className="flex items-center gap-3 text-lg">
                    <CoinBadge image={coin.image} name={coin.name} />
                    {coin.name}
                    <span className="text-sm text-ink-muted">{coin.symbol}</span>
                  </span>
                </td>
                <td className="px-4 py-5">{formatUsd(coin.price)}</td>
                <td className="px-4 py-5"><ChangePill value={coin.change7d} size="sm" /></td>
                <td className="px-4 py-5"><ChangePill value={coin.change24h} size="sm" /></td>
                <td className="px-4 py-5"><FavoriteButton id={coin.id} name={coin.name} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-ink-muted">{marketOverview.empty}</p>}
      </div>
    </>
  );
}
