import type { MarketCoin } from "./types";

export type Sentiment = "positive" | "negative" | "neutral";

export type MarketInsights = {
  topGainer: MarketCoin;
  topLoser: MarketCoin;
  topVolume: MarketCoin;
  weekLeader: MarketCoin;
  risingCount: number;
  totalCount: number;
  /** Porcentagem de moedas em alta nas últimas 24h. */
  risingShare: number;
  /** Participação do Bitcoin no valor de mercado do conjunto, em %. */
  bitcoinDominance: number;
  sentiment: Sentiment;
};

const POSITIVE_THRESHOLD = 60;
const NEGATIVE_THRESHOLD = 40;

function maxBy(coins: MarketCoin[], pick: (c: MarketCoin) => number): MarketCoin {
  return coins.reduce((best, c) => (pick(c) > pick(best) ? c : best));
}

export function sentimentFor(risingShare: number): Sentiment {
  if (risingShare >= POSITIVE_THRESHOLD) return "positive";
  if (risingShare <= NEGATIVE_THRESHOLD) return "negative";
  return "neutral";
}

/** Retorna null quando não há moedas para analisar. */
export function computeInsights(coins: MarketCoin[]): MarketInsights | null {
  if (coins.length === 0) return null;

  const risingCount = coins.filter((c) => c.change24h > 0).length;
  const risingShare = (risingCount / coins.length) * 100;
  const totalCap = coins.reduce((sum, c) => sum + c.marketCap, 0);
  const bitcoin = coins.find((c) => c.id === "bitcoin");

  return {
    topGainer: maxBy(coins, (c) => c.change24h),
    topLoser: maxBy(coins, (c) => -c.change24h),
    topVolume: maxBy(coins, (c) => c.volume24h),
    weekLeader: maxBy(coins, (c) => c.change7d),
    risingCount,
    totalCount: coins.length,
    risingShare,
    bitcoinDominance: bitcoin && totalCap > 0 ? (bitcoin.marketCap / totalCap) * 100 : 0,
    sentiment: sentimentFor(risingShare),
  };
}
