export const HISTORY_RANGES_IN_DAYS = [1, 7, 30, 90, 365] as const;

export type HistoryRange = (typeof HISTORY_RANGES_IN_DAYS)[number];

export function isValidHistoryRange(days: number): days is HistoryRange {
  return (HISTORY_RANGES_IN_DAYS as readonly number[]).includes(days);
}

/** Ids da CoinGecko: minúsculas, números e hífen. */
export function isValidAssetId(id: string): boolean {
  return /^[a-z0-9-]{1,64}$/.test(id);
}
