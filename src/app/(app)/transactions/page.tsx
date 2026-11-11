import type { Metadata } from "next";
import { Transactions } from "@/components/sections/transactions/transactions";

export const metadata: Metadata = { title: "Transações · FinanceFlow" };

export default function TransactionsPage() {
  return <Transactions />;
}
