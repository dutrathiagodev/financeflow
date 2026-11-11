"use client";

import { useLocalStore } from "@/lib/use-local-store";
import type { Account, Transaction } from "@/types/trading";
import type { MarketCoin } from "@/types/market";

export const INITIAL_CASH = 10_000;

const initial: Account = { cash: INITIAL_CASH, holdings: [], transactions: [] };

type Result = { ok: true } | { ok: false; error: string };

function tx(partial: Omit<Transaction, "id" | "time">): Transaction {
  return { id: crypto.randomUUID(), time: Date.now(), ...partial };
}

/** Conta simulada (paper trading) persistida no navegador. */
export function useAccount() {
  const [account, setAccount] = useLocalStore<Account>("ff:account", initial);

  const deposit = (usd: number): Result => {
    if (!(usd > 0)) return { ok: false, error: "Informe um valor maior que zero." };
    setAccount((a) => ({ ...a, cash: a.cash + usd, transactions: [tx({ type: "deposit", usd }), ...a.transactions] }));
    return { ok: true };
  };

  const withdraw = (usd: number): Result => {
    if (!(usd > 0)) return { ok: false, error: "Informe um valor maior que zero." };
    if (usd > account.cash) return { ok: false, error: "Saldo insuficiente." };
    setAccount((a) => ({ ...a, cash: a.cash - usd, transactions: [tx({ type: "withdraw", usd }), ...a.transactions] }));
    return { ok: true };
  };

  const buy = (coin: MarketCoin, usd: number): Result => {
    if (!(usd > 0)) return { ok: false, error: "Informe um valor maior que zero." };
    if (usd > account.cash) return { ok: false, error: "Saldo insuficiente." };
    const quantity = usd / coin.price;
    setAccount((a) => {
      const existing = a.holdings.find((h) => h.coinId === coin.id);
      const holdings = existing
        ? a.holdings.map((h) =>
            h.coinId === coin.id ? { ...h, quantity: h.quantity + quantity, cost: h.cost + usd } : h,
          )
        : [
            ...a.holdings,
            { coinId: coin.id, symbol: coin.symbol, name: coin.name, image: coin.image, quantity, cost: usd },
          ];
      return {
        cash: a.cash - usd,
        holdings,
        transactions: [
          tx({ type: "buy", usd, coinId: coin.id, symbol: coin.symbol, quantity, price: coin.price }),
          ...a.transactions,
        ],
      };
    });
    return { ok: true };
  };

  const sell = (coin: MarketCoin, quantity: number): Result => {
    const holding = account.holdings.find((h) => h.coinId === coin.id);
    if (!(quantity > 0)) return { ok: false, error: "Informe uma quantidade maior que zero." };
    if (!holding || quantity > holding.quantity + 1e-12) return { ok: false, error: "Você não tem essa quantidade." };
    const usd = quantity * coin.price;
    setAccount((a) => {
      const holdings = a.holdings
        .map((h) =>
          h.coinId === coin.id
            ? { ...h, quantity: h.quantity - quantity, cost: h.cost * (1 - quantity / h.quantity) }
            : h,
        )
        .filter((h) => h.quantity > 1e-10);
      return {
        cash: a.cash + usd,
        holdings,
        transactions: [
          tx({ type: "sell", usd, coinId: coin.id, symbol: coin.symbol, quantity, price: coin.price }),
          ...a.transactions,
        ],
      };
    });
    return { ok: true };
  };

  const reset = () => setAccount(initial);

  return { account, deposit, withdraw, buy, sell, reset };
}
