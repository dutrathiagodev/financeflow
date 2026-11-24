import { describe, expect, it } from "vitest";
import { arredondar, lerValor, somar } from "./money";

describe("arredondar", () => {
  it("arredonda a centavos", () => {
    expect(arredondar(1.005)).toBe(1.01);
    expect(arredondar(10.234)).toBe(10.23);
    expect(arredondar(0)).toBe(0);
  });
});

describe("somar", () => {
  it("nao acumula erro de ponto flutuante", () => {
    expect(0.1 + 0.2).not.toBe(0.3);
    expect(somar(0.1, 0.2)).toBe(0.3);
  });

  it("lista vazia soma zero", () => {
    expect(somar()).toBe(0);
  });
});

describe("lerValor", () => {
  it.each([
    ["12,50", 12.5],
    ["1.234,56", 1234.56],
    ["R$ 10", 10],
    ["12.5", 12.5],
    ["0", 0],
    ["-3,2", -3.2],
  ])("le %s como %f", (texto, esperado) => {
    expect(lerValor(texto)).toBe(esperado);
  });

  it.each(["", "   ", "abc", "1,2,3", "12,5x", "--1"])("rejeita %j", (texto) => {
    expect(lerValor(texto)).toBeNull();
  });
});
