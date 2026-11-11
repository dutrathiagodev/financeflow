import { describe, expect, it } from "vitest";
import { computeInsights, sentimentFor } from "./insights";
import type { MarketCoin } from "./types";

function coin(id: string, overrides: Partial<MarketCoin>): MarketCoin {
  return {
    id, symbol: id, name: id, image: "", rank: 1, price: 1, change24h: 0, change7d: 0,
    marketCap: 0, volume24h: 0, high24h: 1, low24h: 1, sparkline: [], ...overrides,
  };
}

describe("computeInsights", () => {
  it("retorna null sem moedas", () => {
    expect(computeInsights([])).toBeNull();
  });

  it("encontra destaques, contagem de altas e dominância do bitcoin", () => {
    const insights = computeInsights([
      coin("bitcoin", { change24h: 2, change7d: 1, marketCap: 600, volume24h: 10 }),
      coin("ethereum", { change24h: -5, change7d: 8, marketCap: 300, volume24h: 99 }),
      coin("solana", { change24h: 7, change7d: -3, marketCap: 100, volume24h: 5 }),
    ]);
    expect(insights).toMatchObject({
      risingCount: 2,
      totalCount: 3,
      bitcoinDominance: 60,
      sentiment: "positive",
    });
    expect(insights?.topGainer.id).toBe("solana");
    expect(insights?.topLoser.id).toBe("ethereum");
    expect(insights?.topVolume.id).toBe("ethereum");
    expect(insights?.weekLeader.id).toBe("ethereum");
    expect(insights?.risingShare).toBeCloseTo(66.67, 1);
  });

  it("dominância é zero sem bitcoin ou sem valor de mercado", () => {
    expect(computeInsights([coin("solana", { marketCap: 10 })])?.bitcoinDominance).toBe(0);
    expect(computeInsights([coin("bitcoin", { marketCap: 0 })])?.bitcoinDominance).toBe(0);
  });
});

describe("sentimentFor", () => {
  it("classifica pelos limites de 60% e 40%", () => {
    expect(sentimentFor(60)).toBe("positive");
    expect(sentimentFor(59.9)).toBe("neutral");
    expect(sentimentFor(40)).toBe("negative");
    expect(sentimentFor(40.1)).toBe("neutral");
  });
});
