import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

// Faz valer a regra de dependencia de docs/architecture/clean-architecture.md e
// docs/architecture/feature.spec.md. Se um import quebrar a regra, este teste falha.

const raiz = fileURLToPath(new URL("./", import.meta.url));

function arquivos(dir: string): string[] {
  return readdirSync(dir).flatMap((nome) => {
    const caminho = join(dir, nome);
    if (statSync(caminho).isDirectory()) return arquivos(caminho);
    return /\.(ts|tsx)$/.test(nome) && !/\.test\.tsx?$/.test(nome) ? [caminho] : [];
  });
}

const todos = arquivos(raiz).map((caminho) => ({
  caminho: relative(raiz, caminho).replaceAll("\\", "/"),
  codigo: readFileSync(caminho, "utf8"),
}));

/** Imports locais (alias "@/") de um arquivo, sem o prefixo. */
function importsLocais(codigo: string): string[] {
  return [...codigo.matchAll(/(?:from|import)\s+["']@\/([^"']+)["']/g)].map((m) => m[1]);
}

function de(pasta: string) {
  return todos.filter((a) => a.caminho.startsWith(`${pasta}/`));
}

function violacoes(pasta: string, permitidos: RegExp): string[] {
  return de(pasta).flatMap((a) =>
    importsLocais(a.codigo)
      .filter((imp) => !permitidos.test(imp))
      .map((imp) => `${a.caminho} importa @/${imp}`),
  );
}

describe("regra de dependencia (arquitetura limpa)", () => {
  it("domain so importa domain", () => {
    expect(violacoes("domain", /^domain\//)).toEqual([]);
  });

  it("application importa so domain e application", () => {
    expect(violacoes("application", /^(domain|application)\//)).toEqual([]);
  });

  it("infrastructure importa domain, application/ports e infrastructure", () => {
    expect(violacoes("infrastructure", /^(domain|application\/ports|infrastructure)\//)).toEqual([]);
  });

  it("content nao importa nada do projeto", () => {
    expect(violacoes("content", /^$/)).toEqual([]);
  });

  it("lib nao conhece regra de negocio nem componentes", () => {
    expect(violacoes("lib", /^lib\//)).toEqual([]);
  });

  it("components/ui so importa lib (sem texto nem regra de negocio)", () => {
    expect(violacoes("components/ui", /^lib\//)).toEqual([]);
  });

  it("components nao importam rotas (app) nem infrastructure", () => {
    const ruins = de("components").flatMap((a) =>
      importsLocais(a.codigo)
        .filter((imp) => /^(app|infrastructure)\//.test(imp))
        .map((imp) => `${a.caminho} importa @/${imp}`),
    );
    expect(ruins).toEqual([]);
  });

  it("nenhuma camada interna importa de components ou app", () => {
    const internas = ["domain", "application", "infrastructure", "content", "lib"];
    const ruins = internas.flatMap((p) =>
      de(p).flatMap((a) =>
        importsLocais(a.codigo)
          .filter((imp) => /^(components|app)\//.test(imp))
          .map((imp) => `${a.caminho} importa @/${imp}`),
      ),
    );
    expect(ruins).toEqual([]);
  });
});

describe("regras do feature.spec", () => {
  it("nenhum hex solto em componentes (use tokens)", () => {
    const ruins = de("components")
      .filter((a) => /#[0-9a-fA-F]{6}\b/.test(a.codigo))
      .map((a) => a.caminho);
    expect(ruins).toEqual([]);
  });

  it("nenhuma tag <img> crua (use next/image)", () => {
    const ruins = todos.filter((a) => /<img[\s>]/.test(a.codigo)).map((a) => a.caminho);
    expect(ruins).toEqual([]);
  });

  it("page.tsx so compoe: sem texto de negocio nem estilo", () => {
    const page = todos.find((a) => a.caminho === "app/page.tsx");
    expect(page?.codigo).not.toMatch(/className=|style=/);
  });

  it('"use client" so em componentes de ui/sections/data com estado ou evento', () => {
    const clientes = todos.filter((a) => /^["']use client["']/m.test(a.codigo));
    const ruins = clientes
      .filter((a) => !/^components\//.test(a.caminho) && !/^application\/hooks\//.test(a.caminho))
      .map((a) => a.caminho);
    expect(ruins).toEqual([]);
  });
});
