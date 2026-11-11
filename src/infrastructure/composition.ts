import { loadHistory, loadTopCoins } from "@/application/market/use-cases";
import { coinGeckoMarketRepository } from "@/infrastructure/coingecko/market-repository";

/**
 * Raiz de composição: liga os casos de uso ao adaptador concreto.
 * É o único ponto (junto das rotas) que conhece a CoinGecko.
 */
export const getTopCoins = () => loadTopCoins(coinGeckoMarketRepository);
export const getHistory = (assetId: string, days: number) => loadHistory(coinGeckoMarketRepository, assetId, days);
