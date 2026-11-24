import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { site, marca } from "@/content/brand";
import { Logo } from "./logo";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe("Logo", () => {
  it("expoe o nome da marca para leitor de tela e esconde o desenho", () => {
    const out = html(<Logo />);
    expect(out).toContain(`aria-label="${marca.nome}"`);
    expect(out).toContain('role="img"');
  });

  it("escuro usa simbolo claro e Flow em lima", () => {
    const out = html(<Logo variante="escuro" />);
    expect(out).toContain("simbolo-fundo-escuro.svg");
    expect(out).toContain("text-lima");
  });

  it("claro e neutro usam seus proprios simbolos e cores", () => {
    expect(html(<Logo variante="claro" />)).toContain("simbolo-fundo-claro.svg");
    expect(html(<Logo variante="neutro" />)).toContain("text-flow-neutro");
  });

  it("auto renderiza as duas versoes, cada uma visivel em um tema", () => {
    const out = html(<Logo variante="auto" />);
    expect(out).toContain("simbolo-fundo-claro.svg");
    expect(out).toContain("simbolo-fundo-escuro.svg");
    expect(out).toContain("dark:hidden");
    expect(out).toContain("dark:contents");
  });

  it("somenteSimbolo nao mostra o nome e o slogan so aparece quando pedido", () => {
    expect(html(<Logo somenteSimbolo />)).not.toContain("<b");
    expect(html(<Logo />)).not.toContain(marca.slogan);
    expect(html(<Logo comSlogan />)).toContain(marca.slogan);
  });

  it("nunca renderiza o logo completo abaixo de 24px de altura", () => {
    for (const t of ["sm", "md", "lg"] as const) {
      const m = html(<Logo tamanho={t} />).match(/width="(\d+)"/);
      expect(Number(m?.[1])).toBeGreaterThanOrEqual(24);
    }
  });

  it("usa next/image com width, height e alt (sem img crua)", () => {
    const out = html(<Logo />);
    expect(out).toMatch(/<img[^>]+alt=""/);
    expect(out).toMatch(/width="34"[^>]*height="34"|height="34"[^>]*width="34"/);
  });
});

describe("metadados do site", () => {
  it("titulo e descricao em pt-BR e modelo com o nome da marca", () => {
    expect(site.idioma).toBe("pt-BR");
    expect(site.modeloDeTitulo).toBe("%s · FinanceFlow");
    expect(site.titulo).toContain("FinanceFlow");
    expect(site.descricao.length).toBeGreaterThan(50);
    expect(site.descricao.length).toBeLessThanOrEqual(160);
  });
});
