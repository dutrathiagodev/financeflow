"use client";

import { usePersistedState } from "./use-persisted-state";
import { buy, createAccount, deposit, sell, withdraw } from "@/domain/account/operations";
import { parseAccount } from "@/domain/account/parse";
import type { AssetQuote, OperationMeta } from "@/domain/account/types";

const INITIAL_ACCOUNT = createAccount();

function newMeta(): OperationMeta {
  return { id: crypto.randomUUID(), time: Date.now() };
}

/** Conta simulada (paper trading). Toda regra vive em `domain/account`; aqui só se orquestra e persiste. */
export function useAccount() {
  const { value: account, ready, set, transact } = usePersistedState("ff:account", parseAccount, INITIAL_ACCOUNT);

  return {
    account,
    ready,
    deposit: (usd: number) => transact((a) => deposit(a, usd, newMeta())),
    withdraw: (usd: number) => transact((a) => withdraw(a, usd, newMeta())),
    buy: (quote: AssetQuote, usd: number) => transact((a) => buy(a, quote, usd, newMeta())),
    sell: (quote: AssetQuote, quantity: number) => transact((a) => sell(a, quote, quantity, newMeta())),
    reset: () => set(createAccount()),
  };
}
