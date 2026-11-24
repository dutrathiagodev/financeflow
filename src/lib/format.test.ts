import { describe, expect, it } from "vitest";
import { formatarComSinal, formatarReais } from "./format";

const nbsp = " ";

describe("formatarReais", () => {
  it("usa virgula, ponto de milhar e R$", () => {
    expect(formatarReais(566.8)).toBe(`R$${nbsp}566,80`);
    expect(formatarReais(1234.5)).toBe(`R$${nbsp}1.234,50`);
    expect(formatarReais(0)).toBe(`R$${nbsp}0,00`);
  });

  it("negativo mostra o sinal", () => {
    expect(formatarReais(-10)).toContain("-");
  });
});

describe("formatarComSinal", () => {
  it("receita com + e despesa com menos tipografico", () => {
    expect(formatarComSinal(450, "receita")).toBe(`+ R$${nbsp}450,00`);
    expect(formatarComSinal(311.7, "despesa")).toBe(`− R$${nbsp}311,70`);
  });

  it("ignora o sinal do numero recebido", () => {
    expect(formatarComSinal(-5, "despesa")).toBe(`− R$${nbsp}5,00`);
  });
});
