import type { Transaction } from "./types";

export type TransactionFilter = "all" | "buy" | "sell" | "cash";

export function filterTransactions(transactions: Transaction[], filter: TransactionFilter): Transaction[] {
  switch (filter) {
    case "all":
      return transactions;
    case "cash":
      return transactions.filter((t) => t.type === "deposit" || t.type === "withdraw");
    default:
      return transactions.filter((t) => t.type === filter);
  }
}
