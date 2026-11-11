import { describe, expect, it } from "vitest";
import { toMarketCoin, toPricePoints } from "./mapper";

describe("toMarketCoin", () => {
  it("converte campos e coloca o símbolo em maiúsculas", () => {
    const coin = toMarketCoin({
      id: "bitcoin", symbol: "btc", name: "Bitcoin", image: "i.png", market_cap_rank: 1, current_price: 100,
      price_change_percentage_24h_in_currency: -2, price_change_percentage_7d_in_currency: 5, market_cap: 10,
      total_volume: 3, high_24h: 110, low_24h: 90, sparkline_in_7d: { price: [1, 2] },
    });
    expect(coin).toMatchObject({ symbol: "BTC", rank: 1, price: 100, change24h: -2, change7d: 5, sparkline: [1, 2] });
  });

  it("usa zero e lista vazia quando a API manda null ou omite", () => {
    const coin = toMarketCoin({
      id: "x", symbol: "x", name: "X", image: "", market_cap_rank: null, current_price: null,
      market_cap: null, total_volume: null, high_24h: null, low_24h: null,
    });
    expect(coin).toMatchObject({ rank: 0, price: 0, change24h: 0, change7d: 0, marketCap: 0, sparkline: [] });
  });
});

describe("toPricePoints", () => {
  it("converte pares [tempo, preço]", () => {
    expect(toPricePoints({ prices: [[1, 10], [2, 20]] })).toEqual([
      { time: 1, price: 10 },
      { time: 2, price: 20 },
    ]);
  });
});
