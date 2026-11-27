import { describe, expect, it } from "vitest";
import { gastosPorCategoria, ultimasMovimentacoes } from "./spending";
import type { Movimentacao } from "./types";

const m = (extra: Partial<Movimentacao> & Pick<Movimentacao, "id">): Movimentacao => ({
  descricao: extra.id,
  valor: 10,
  tipo: "despesa",
  categoria: "Lazer",
  data: "2026-11-10",
  ...extra,
});

const soma = (itens: { percentual: number }[]) => itens.reduce((t, i) => t + i.percentual, 0);

describe("gastosPorCategoria (RF09)", () => {
  it("soma as despesas de cada categoria do mes, da maior para a menor", () => {
    const lista = [
      m({ id: "a", categoria: "Lazer", valor: 38 }),
      m({ id: "b", categoria: "Transporte", valor: 80 }),
      m({ id: "c", categoria: "Lazer", valor: 62 }),
    ];
    const gastos = gastosPorCategoria(lista, "2026-11");
    expect(gastos.map((g) => [g.categoria, g.valor])).toEqual([
      ["Lazer", 100],
      ["Transporte", 80],
    ]);
  });

  it("ignora receitas e outros meses", () => {
    const lista = [
      m({ id: "a", valor: 50 }),
      m({ id: "r", tipo: "receita", categoria: "Mesada", valor: 900 }),
      m({ id: "o", valor: 70, data: "2026-10-31" }),
    ];
    const gastos = gastosPorCategoria(lista, "2026-11");
    expect(gastos).toEqual([{ categoria: "Lazer", valor: 50, percentual: 100 }]);
  });

  it("os percentuais somam sempre 100, mesmo com tres partes iguais", () => {
    const lista = [
      m({ id: "a", categoria: "Lazer", valor: 10 }),
      m({ id: "b", categoria: "Saúde", valor: 10 }),
      m({ id: "c", categoria: "Educação", valor: 10 }),
    ];
    const gastos = gastosPorCategoria(lista, "2026-11");
    expect(soma(gastos)).toBe(100);
    expect(gastos.map((g) => g.percentual).sort()).toEqual([33, 33, 34]);
  });

  it("os percentuais somam 100 em varias combinacoes", () => {
    const combos = [
      [1, 1, 1, 1, 1, 1, 1],
      [0.01, 99.99],
      [33.33, 33.33, 33.34],
      [7, 11, 13, 17, 19, 23, 29],
      [1, 2],
    ];
    const categorias = ["Alimentação", "Transporte", "Moradia", "Educação", "Lazer", "Saúde", "Outros"];
    for (const valores of combos) {
      const lista = valores.map((valor, i) => m({ id: `x${i}`, categoria: categorias[i], valor }));
      expect(soma(gastosPorCategoria(lista, "2026-11"))).toBe(100);
    }
  });

  it("o valor das categorias bate com o total das despesas do mes na lista", () => {
    const lista = [
      m({ id: "a", categoria: "Lazer", valor: 38.1 }),
      m({ id: "b", categoria: "Transporte", valor: 12.2 }),
      m({ id: "c", categoria: "Lazer", valor: 0.3 }),
    ];
    const total = gastosPorCategoria(lista, "2026-11").reduce((t, g) => t + Math.round(g.valor * 100), 0);
    expect(total).toBe(Math.round((38.1 + 12.2 + 0.3) * 100));
  });

  it("uma categoria so fica com 100%", () => {
    expect(gastosPorCategoria([m({ id: "a", valor: 5 })], "2026-11")[0].percentual).toBe(100);
  });

  it("sem despesas no mes devolve lista vazia", () => {
    expect(gastosPorCategoria([], "2026-11")).toEqual([]);
    expect(gastosPorCategoria([m({ id: "r", tipo: "receita", categoria: "Mesada" })], "2026-11")).toEqual([]);
    expect(gastosPorCategoria([m({ id: "a", data: "2026-10-01" })], "2026-11")).toEqual([]);
  });

  it("parcela futura conta no mes da propria data (RN12)", () => {
    const lista = [m({ id: "p", valor: 100, data: "2026-12-10", parcela: { atual: 2, total: 3 } })];
    expect(gastosPorCategoria(lista, "2026-12")).toHaveLength(1);
    expect(gastosPorCategoria(lista, "2026-11")).toEqual([]);
  });

  it("empate de valor desempata em ordem alfabetica", () => {
    const lista = [
      m({ id: "a", categoria: "Saúde", valor: 10 }),
      m({ id: "b", categoria: "Educação", valor: 10 }),
    ];
    expect(gastosPorCategoria(lista, "2026-11").map((g) => g.categoria)).toEqual(["Educação", "Saúde"]);
  });
});

describe("ultimasMovimentacoes", () => {
  const hoje = "2026-11-27";

  it("devolve as mais recentes primeiro, limitadas pela quantidade", () => {
    const lista = [
      m({ id: "velha", data: "2026-09-01" }),
      m({ id: "nova", data: "2026-11-20" }),
      m({ id: "meio", data: "2026-10-15" }),
    ];
    expect(ultimasMovimentacoes(lista, hoje, 2).map((i) => i.id)).toEqual(["nova", "meio"]);
  });

  it("parcela futura nao aparece, mas a parcela que ja venceu sim", () => {
    const lista = [
      m({ id: "futura", data: "2026-12-10", parcela: { atual: 2, total: 3 } }),
      m({ id: "venceu", data: "2026-11-10", parcela: { atual: 1, total: 3 } }),
    ];
    expect(ultimasMovimentacoes(lista, hoje, 6).map((i) => i.id)).toEqual(["venceu"]);
  });

  it("lista vazia nao da erro", () => {
    expect(ultimasMovimentacoes([], hoje, 6)).toEqual([]);
  });

  it("nao altera a lista recebida", () => {
    const lista = [m({ id: "a", data: "2026-01-01" }), m({ id: "b", data: "2026-02-01" })];
    ultimasMovimentacoes(lista, hoje, 6);
    expect(lista.map((i) => i.id)).toEqual(["a", "b"]);
  });
});
