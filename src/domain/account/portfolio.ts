import { roundUsd } from "@/domain/money";
import type { Account, Holding } from "./types";

export type PriceLookup = (assetId: string) => number | undefined;

export type Position = Holding & {
  price: number;
  /** false quando não há cotação e o preço usado é o preço médio. */
  priceKnown: boolean;
  averagePrice: number;
  value: number;
  pnl: number;
  pnlPercent: number;
};

export type PortfolioSummary = {
  totalValue: number;
  totalCost: number;
  pnl: number;
  pnlPercent: number;
};

function percentOf(part: number, whole: number) {
  return whole === 0 ? 0 : (part / whole) * 100;
}

export function valuePositions(holdings: Holding[], priceOf: PriceLookup): Position[] {
  return holdings.map((holding) => {
    const averagePrice = holding.cost / holding.quantity;
    const quoted = priceOf(holding.assetId);
    const priceKnown = quoted !== undefined && quoted > 0;
    const price = priceKnown ? quoted : averagePrice;
    const value = roundUsd(holding.quantity * price);
    const pnl = roundUsd(value - holding.cost);

    return {
      ...holding,
      price,
      priceKnown,
      averagePrice,
      value,
      pnl,
      pnlPercent: percentOf(pnl, holding.cost),
    };
  });
}

export function summarize(positions: Position[]): PortfolioSummary {
  const totalValue = roundUsd(positions.reduce((sum, p) => sum + p.value, 0));
  const totalCost = roundUsd(positions.reduce((sum, p) => sum + p.cost, 0));
  const pnl = roundUsd(totalValue - totalCost);
  return { totalValue, totalCost, pnl, pnlPercent: percentOf(pnl, totalCost) };
}

/** Participação de cada posição no total, em porcentagem. */
export function allocation(positions: Position[]): { assetId: string; symbol: string; percent: number }[] {
  const total = positions.reduce((sum, p) => sum + p.value, 0);
  return positions.map((p) => ({ assetId: p.assetId, symbol: p.symbol, percent: percentOf(p.value, total) }));
}

/** Saldo em caixa mais o valor das posições. */
export function totalEquity(account: Account, priceOf: PriceLookup): number {
  const { totalValue } = summarize(valuePositions(account.holdings, priceOf));
  return roundUsd(account.cash + totalValue);
}
