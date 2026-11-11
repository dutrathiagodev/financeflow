import { describe, expect, it } from "vitest";
import { estimateOrder } from "./estimate";

describe("estimateOrder", () => {
  it("compra: dólares viram quantidade", () => {
    expect(estimateOrder("buy", 1_000, 50_000)).toBe(0.02);
  });
  it("venda: quantidade vira dólares", () => {
    expect(estimateOrder("sell", 0.02, 50_000)).toBe(1_000);
  });
  it("retorna zero para entradas inválidas", () => {
    expect(estimateOrder("buy", 0, 10)).toBe(0);
    expect(estimateOrder("buy", 10, 0)).toBe(0);
    expect(estimateOrder("sell", NaN, 10)).toBe(0);
  });
});
