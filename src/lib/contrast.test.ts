import { describe, expect, it } from "vitest";
import { razaoDeContraste } from "./contrast";

describe("razaoDeContraste", () => {
  it("preto sobre branco e 21:1", () => {
    expect(razaoDeContraste("#000000", "#ffffff")).toBeCloseTo(21, 1);
  });

  it("e simetrica", () => {
    expect(razaoDeContraste("#1f2f24", "#f9faf5")).toBeCloseTo(
      razaoDeContraste("#f9faf5", "#1f2f24"),
      5,
    );
  });
});
