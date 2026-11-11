import { describe, expect, it } from "vitest";
import { formatPercent, formatQuantity } from "./format";

describe("formatPercent", () => {
  it("mostra sinal e vírgula decimal", () => {
    expect(formatPercent(1.096)).toBe("+ 1,10%");
    expect(formatPercent(-2.014)).toBe("- 2,01%");
    expect(formatPercent(0)).toBe("+ 0,00%");
  });
});

describe("formatQuantity", () => {
  it("limita a 8 casas decimais", () => {
    expect(formatQuantity(0.123456789)).toBe("0,12345679");
  });
});
