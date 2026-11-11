import { cacheLife } from "next/cache";
import type { MarketCoin, PricePoint } from "@/types/market";

const API = "https://api.coingecko.com/api/v3";

type RawCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap_rank: number | null;
  current_price: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  market_cap: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  sparkline_in_7d?: { price: number[] };
};

function toCoin(raw: RawCoin): MarketCoin {
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

/** Top moedas por valor de mercado, em USD. Retorna [] se a API falhar. */
export async function getMarkets(): Promise<MarketCoin[]> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });

  try {
    const res = await fetch(
      `${API}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h,7d`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as RawCoin[];
    return data.map(toCoin);
  } catch {
    return [];
  }
}

/** Histórico de preço de uma moeda. Retorna [] se a API falhar. */
export async function getCoinHistory(id: string, days: number): Promise<PricePoint[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 1800 });

  try {
    const res = await fetch(
      `${API}/coins/${encodeURIComponent(id)}/market_chart?vs_currency=usd&days=${days}`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { prices: [number, number][] };
    return data.prices.map(([time, price]) => ({ time, price }));
  } catch {
    return [];
  }
}
