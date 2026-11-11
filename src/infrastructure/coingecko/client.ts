const BASE_URL = "https://api.coingecko.com/api/v3";
const TIMEOUT_MS = 8_000;

export class CoinGeckoError extends Error {
  constructor(public readonly status: number) {
    super(`CoinGecko respondeu com status ${status}`);
    this.name = "CoinGeckoError";
  }
}

export async function fetchCoinGecko<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new CoinGeckoError(response.status);
  return (await response.json()) as T;
}
