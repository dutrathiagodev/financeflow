import { describe, expect, it } from "vitest";
import { isValidAssetId, isValidHistoryRange } from "./history";

describe("isValidHistoryRange", () => {
  it("aceita só os períodos suportados", () => {
    for (const days of [1, 7, 30, 90, 365]) expect(isValidHistoryRange(days)).toBe(true);
    for (const days of [0, 2, 31, -7, NaN]) expect(isValidHistoryRange(days)).toBe(false);
  });
});

describe("isValidAssetId", () => {
  it("aceita ids da CoinGecko e rejeita o resto", () => {
    expect(isValidAssetId("bitcoin")).toBe(true);
    expect(isValidAssetId("usd-coin")).toBe(true);
    for (const id of ["", "Bitcoin", "a/b", "a b", "../x", "x".repeat(65)]) expect(isValidAssetId(id)).toBe(false);
  });
});
