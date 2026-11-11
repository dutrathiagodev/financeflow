import { describe, expect, it } from "vitest";
import { downsample, priceStats } from "./chart";

describe("downsample", () => {
  it("mantém a lista quando já cabe", () => {
    const items = [1, 2, 3];
    expect(downsample(items, 5)).toBe(items);
  });

  it("reduz mantendo primeiro e último e a ordem", () => {
    const items = Array.from({ length: 100 }, (_, i) => i);
    const result = downsample(items, 10);
    expect(result).toHaveLength(10);
    expect(result[0]).toBe(0);
    expect(result[9]).toBe(99);
    expect([...result].sort((a, b) => a - b)).toEqual(result);
  });

  it("ignora limites inválidos", () => {
    expect(downsample([1, 2, 3], 1)).toEqual([1, 2, 3]);
  });
});

describe("priceStats", () => {
  it("calcula início, fim, máxima, mínima e variação", () => {
    expect(priceStats([100, 120, 80, 110])).toEqual({ start: 100, end: 110, high: 120, low: 80, changePercent: 10 });
  });
  it("retorna null para vazio e evita divisão por zero", () => {
    expect(priceStats([])).toBeNull();
    expect(priceStats([0, 5])?.changePercent).toBe(0);
  });
});
