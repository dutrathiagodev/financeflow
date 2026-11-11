import type { MarketRepository } from "@/application/ports/market-repository";
import { fetchHistory, fetchTopCoins } from "./cached-queries";

export const coinGeckoMarketRepository: MarketRepository = {
  listTopCoins: fetchTopCoins,
  getHistory: fetchHistory,
};
