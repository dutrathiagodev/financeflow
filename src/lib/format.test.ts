import { describe, expect, it } from "vitest";
import { formatarComSinal, formatarData, formatarMes, formatarReais } from "./format";

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

describe("formatarData", () => {
  it("troca AAAA-MM-DD por DD/MM/AAAA sem passar por Date", () => {
    expect(formatarData("2026-11-27")).toBe("27/11/2026");
    expect(formatarData("2026-01-05")).toBe("05/01/2026");
  });
});

describe("formatarMes", () => {
  it("escreve o mes por extenso com a primeira letra maiuscula", () => {
    expect(formatarMes("2026-11")).toBe("Novembro de 2026");
    expect(formatarMes("2026-03")).toBe("Março de 2026");
  });

  it("janeiro e dezembro nao escorregam de mes ou de ano", () => {
    expect(formatarMes("2026-01")).toBe("Janeiro de 2026");
    expect(formatarMes("2026-12")).toBe("Dezembro de 2026");
  });
});
