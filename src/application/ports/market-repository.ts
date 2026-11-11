import type { MarketCoin, PricePoint } from "@/domain/market/types";

/** Porta de saída: de onde vêm as cotações. Implementada na camada de infraestrutura. */
export interface MarketRepository {
  listTopCoins(): Promise<MarketCoin[]>;
  getHistory(assetId: string, days: number): Promise<PricePoint[]>;
}
