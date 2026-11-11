import type { MarketCoin, PricePoint } from "@/domain/market/types";

/** Porta de saída: de onde vêm as cotações. Implementada na camada de infraestrutura. */
export interface MarketRepository {
  listTopCoins(): Promise<MarketCoin[]>;
  getHistory(assetId: string, days: number): Promise<PricePoint[]>;
}

/** Falha esperada ao buscar cotações (rede, timeout, resposta de erro). Qualquer outro erro é bug e deve propagar. */
export class MarketUnavailableError extends Error {
  constructor(message = "Cotações indisponíveis") {
    super(message);
    this.name = "MarketUnavailableError";
  }
}
