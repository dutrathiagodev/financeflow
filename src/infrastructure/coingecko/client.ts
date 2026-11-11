import { MarketUnavailableError } from "@/application/ports/market-repository";

const BASE_URL = "https://api.coingecko.com/api/v3";
const TIMEOUT_MS = 8_000;

export class CoinGeckoError extends Error {
  constructor(public readonly status: number) {
    super(`CoinGecko respondeu com status ${status}`);
    this.name = "CoinGeckoError";
  }
}

function isNetworkFailure(error: unknown) {
  return error instanceof TypeError || (error instanceof Error && error.name === "TimeoutError");
}

/** Traduz falhas de rede/HTTP em `MarketUnavailableError`; outros erros seguem sem tratamento. */
export async function fetchCoinGecko<T>(path: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${path}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (!response.ok) throw new CoinGeckoError(response.status);
    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof CoinGeckoError || isNetworkFailure(error)) {
      throw new MarketUnavailableError(error instanceof Error ? error.message : undefined);
    }
    throw error;
  }
}
