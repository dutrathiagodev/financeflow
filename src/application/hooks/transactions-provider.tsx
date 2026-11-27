"use client";

import type { ReactNode } from "react";
import { TransactionsContext, useTransactionsState } from "./use-transactions";

/** Guarda as movimentacoes uma vez para o app inteiro (a persistencia entra no FF-0038). */
export function TransactionsProvider({ children }: { children: ReactNode }) {
  const api = useTransactionsState();
  return <TransactionsContext.Provider value={api}>{children}</TransactionsContext.Provider>;
}
