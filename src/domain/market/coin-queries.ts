import type { MarketCoin } from "./types";

export type TrendFilter = "all" | "gainers" | "losers";
export type SortKey = "rank" | "price";
export type TrendRanking = "gainers" | "losers" | "volume";

export function filterByTrend(coins: MarketCoin[], filter: TrendFilter): MarketCoin[] {
  switch (filter) {
    case "gainers":
      return coins.filter((c) => c.change24h > 0);
    case "losers":
      return coins.filter((c) => c.change24h < 0);
    default:
      return coins;
  }
}

/** Ordena sem alterar a lista original. */
export function sortCoins(coins: MarketCoin[], key: SortKey, descending: boolean): MarketCoin[] {
  const direction = descending ? -1 : 1;
  return [...coins].sort((a, b) => direction * (a[key] - b[key]));
}

/** Busca por nome ou símbolo, sem diferenciar maiúsculas. Consulta vazia devolve tudo. */
export function searchCoins(coins: MarketCoin[], query: string): MarketCoin[] {
  const term = query.trim().toLowerCase();
  if (!term) return coins;
  return coins.filter((c) => c.name.toLowerCase().includes(term) || c.symbol.toLowerCase().includes(term));
}

const rankings: Record<TrendRanking, (a: MarketCoin, b: MarketCoin) => number> = {
  gainers: (a, b) => b.change24h - a.change24h,
  losers: (a, b) => a.change24h - b.change24h,
  volume: (a, b) => b.volume24h - a.volume24h,
};

export function rankCoins(coins: MarketCoin[], ranking: TrendRanking): MarketCoin[] {
  return [...coins].sort(rankings[ranking]);
}

export function findCoin(coins: MarketCoin[], id: string): MarketCoin | undefined {
  return coins.find((c) => c.id === id);
}
