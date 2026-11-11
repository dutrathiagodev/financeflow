"use client";

import { useState } from "react";
import { useAccount } from "@/application/hooks/use-account";
import { DataTable, type Column } from "@/components/ui/data-table";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { transactionFilters, transactionsText } from "@/content/trading";
import type { Transaction, TransactionType } from "@/domain/account/types";
import { filterTransactions, type TransactionFilter } from "@/domain/account/transactions";
import { formatQuantity, formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";

const TYPE_TONE: Record<TransactionType, string> = {
  buy: "bg-up-soft text-up",
  deposit: "bg-up-soft text-up",
  sell: "bg-down-soft text-down",
  withdraw: "bg-down-soft text-down",
};

const { columns: text, types } = transactionsText;

const columns: Column<Transaction>[] = [
  {
    id: "date",
    header: text.date,
    className: "text-sm text-ink-muted",
    cell: (t) => new Date(t.time).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" }),
  },
  {
    id: "type",
    header: text.type,
    cell: (t) => <span className={cn("rounded-full px-3 py-1 text-xs", TYPE_TONE[t.type])}>{types[t.type]}</span>,
  },
  { id: "asset", header: text.asset, cell: (t) => t.symbol ?? "USD" },
  { id: "quantity", header: text.quantity, cell: (t) => (t.quantity ? formatQuantity(t.quantity) : "—") },
  { id: "price", header: text.price, cell: (t) => (t.price ? formatUsd(t.price) : "—") },
  { id: "total", header: text.total, cell: (t) => formatUsd(t.usd) },
];

export function TransactionsTable() {
  const { account, ready } = useAccount();
  const [filter, setFilter] = useState<TransactionFilter>("all");

  if (!ready) return <Skeleton className="h-48" />;

  return (
    <div className="flex flex-col gap-6">
      <SegmentedTabs options={transactionFilters} value={filter} onChange={setFilter} label={transactionsText.filterLabel} />
      <DataTable
        columns={columns}
        rows={filterTransactions(account.transactions, filter)}
        rowKey={(t) => t.id}
        emptyText={transactionsText.empty}
        minWidth="min-w-2xl"
      />
    </div>
  );
}
