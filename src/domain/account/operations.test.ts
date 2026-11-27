import { describe, expect, it } from "vitest";
import {
  adicionarMovimentacao,
  excluirMovimentacao,
  ordenarPorData,
  posicaoDe,
  restaurarMovimentacao,
} from "./operations";
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

describe("excluirMovimentacao (RF04)", () => {
  const lista = [existente("a", "2026-11-20"), existente("b", "2026-11-10"), existente("c", "2026-11-01")];

  it("remove so a movimentacao do id informado e nao muda a lista original", () => {
    const r = excluirMovimentacao(lista, "b");
    expect(r.map((m) => m.id)).toEqual(["a", "c"]);
    expect(lista).toHaveLength(3);
  });

  it("id que nao existe devolve uma lista igual", () => {
    expect(excluirMovimentacao(lista, "x")).toEqual(lista);
  });

  it("a lista vazia continua vazia", () => {
    expect(excluirMovimentacao([], "a")).toEqual([]);
  });
});

describe("restaurarMovimentacao (Desfazer)", () => {
  const lista = [existente("a", "2026-11-20"), existente("b", "2026-11-10"), existente("c", "2026-11-01")];

  it("excluir e desfazer devolve exatamente a lista de antes", () => {
    for (const indice of [0, 1, 2]) {
      const item = lista[indice];
      const depois = excluirMovimentacao(lista, item.id);
      expect(restaurarMovimentacao(depois, item, posicaoDe(lista, item.id)!)).toEqual(lista);
    }
  });

  it("em empate de data, volta para a mesma posicao entre as de mesma data", () => {
    const empate = [existente("x", "2026-11-10"), existente("y", "2026-11-10"), existente("z", "2026-11-10")];
    const depois = excluirMovimentacao(empate, "y");
    expect(restaurarMovimentacao(depois, empate[1], posicaoDe(empate, "y")!).map((m) => m.id)).toEqual(["x", "y", "z"]);
  });

  it("se a lista mudou no meio tempo, o item ainda cai no lugar certo pela data", () => {
    const item = lista[2];
    const depois = excluirMovimentacao(lista, "c");
    const comNova = [existente("n", "2026-11-25"), ...depois];
    expect(restaurarMovimentacao(comNova, item, posicaoDe(lista, "c")!).map((m) => m.id)).toEqual(["n", "a", "b", "c"]);
  });

  it("indice fora do limite e ajustado", () => {
    const item = lista[0];
    const sozinho = { indice: 9, proximoId: null, anteriorId: null };
    expect(restaurarMovimentacao([], item, sozinho)).toEqual([item]);
    expect(restaurarMovimentacao([lista[1]], item, { ...sozinho, indice: -3 }).map((m) => m.id)).toEqual(["a", "b"]);
  });

  it("com item novo de mesma data adicionado no meio tempo, volta antes de quem vinha depois dele", () => {
    // [a, b] na mesma data. Exclui a, adiciona n (o novo fica em cima) e desfaz: a volta entre n e b.
    const mesmoDia = [existente("a", "2026-11-10"), existente("b", "2026-11-10")];
    const depois = excluirMovimentacao(mesmoDia, "a");
    const comNova = [existente("n", "2026-11-10"), ...depois];
    expect(restaurarMovimentacao(comNova, mesmoDia[0], posicaoDe(mesmoDia, "a")!).map((m) => m.id)).toEqual(["n", "a", "b"]);
  });

  it("nao duplica se o item ja estiver na lista", () => {
    expect(restaurarMovimentacao(lista, lista[0], posicaoDe(lista, "a")!)).toEqual(lista);
  });

  it("nao muda a lista recebida", () => {
    const depois = excluirMovimentacao(lista, "a");
    restaurarMovimentacao(depois, lista[0], posicaoDe(lista, "a")!);
    expect(depois).toHaveLength(2);
  });
});

describe("posicaoDe", () => {
  const lista = [existente("a", "2026-11-20"), existente("b", "2026-11-10"), existente("c", "2026-11-01")];

  it("guarda o indice e os vizinhos", () => {
    expect(posicaoDe(lista, "b")).toEqual({ indice: 1, proximoId: "c", anteriorId: "a" });
    expect(posicaoDe(lista, "a")).toEqual({ indice: 0, proximoId: "b", anteriorId: null });
    expect(posicaoDe(lista, "c")).toEqual({ indice: 2, proximoId: null, anteriorId: "b" });
  });

  it("id que nao existe devolve null", () => {
    expect(posicaoDe(lista, "x")).toBeNull();
  });
});

describe("restaurarMovimentacao com vizinhos", () => {
  it("se o proximo sumiu, usa o anterior", () => {
    const lista = [existente("a", "2026-11-10"), existente("b", "2026-11-10"), existente("c", "2026-11-10")];
    const posicao = posicaoDe(lista, "b")!; // proximo c, anterior a
    const semBeC = [lista[0]]; // c e b foram embora
    expect(restaurarMovimentacao(semBeC, lista[1], posicao).map((m) => m.id)).toEqual(["a", "b"]);
  });

  it("restaurar varias vezes, em qualquer ordem de exclusao, recompoe a lista", () => {
    const lista = [existente("a", "2026-11-10"), existente("b", "2026-11-10"), existente("c", "2026-11-10")];
    for (const id of ["a", "b", "c"]) {
      const posicao = posicaoDe(lista, id)!;
      const item = lista.find((m) => m.id === id)!;
      expect(restaurarMovimentacao(excluirMovimentacao(lista, id), item, posicao)).toEqual(lista);
    }
  });
});
