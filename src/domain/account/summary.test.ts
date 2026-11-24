import { describe, expect, it } from "vitest";
import { contaNosTotais, percentualGasto, resumir } from "./summary";
import type { Movimentacao } from "./types";

const HOJE = "2026-11-24";

const mov = (
  tipo: Movimentacao["tipo"],
  valor: number,
  extra: Partial<Movimentacao> = {},
): Movimentacao => ({
  id: `${tipo}-${valor}-${extra.data ?? ""}`,
  descricao: "x",
  valor,
  tipo,
  categoria: "Outros",
  data: "2026-11-01",
  ...extra,
});

describe("resumir (RF02 / RN01)", () => {
  it("lista vazia zera tudo", () => {
    expect(resumir([], HOJE)).toEqual({ receitas: 0, despesas: 0, saldo: 0 });
  });

  it("so receitas: saldo igual as receitas", () => {
    expect(resumir([mov("receita", 450), mov("receita", 900)], HOJE)).toEqual({
      receitas: 1350,
      despesas: 0,
      saldo: 1350,
    });
  });

  it("so despesas: saldo negativo", () => {
    expect(resumir([mov("despesa", 100), mov("despesa", 50.5)], HOJE)).toEqual({
      receitas: 0,
      despesas: 150.5,
      saldo: -150.5,
    });
  });

  it("saldo = receitas - despesas com centavos exatos", () => {
    const r = resumir([mov("receita", 0.3), mov("despesa", 0.1), mov("despesa", 0.1)], HOJE);
    expect(r).toEqual({ receitas: 0.3, despesas: 0.2, saldo: 0.1 });
  });

  it("confere os numeros do exemplo do PRD", () => {
    const r = resumir([mov("receita", 450), mov("receita", 900), mov("despesa", 783.2)], HOJE);
    expect(r).toEqual({ receitas: 1350, despesas: 783.2, saldo: 566.8 });
  });

  it("saldo sempre bate com receitas - despesas", () => {
    const lista = [mov("receita", 10.07), mov("despesa", 3.03), mov("despesa", 4.04), mov("receita", 0.01)];
    const r = resumir(lista, HOJE);
    expect(r.saldo).toBe(Math.round((r.receitas - r.despesas) * 100) / 100);
  });
});

describe("RN12: parcelas futuras", () => {
  const parcela = { atual: 2, total: 3 };

  it("parcela com data futura nao entra nos totais", () => {
    const lista = [mov("despesa", 100, { data: "2026-12-10", parcela })];
    expect(resumir(lista, HOJE).despesas).toBe(0);
  });

  it("entra quando a data chega (inclusive no proprio dia)", () => {
    const lista = [mov("despesa", 100, { data: HOJE, parcela })];
    expect(resumir(lista, HOJE).despesas).toBe(100);
    expect(contaNosTotais(lista[0], HOJE)).toBe(true);
  });

  it("despesa futura sem parcela entra (so parcelas sao adiadas)", () => {
    expect(contaNosTotais(mov("despesa", 10, { data: "2027-01-01" }), HOJE)).toBe(true);
  });
});

describe("percentualGasto", () => {
  it("arredonda para inteiro", () => {
    expect(percentualGasto({ receitas: 1350, despesas: 783.2, saldo: 566.8 })).toBe(58);
  });

  it("sem receita nao ha percentual", () => {
    expect(percentualGasto({ receitas: 0, despesas: 10, saldo: -10 })).toBeNull();
  });

  it("pode passar de 100", () => {
    expect(percentualGasto({ receitas: 100, despesas: 150, saldo: -50 })).toBe(150);
  });
});
