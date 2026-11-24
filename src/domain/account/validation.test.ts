import { describe, expect, it } from "vitest";
import type { RascunhoMovimentacao } from "./types";
import { validarMovimentacao } from "./validation";

const valido: RascunhoMovimentacao = {
  descricao: "Almoço no refeitório",
  valor: "48,10",
  tipo: "despesa",
  categoria: "Alimentação",
  data: "2026-11-24",
};

describe("validarMovimentacao (RN02)", () => {
  it("aceita um rascunho completo e devolve valores limpos", () => {
    const r = validarMovimentacao({ ...valido, descricao: "  Almoço  ", valor: "1.234,5" });
    expect(r).toEqual({
      ok: true,
      valor: {
        descricao: "Almoço",
        valor: 1234.5,
        tipo: "despesa",
        categoria: "Alimentação",
        data: "2026-11-24",
      },
    });
  });

  it("descricao vazia ou so espacos", () => {
    for (const descricao of ["", "   "]) {
      const r = validarMovimentacao({ ...valido, descricao });
      expect(r).toEqual({ ok: false, erro: { descricao: "descricao-vazia" } });
    }
  });

  it.each(["", "0", "0,00", "-5", "abc"])("valor %j e invalido", (valor) => {
    const r = validarMovimentacao({ ...valido, valor });
    expect(r).toEqual({ ok: false, erro: { valor: "valor-invalido" } });
  });

  it("data ausente e data impossivel tem erros diferentes", () => {
    expect(validarMovimentacao({ ...valido, data: "" })).toEqual({
      ok: false,
      erro: { data: "data-ausente" },
    });
    expect(validarMovimentacao({ ...valido, data: "2026-02-31" })).toEqual({
      ok: false,
      erro: { data: "data-invalida" },
    });
  });

  it("categoria precisa ser do tipo escolhido", () => {
    const r = validarMovimentacao({ ...valido, tipo: "receita", categoria: "Lazer" });
    expect(r).toEqual({ ok: false, erro: { categoria: "categoria-invalida" } });
  });

  it("junta os erros de todos os campos de uma vez", () => {
    const r = validarMovimentacao({ descricao: "", valor: "0", tipo: "despesa", categoria: "", data: "" });
    expect(r).toEqual({
      ok: false,
      erro: {
        descricao: "descricao-vazia",
        valor: "valor-invalido",
        categoria: "categoria-invalida",
        data: "data-ausente",
      },
    });
  });

  it("valor com centavos quebrados e arredondado no dominio", () => {
    const r = validarMovimentacao({ ...valido, valor: "10,005" });
    expect(r.ok && r.valor.valor).toBe(10.01);
  });
});
