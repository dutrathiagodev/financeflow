import { describe, expect, it } from "vitest";
import { rotaAtiva } from "./navigation";

describe("rotaAtiva", () => {
  it("a raiz so e ativa na raiz", () => {
    expect(rotaAtiva("/", "/")).toBe(true);
    expect(rotaAtiva("/", "/lancamentos")).toBe(false);
  });

  it("uma rota e ativa nela mesma e nas subrotas", () => {
    expect(rotaAtiva("/cartoes", "/cartoes")).toBe(true);
    expect(rotaAtiva("/cartoes", "/cartoes/novo")).toBe(true);
  });

  it("nao confunde rotas que so comecam igual", () => {
    expect(rotaAtiva("/cartoes", "/cartoes-antigos")).toBe(false);
  });

  it("sem caminho conhecido, nada fica ativo", () => {
    expect(rotaAtiva("/", null)).toBe(false);
  });
});
