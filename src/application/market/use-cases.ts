import type { MarketRepository } from "@/application/ports/market-repository";
import { isValidAssetId, isValidHistoryRange } from "@/domain/market/history";
import type { MarketCoin, PricePoint } from "@/domain/market/types";
import { err, ok, type Result } from "@/domain/result";

export type MarketError = "market-unavailable" | "invalid-request";

export async function loadTopCoins(repository: MarketRepository): Promise<Result<MarketCoin[], MarketError>> {
  try {
    const coins = await repository.listTopCoins();
    return coins.length > 0 ? ok(coins) : err("market-unavailable");
  } catch {
    return err("market-unavailable");
  }
}

export async function loadHistory(
  repository: MarketRepository,
  assetId: string,
  days: number,
): Promise<Result<PricePoint[], MarketError>> {
  if (!isValidAssetId(assetId) || !isValidHistoryRange(days)) return err("invalid-request");
  try {
    const points = await repository.getHistory(assetId, days);
    return points.length > 0 ? ok(points) : err("market-unavailable");
  } catch {
    return err("market-unavailable");
  }
}
