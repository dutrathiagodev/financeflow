import { describe, expect, it } from "vitest";
import { adicionarMovimentacao, ordenarPorData } from "./operations";
import type { Movimentacao, RascunhoMovimentacao } from "./types";

const rascunho = (extra: Partial<RascunhoMovimentacao> = {}): RascunhoMovimentacao => ({
  descricao: "Freela de site",
  valor: "450",
  tipo: "receita",
  categoria: "Freelance",
  data: "2026-11-11",
  ...extra,
});

const existente = (id: string, data: string): Movimentacao => ({
  id,
  descricao: id,
  valor: 1,
  tipo: "despesa",
  categoria: "Lazer",
  data,
});

describe("adicionarMovimentacao (RF01)", () => {
  it("adiciona com o id gerado e sem mutar a lista original", () => {
    const original: Movimentacao[] = [];
    const r = adicionarMovimentacao(original, rascunho(), () => "id-1");
    expect(r.ok).toBe(true);
    expect(original).toHaveLength(0);
    expect(r.ok && r.valor).toEqual([
      {
        id: "id-1",
        descricao: "Freela de site",
        valor: 450,
        tipo: "receita",
        categoria: "Freelance",
        data: "2026-11-11",
      },
    ]);
  });

  it("rascunho invalido nao altera nada e devolve os erros", () => {
    const lista = [existente("a", "2026-11-01")];
    const r = adicionarMovimentacao(lista, rascunho({ valor: "0" }), () => "x");
    expect(r).toEqual({ ok: false, erro: { valor: "valor-invalido" } });
    expect(lista).toHaveLength(1);
  });

  it("deixa a mais recente no topo", () => {
    const lista = [existente("a", "2026-11-15"), existente("b", "2026-10-01")];
    const r = adicionarMovimentacao(lista, rascunho({ data: "2026-11-20" }), () => "novo");
    expect(r.ok && r.valor.map((m) => m.id)).toEqual(["novo", "a", "b"]);
  });

  it("no mesmo dia, a recem adicionada fica em cima", () => {
    const lista = [existente("a", "2026-11-11")];
    const r = adicionarMovimentacao(lista, rascunho({ data: "2026-11-11" }), () => "novo");
    expect(r.ok && r.valor.map((m) => m.id)).toEqual(["novo", "a"]);
  });
});

describe("ordenarPorData", () => {
  it("ordena da mais recente para a mais antiga", () => {
    const ids = ordenarPorData([
      existente("a", "2026-01-01"),
      existente("b", "2026-03-01"),
      existente("c", "2026-02-01"),
    ]).map((m) => m.id);
    expect(ids).toEqual(["b", "c", "a"]);
  });
});
