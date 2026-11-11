import { isPositiveNumber, roundQuantity, roundUsd } from "@/domain/money";
import { err, ok, type Result } from "@/domain/result";
import type { Account, AccountError, AssetQuote, Holding, OperationMeta, Transaction } from "./types";

export const INITIAL_CASH = 10_000;

/** Conta nova com o saldo informado (ou o padrão, se o valor for inválido). */
export function createAccount(initialCash: number = INITIAL_CASH): Account {
  const cash = isPositiveNumber(initialCash) ? roundUsd(initialCash) : INITIAL_CASH;
  return { cash, holdings: [], transactions: [] };
}

type OperationResult = Result<Account, AccountError>;

function record(account: Account, transaction: Transaction): Account["transactions"] {
  return [transaction, ...account.transactions];
}

export function deposit(account: Account, usd: number, meta: OperationMeta): OperationResult {
  const amount = roundUsd(usd);
  if (!isPositiveNumber(amount)) return err("invalid-amount");

  return ok({
    ...account,
    cash: roundUsd(account.cash + amount),
    transactions: record(account, { ...meta, type: "deposit", usd: amount }),
  });
}

export function withdraw(account: Account, usd: number, meta: OperationMeta): OperationResult {
  const amount = roundUsd(usd);
  if (!isPositiveNumber(amount)) return err("invalid-amount");
  if (amount > account.cash) return err("insufficient-funds");

  return ok({
    ...account,
    cash: roundUsd(account.cash - amount),
    transactions: record(account, { ...meta, type: "withdraw", usd: amount }),
  });
}

function addToHolding(holdings: Holding[], quote: AssetQuote, quantity: number, cost: number): Holding[] {
  const existing = holdings.find((h) => h.assetId === quote.id);
  if (!existing) {
    return [
      ...holdings,
      { assetId: quote.id, symbol: quote.symbol, name: quote.name, image: quote.image, quantity, cost },
    ];
  }
  return holdings.map((h) =>
    h.assetId === quote.id
      ? { ...h, quantity: roundQuantity(h.quantity + quantity), cost: roundUsd(h.cost + cost) }
      : h,
  );
}

/** Compra `usd` dólares do ativo ao preço da cotação. */
export function buy(account: Account, quote: AssetQuote, usd: number, meta: OperationMeta): OperationResult {
  if (!isPositiveNumber(quote.price)) return err("invalid-price");
  const amount = roundUsd(usd);
  if (!isPositiveNumber(amount)) return err("invalid-amount");
  if (amount > account.cash) return err("insufficient-funds");

  const quantity = roundQuantity(amount / quote.price);
  if (!isPositiveNumber(quantity)) return err("invalid-amount");

  return ok({
    cash: roundUsd(account.cash - amount),
    holdings: addToHolding(account.holdings, quote, quantity, amount),
    transactions: record(account, {
      ...meta,
      type: "buy",
      usd: amount,
      assetId: quote.id,
      symbol: quote.symbol,
      quantity,
      price: quote.price,
    }),
  });
}

function reduceHolding(holdings: Holding[], assetId: string, quantity: number): Holding[] {
  return holdings.flatMap((h) => {
    if (h.assetId !== assetId) return [h];
    const remaining = roundQuantity(h.quantity - quantity);
    if (remaining <= 0) return [];
    const remainingCost = roundUsd(h.cost * (remaining / h.quantity));
    return [{ ...h, quantity: remaining, cost: remainingCost }];
  });
}

/** Vende `quantity` unidades do ativo ao preço da cotação. */
export function sell(account: Account, quote: AssetQuote, quantity: number, meta: OperationMeta): OperationResult {
  if (!isPositiveNumber(quote.price)) return err("invalid-price");
  const amount = roundQuantity(quantity);
  if (!isPositiveNumber(amount)) return err("invalid-amount");

  const holding = account.holdings.find((h) => h.assetId === quote.id);
  if (!holding || amount > holding.quantity) return err("insufficient-holding");

  const proceeds = roundUsd(amount * quote.price);

  return ok({
    cash: roundUsd(account.cash + proceeds),
    holdings: reduceHolding(account.holdings, quote.id, amount),
    transactions: record(account, {
      ...meta,
      type: "sell",
      usd: proceeds,
      assetId: quote.id,
      symbol: quote.symbol,
      quantity: amount,
      price: quote.price,
    }),
  });
}
