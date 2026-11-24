import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { razaoDeContraste } from "@/lib/contrast";

// Confere os tokens de src/app/globals.css contra a tabela WCAG do PRD (secao 7).
const css = readFileSync(fileURLToPath(new URL("./globals.css", import.meta.url)), "utf8");

function bloco(inicio: string): string {
  const i = css.indexOf(inicio);
  const fim = css.indexOf("\n}", i);
  return css.slice(i, fim);
}

function tokens(texto: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of texto.matchAll(/--ff-([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi)) out[m[1]] = m[2];
  return out;
}

const claro = tokens(bloco(":root {"));
const escuro = { ...claro, ...tokens(bloco('html[data-tema="dark"] {')) };

const casos: Array<[string, Record<string, string>, string, string, number]> = [
  ["claro: texto sobre painel", claro, "tinta", "painel", 13.4],
  ["claro: texto suave sobre painel", claro, "muted", "painel", 5.9],
  ["claro: receita sobre painel", claro, "receita", "painel", 6.1],
  ["claro: despesa sobre painel", claro, "despesa", "painel", 6.0],
  ["claro: investimento sobre painel", claro, "invest", "painel", 6.9],
  ["claro: creme sobre botao primario", claro, "creme", "primario", 12.3],
  ["claro: lima sobre bloco escuro", claro, "lima", "escuro", 7.8],
  ["claro: coral sobre bloco escuro", claro, "coral", "escuro", 7.0],
  ["escuro: texto sobre painel", escuro, "tinta", "painel", 14.1],
  ["escuro: texto suave sobre painel", escuro, "muted", "painel", 7.1],
  ["escuro: receita sobre painel", escuro, "receita", "painel", 8.3],
  ["escuro: despesa sobre painel", escuro, "despesa", "painel", 6.9],
  ["escuro: investimento sobre painel", escuro, "invest", "painel", 7.9],
  ["escuro: texto escuro sobre botao primario", escuro, "primario-texto", "primario", 10.3],
];

describe("tokens de cor: contraste do PRD", () => {
  it.each(casos)("%s = %f:1", (_nome, tema, frente, fundo, esperado) => {
    expect(razaoDeContraste(tema[frente], tema[fundo])).toBeCloseTo(esperado, 0);
  });

  it("branco sobre aba Despesa e Receita passa AA (>= 4,5:1)", () => {
    expect(razaoDeContraste("#ffffff", claro["despesa-fundo"])).toBeGreaterThanOrEqual(4.5);
    expect(razaoDeContraste("#ffffff", claro["receita-fundo"])).toBeGreaterThanOrEqual(4.5);
  });

  it("cada cartao tem cor principal e de degrade", () => {
    for (const cor of ["roxo", "laranja", "verde", "azul", "vermelho", "grafite"]) {
      expect(claro[`cartao-${cor}`]).toBeDefined();
      expect(claro[`cartao-${cor}-2`]).toBeDefined();
    }
  });

  it("tema escuro redefine fundo, painel e tinta", () => {
    for (const chave of ["fundo", "painel", "tinta"]) {
      expect(escuro[chave]).not.toBe(claro[chave]);
    }
  });
});
