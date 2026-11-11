import { cacheLife } from "next/cache";
import type { MarketCoin, PricePoint } from "@/domain/market/types";
import type { RawMarketChart, RawMarketCoin } from "./api-types";
import { fetchCoinGecko } from "./client";
import { toMarketCoin, toPricePoints } from "./mapper";

const TOP_COINS_QUERY =
  "/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=24h,7d";

/** Falhas lançam erro: o Next não guarda resultados que falharam em cache. */
export async function fetchTopCoins(): Promise<MarketCoin[]> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 600 });

  const raw = await fetchCoinGecko<RawMarketCoin[]>(TOP_COINS_QUERY);
  return raw.map(toMarketCoin);
}

export async function fetchHistory(assetId: string, days: number): Promise<PricePoint[]> {
  "use cache";
  cacheLife({ stale: 60, revalidate: 300, expire: 1800 });

  const raw = await fetchCoinGecko<RawMarketChart>(
    `/coins/${encodeURIComponent(assetId)}/market_chart?vs_currency=usd&days=${days}`,
  );
  return toPricePoints(raw);
}
