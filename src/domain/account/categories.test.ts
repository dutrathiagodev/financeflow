import { describe, expect, it } from "vitest";
import { categoriaPadrao, categoriaValida, categoriasDoTipo } from "./categories";

describe("categorias (RN03)", () => {
  it("receita tem 4 e despesa tem 7, como no PRD", () => {
    expect(categoriasDoTipo("receita")).toEqual(["Salário", "Freelance", "Mesada", "Outros"]);
    expect(categoriasDoTipo("despesa")).toEqual([
      "Alimentação",
      "Transporte",
      "Moradia",
      "Educação",
      "Lazer",
      "Saúde",
      "Outros",
    ]);
  });

  it("categoria de um tipo nao vale no outro", () => {
    expect(categoriaValida("despesa", "Lazer")).toBe(true);
    expect(categoriaValida("receita", "Lazer")).toBe(false);
    expect(categoriaValida("receita", "Salário")).toBe(true);
    expect(categoriaValida("despesa", "Salário")).toBe(false);
  });

  it("a categoria padrao sempre e valida para o tipo", () => {
    for (const tipo of ["receita", "despesa"] as const) {
      expect(categoriaValida(tipo, categoriaPadrao(tipo))).toBe(true);
    }
  });
});
