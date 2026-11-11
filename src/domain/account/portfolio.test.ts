import { describe, expect, it } from "vitest";
import { allocation, summarize, totalEquity, valuePositions } from "./portfolio";
import type { Account, Holding } from "./types";

const btc: Holding = { assetId: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "", quantity: 0.02, cost: 1_000 };
const eth: Holding = { assetId: "ethereum", symbol: "ETH", name: "Ethereum", image: "", quantity: 1, cost: 2_000 };
const prices: Record<string, number> = { bitcoin: 60_000, ethereum: 1_500 };
const priceOf = (id: string) => prices[id];

describe("valuePositions", () => {
  it("calcula valor, preço médio e resultado", () => {
    const [position] = valuePositions([btc], priceOf);
    expect(position).toMatchObject({
      price: 60_000,
      priceKnown: true,
      averagePrice: 50_000,
      value: 1_200,
      pnl: 200,
    });
    expect(position.pnlPercent).toBeCloseTo(20);
  });

  it("usa o preço médio quando não há cotação", () => {
    const [position] = valuePositions([btc], () => undefined);
    expect(position).toMatchObject({ priceKnown: false, price: 50_000, value: 1_000, pnl: 0 });
  });
});

describe("summarize / allocation / totalEquity", () => {
  const positions = valuePositions([btc, eth], priceOf);

  it("soma valor, custo e resultado", () => {
    const summary = summarize(positions);
    expect(summary).toMatchObject({ totalValue: 2_700, totalCost: 3_000, pnl: -300 });
    expect(summary.pnlPercent).toBeCloseTo(-10);
  });

  it("calcula a alocação em porcentagem", () => {
    const result = allocation(positions);
    expect(result.map((r) => r.symbol)).toEqual(["BTC", "ETH"]);
    expect(result[0].percent).toBeCloseTo((1_200 / 2_700) * 100);
    expect(result.reduce((s, r) => s + r.percent, 0)).toBeCloseTo(100);
  });

  it("não divide por zero sem posições", () => {
    expect(summarize([])).toEqual({ totalValue: 0, totalCost: 0, pnl: 0, pnlPercent: 0 });
    expect(allocation([])).toEqual([]);
  });

  it("patrimônio é caixa mais posições", () => {
    const account: Account = { cash: 500, holdings: [btc, eth], transactions: [] };
    expect(totalEquity(account, priceOf)).toBe(3_200);
  });
});
