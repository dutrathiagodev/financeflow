import { isPositiveNumber } from "@/domain/money";
import { createAccount } from "./operations";
import type { Account, Holding, Transaction, TransactionType } from "./types";

const TYPES: TransactionType[] = ["buy", "sell", "deposit", "withdraw"];

type Raw = Record<string, unknown>;

function isRecord(value: unknown): value is Raw {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isString(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function parseHolding(value: unknown): Holding | null {
  if (!isRecord(value)) return null;
  const { assetId, symbol, name, image, quantity, cost } = value;
  if (!isString(assetId) || !isString(symbol) || !isString(name) || typeof image !== "string") return null;
  if (!isPositiveNumber(quantity) || typeof cost !== "number" || !Number.isFinite(cost) || cost < 0) return null;
  return { assetId, symbol, name, image, quantity, cost };
}

function parseTransaction(value: unknown): Transaction | null {
  if (!isRecord(value)) return null;
  const { id, type, time, usd, assetId, symbol, quantity, price } = value;
  if (!isString(id) || !TYPES.includes(type as TransactionType)) return null;
  if (typeof time !== "number" || !Number.isFinite(time) || !isPositiveNumber(usd)) return null;
  return {
    id,
    type: type as TransactionType,
    time,
    usd,
    assetId: isString(assetId) ? assetId : undefined,
    symbol: isString(symbol) ? symbol : undefined,
    quantity: isPositiveNumber(quantity) ? quantity : undefined,
    price: isPositiveNumber(price) ? price : undefined,
  };
}

function parseList<T>(value: unknown, parseItem: (item: unknown) => T | null): T[] {
  if (!Array.isArray(value)) return [];
  return value.map(parseItem).filter((item): item is T => item !== null);
}

/** Valida um valor desconhecido (ex.: vindo do storage). Retorna a conta inicial se inválido. */
export function parseAccount(raw: unknown): Account {
  if (!isRecord(raw) || typeof raw.cash !== "number" || !Number.isFinite(raw.cash) || raw.cash < 0) {
    return createAccount();
  }
  return {
    cash: raw.cash,
    holdings: parseList(raw.holdings, parseHolding),
    transactions: parseList(raw.transactions, parseTransaction),
  };
}
