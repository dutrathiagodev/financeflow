import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { filtros as textos } from "@/content/lancamentos";
import { categoriasDoFiltro, FILTROS_PADRAO } from "@/domain/account/transactions";
import { TransactionFilters } from "./transaction-filters";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);
const nada = () => {};

const base = {
  filtros: FILTROS_PADRAO,
  categorias: categoriasDoFiltro("todos"),
  meses: ["2026-11", "2026-10"],
  onTipo: nada,
  onCategoria: nada,
  onPagamento: nada,
  onMes: nada,
};

describe("TransactionFilters", () => {
  it("tem os quatro filtros, agrupados e com nome acessivel", () => {
    const out = html(<TransactionFilters {...base} />);
    expect(out).toContain(`role="group"`);
    expect(out).toContain(`aria-label="${textos.rotulo}"`);
    for (const rotulo of [textos.tipo, textos.categoria, textos.pagamento, textos.mes]) {
      expect(out).toContain(rotulo);
    }
  });

  it("tipo e um grupo de radios nativos (teclado e leitor de tela)", () => {
    const out = html(<TransactionFilters {...base} />);
    expect(out).toContain("<fieldset");
    expect(out).toContain("<legend");
    expect(out.match(/type="radio"/g)).toHaveLength(3);
  });

  it("o padrao e Todos, Todas e Todos os meses", () => {
    const out = html(<TransactionFilters {...base} />);
    expect(out).toContain(textos.todasCategorias);
    expect(out).toContain(textos.todosMeses);
    expect(out).toMatch(/checked=""[^>]*value="todos"|value="todos"[^>]*checked=""/);
  });

  it("a lista de categorias acompanha o tipo recebido", () => {
    const despesa = html(<TransactionFilters {...base} categorias={categoriasDoFiltro("despesa")} />);
    expect(despesa).toContain("Lazer");
    expect(despesa).not.toContain("Mesada");
    const receita = html(<TransactionFilters {...base} categorias={categoriasDoFiltro("receita")} />);
    expect(receita).toContain("Mesada");
    expect(receita).not.toContain("Lazer");
  });

  it("lista os meses por extenso, do mais recente para o mais antigo", () => {
    const out = html(<TransactionFilters {...base} />);
    expect(out.indexOf("Novembro de 2026")).toBeGreaterThan(-1);
    expect(out.indexOf("Novembro de 2026")).toBeLessThan(out.indexOf("Outubro de 2026"));
  });

  it("alvos de toque de pelo menos 44 px", () => {
    expect(html(<TransactionFilters {...base} />)).toContain("min-h-11");
  });
});
