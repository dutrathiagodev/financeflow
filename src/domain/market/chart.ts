/** Reduz a lista a no máximo `maxPoints` itens igualmente espaçados, mantendo o primeiro e o último. */
export function downsample<T>(items: T[], maxPoints: number): T[] {
  if (maxPoints < 2 || items.length <= maxPoints) return items;
  const last = items.length - 1;
  return Array.from({ length: maxPoints }, (_, i) => items[Math.round((i * last) / (maxPoints - 1))]);
}

export type PriceStats = {
  start: number;
  end: number;
  high: number;
  low: number;
  changePercent: number;
};

/** Retorna null para série vazia. */
export function priceStats(prices: number[]): PriceStats | null {
  if (prices.length === 0) return null;
  const start = prices[0];
  const end = prices[prices.length - 1];
  return {
    start,
    end,
    high: Math.max(...prices),
    low: Math.min(...prices),
    changePercent: start === 0 ? 0 : ((end - start) / start) * 100,
  };
}
