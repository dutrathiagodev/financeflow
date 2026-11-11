"use client";

import { useState } from "react";
import { transactionsText } from "@/content/trading";
import { formatQuantity, formatUsd } from "@/lib/format";
import { useAccount } from "@/lib/use-account";
import { cn } from "@/lib/utils";
import type { TransactionType } from "@/types/trading";

const tone: Record<TransactionType, string> = {
  buy: "bg-up-soft text-up",
  deposit: "bg-up-soft text-up",
  sell: "bg-down-soft text-down",
  withdraw: "bg-down-soft text-down",
};

const headCell = "px-4 py-4 text-left text-sm font-normal text-ink-muted";

export function TransactionsTable() {
  const { account } = useAccount();
  const [filter, setFilter] = useState("all");
  const { columns, types } = transactionsText;

  const rows = account.transactions.filter((t) =>
    filter === "all" ? true : filter === "cash" ? t.type === "deposit" || t.type === "withdraw" : t.type === filter,
  );

  return (
    <>
      <ul className="flex flex-wrap gap-2">
        {transactionsText.filters.map((item) => (
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

      <div className="overflow-x-auto rounded-3xl border border-line">
        <table className="w-full min-w-2xl">
          <thead className="border-b border-line">
            <tr>
              {Object.values(columns).map((label) => (
                <th key={label} scope="col" className={headCell}>{label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-b-0 hover:bg-white/[0.02]">
                <td className="px-4 py-4 text-sm text-ink-muted">
                  {new Date(t.time).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}
                </td>
                <td className="px-4 py-4">
                  <span className={cn("rounded-full px-3 py-1 text-xs", tone[t.type])}>{types[t.type]}</span>
                </td>
                <td className="px-4 py-4">{t.symbol ?? "USD"}</td>
                <td className="px-4 py-4">{t.quantity ? formatQuantity(t.quantity) : "—"}</td>
                <td className="px-4 py-4">{t.price ? formatUsd(t.price) : "—"}</td>
                <td className="px-4 py-4">{formatUsd(t.usd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <p className="p-6 text-ink-muted">{transactionsText.empty}</p>}
      </div>
    </>
  );
}
