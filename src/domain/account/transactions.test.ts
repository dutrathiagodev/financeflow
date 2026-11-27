import { describe, expect, it } from "vitest";
import { resumir } from "./summary";
import {
  alterarTipoDoFiltro,
  categoriasDoFiltro,
  FILTROS_PADRAO,
  filtrarMovimentacoes,
  haFiltroAtivo,
  mesesDisponiveis,
  normalizarFiltros,
  type Filtros,
} from "./transactions";
import type { Movimentacao } from "./types";

const m = (extra: Partial<Movimentacao> & Pick<Movimentacao, "id">): Movimentacao => ({
  descricao: extra.id,
  valor: 10,
  tipo: "despesa",
  categoria: "Lazer",
  data: "2026-11-10",
  ...extra,
});

const lista: Movimentacao[] = [
  m({ id: "cinema", categoria: "Lazer", data: "2026-11-22" }),
  m({ id: "onibus", categoria: "Transporte", data: "2026-11-20" }),
  m({ id: "mesada", tipo: "receita", categoria: "Mesada", data: "2026-11-05", valor: 450 }),
  m({ id: "fliperama", categoria: "Lazer", data: "2026-10-30" }),
  m({ id: "freela", tipo: "receita", categoria: "Freelance", data: "2026-10-28", valor: 300 }),
  m({ id: "fatura", categoria: "Lazer", data: "2026-10-15", pagamento: "cartao" }),
];

const ids = (itens: readonly Movimentacao[]) => itens.map((i) => i.id);
const com = (extra: Partial<Filtros>): Filtros => ({ ...FILTROS_PADRAO, ...extra });

describe("filtrarMovimentacoes", () => {
  it("o padrao mostra tudo, de todos os meses, na mesma ordem", () => {
    expect(ids(filtrarMovimentacoes(lista, FILTROS_PADRAO))).toEqual(ids(lista));
  });

  it("filtra por tipo", () => {
    expect(ids(filtrarMovimentacoes(lista, com({ tipo: "receita" })))).toEqual(["mesada", "freela"]);
    expect(filtrarMovimentacoes(lista, com({ tipo: "despesa" }))).toHaveLength(4);
  });

  it("filtra por categoria (so despesas de Lazer)", () => {
    const r = filtrarMovimentacoes(lista, com({ tipo: "despesa", categoria: "Lazer" }));
    expect(ids(r)).toEqual(["cinema", "fliperama", "fatura"]);
  });

  it("filtra por forma de pagamento; sem o campo conta como a vista", () => {
    expect(ids(filtrarMovimentacoes(lista, com({ pagamento: "cartao" })))).toEqual(["fatura"]);
    expect(filtrarMovimentacoes(lista, com({ pagamento: "avista" }))).toHaveLength(5);
  });

  it("filtra por mes", () => {
    expect(ids(filtrarMovimentacoes(lista, com({ mes: "2026-10" })))).toEqual([
      "fliperama",
      "freela",
      "fatura",
    ]);
  });

  it("combina tipo + categoria + mes", () => {
    const r = filtrarMovimentacoes(lista, com({ tipo: "despesa", categoria: "Lazer", mes: "2026-10" }));
    expect(ids(r)).toEqual(["fliperama", "fatura"]);
  });

  it("combina os quatro filtros", () => {
    const r = filtrarMovimentacoes(
      lista,
      com({ tipo: "despesa", categoria: "Lazer", pagamento: "cartao", mes: "2026-10" }),
    );
    expect(ids(r)).toEqual(["fatura"]);
  });

  it("combinacao sem resultado devolve lista vazia", () => {
    expect(filtrarMovimentacoes(lista, com({ tipo: "receita", categoria: "Lazer" }))).toEqual([]);
  });

  it("nao muda a lista original", () => {
    const copia = [...lista];
    filtrarMovimentacoes(lista, com({ tipo: "receita" }));
    expect(lista).toEqual(copia);
  });

  it("os totais do topo nao mudam com filtros (RN01)", () => {
    const hoje = "2026-11-27";
    const total = resumir(lista, hoje);
    // O resumo recebe sempre a lista inteira; filtrar nao altera o que ele calcula.
    filtrarMovimentacoes(lista, com({ tipo: "receita", mes: "2026-10" }));
    expect(resumir(lista, hoje)).toEqual(total);
    expect(total.receitas).toBe(750);
  });
});

describe("categoriasDoFiltro", () => {
  it("acompanha o tipo escolhido", () => {
    expect(categoriasDoFiltro("receita")).toEqual(["Salário", "Freelance", "Mesada", "Outros"]);
    expect(categoriasDoFiltro("despesa")).toContain("Lazer");
    expect(categoriasDoFiltro("despesa")).not.toContain("Mesada");
  });

  it("em Todos junta as duas listas sem repetir nomes", () => {
    const todas = categoriasDoFiltro("todos");
    expect(todas).toContain("Mesada");
    expect(todas).toContain("Lazer");
    expect(todas.filter((c) => c === "Outros")).toHaveLength(1);
    expect(new Set(todas).size).toBe(todas.length);
  });
});

describe("alterarTipoDoFiltro", () => {
  it("limpa a categoria que nao existe no tipo novo", () => {
    const r = alterarTipoDoFiltro(com({ tipo: "despesa", categoria: "Lazer" }), "receita");
    expect(r).toEqual(com({ tipo: "receita", categoria: "todos" }));
  });

  it("mantem a categoria que tambem existe no tipo novo", () => {
    expect(alterarTipoDoFiltro(com({ categoria: "Outros" }), "receita").categoria).toBe("Outros");
  });

  it("nao mexe nos outros filtros", () => {
    const r = alterarTipoDoFiltro(com({ pagamento: "cartao", mes: "2026-10", categoria: "Lazer" }), "receita");
    expect(r.pagamento).toBe("cartao");
    expect(r.mes).toBe("2026-10");
  });
});

describe("mesesDisponiveis", () => {
  it("lista os meses que existem, do mais recente para o mais antigo, sem repetir", () => {
    expect(mesesDisponiveis(lista)).toEqual(["2026-11", "2026-10"]);
  });

  it("lista vazia nao tem meses", () => {
    expect(mesesDisponiveis([])).toEqual([]);
  });

});

describe("normalizarFiltros", () => {
  it("mes que ainda tem movimentacao fica como esta (mesmo objeto)", () => {
    const filtros = com({ mes: "2026-10", tipo: "despesa" });
    expect(normalizarFiltros(filtros, lista)).toBe(filtros);
  });

  it("todos os meses nunca muda", () => {
    expect(normalizarFiltros(FILTROS_PADRAO, lista)).toBe(FILTROS_PADRAO);
    expect(normalizarFiltros(FILTROS_PADRAO, [])).toBe(FILTROS_PADRAO);
  });

  it("mes sem movimentacao volta para todos e mantem os outros filtros", () => {
    const r = normalizarFiltros(com({ mes: "2026-09", tipo: "despesa", categoria: "Lazer" }), lista);
    expect(r).toEqual(com({ mes: "todos", tipo: "despesa", categoria: "Lazer" }));
  });

  it("excluir a ultima movimentacao do mes escolhido tira o filtro daquele mes", () => {
    const soNovembro = lista.filter((m) => !m.data.startsWith("2026-10"));
    expect(mesesDisponiveis(soNovembro)).toEqual(["2026-11"]);
    expect(normalizarFiltros(com({ mes: "2026-10" }), soNovembro).mes).toBe("todos");
  });
});

describe("haFiltroAtivo", () => {
  it("falso no padrao e verdadeiro com qualquer filtro", () => {
    expect(haFiltroAtivo(FILTROS_PADRAO)).toBe(false);
    expect(haFiltroAtivo(com({ tipo: "receita" }))).toBe(true);
    expect(haFiltroAtivo(com({ categoria: "Lazer" }))).toBe(true);
    expect(haFiltroAtivo(com({ pagamento: "cartao" }))).toBe(true);
    expect(haFiltroAtivo(com({ mes: "2026-10" }))).toBe(true);
  });
});
