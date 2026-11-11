import { describe, expect, it } from "vitest";
import { filterByTrend, rankCoins, searchCoins, sortCoins } from "./coin-queries";
import type { MarketCoin } from "./types";

function coin(id: string, overrides: Partial<MarketCoin> = {}): MarketCoin {
  return {
    id, symbol: id.toUpperCase(), name: id[0].toUpperCase() + id.slice(1), image: "", rank: 1, price: 1,
    change24h: 0, change7d: 0, marketCap: 1, volume24h: 1, high24h: 1, low24h: 1, sparkline: [],
    ...overrides,
  };
}

const coins = [
  coin("bitcoin", { rank: 1, price: 70_000, change24h: -1, volume24h: 50 }),
  coin("ethereum", { rank: 2, price: 3_000, change24h: 4, volume24h: 30 }),
  coin("solana", { rank: 5, price: 150, change24h: 9, volume24h: 90 }),
  coin("tether", { rank: 3, price: 1, change24h: 0, volume24h: 100 }),
];
const ids = (list: MarketCoin[]) => list.map((c) => c.id);

describe("filterByTrend", () => {
  it("separa altas e quedas, ignorando as estáveis", () => {
    expect(ids(filterByTrend(coins, "gainers"))).toEqual(["ethereum", "solana"]);
    expect(ids(filterByTrend(coins, "losers"))).toEqual(["bitcoin"]);
    expect(filterByTrend(coins, "all")).toBe(coins);
  });
});

describe("sortCoins", () => {
  it("ordena por ranking e preço nas duas direções sem mutar a entrada", () => {
    const original = ids(coins);
    expect(ids(sortCoins(coins, "rank", false))).toEqual(["bitcoin", "ethereum", "tether", "solana"]);
    expect(ids(sortCoins(coins, "price", true))).toEqual(["bitcoin", "ethereum", "solana", "tether"]);
    expect(ids(coins)).toEqual(original);
  });
});

describe("searchCoins", () => {
  it("busca por nome ou símbolo sem diferenciar caixa", () => {
    expect(ids(searchCoins(coins, "SOL"))).toEqual(["solana"]);
    expect(ids(searchCoins(coins, "  eth "))).toEqual(["ethereum", "tether"]);
  });
  it("consulta vazia devolve tudo e sem acerto devolve vazio", () => {
    expect(searchCoins(coins, "  ")).toBe(coins);
    expect(searchCoins(coins, "zzz")).toEqual([]);
  });
});

describe("rankCoins", () => {
  it("rankeia por altas, quedas e volume", () => {
    expect(ids(rankCoins(coins, "gainers"))[0]).toBe("solana");
    expect(ids(rankCoins(coins, "losers"))[0]).toBe("bitcoin");
    expect(ids(rankCoins(coins, "volume"))[0]).toBe("tether");
  });
});
