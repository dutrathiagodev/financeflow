import type { MarketCoin, PricePoint } from "@/domain/market/types";
import type { RawMarketChart, RawMarketCoin } from "./api-types";

export function toMarketCoin(raw: RawMarketCoin): MarketCoin {
  return {
    id: raw.id,
    symbol: raw.symbol.toUpperCase(),
    name: raw.name,
    image: raw.image,
    rank: raw.market_cap_rank ?? 0,
    price: raw.current_price ?? 0,
    change24h: raw.price_change_percentage_24h_in_currency ?? 0,
    change7d: raw.price_change_percentage_7d_in_currency ?? 0,
    marketCap: raw.market_cap ?? 0,
    volume24h: raw.total_volume ?? 0,
    high24h: raw.high_24h ?? 0,
    low24h: raw.low_24h ?? 0,
    sparkline: raw.sparkline_in_7d?.price ?? [],
  };
}

export function toPricePoints(raw: RawMarketChart): PricePoint[] {
  return raw.prices.map(([time, price]) => ({ time, price }));
}
