import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { itensDoMenu, navegacao, rodape } from "@/content/navegacao";
import { lancamentos } from "@/content/lancamentos";
import { paginas } from "@/content/paginas";
import { Footer } from "./footer";
import { NavLinks } from "./nav-links";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe("itens do menu", () => {
  it("tem as cinco telas do PRD, na ordem", () => {
    expect(itensDoMenu.map((i) => i.rotulo)).toEqual([
      "Painel",
      "Lançamentos",
      "Planilha do ano",
      "Cartões",
      "Investimentos",
    ]);
  });

  it("todas as rotas tem titulo e subtitulo no cabecalho", () => {
    for (const item of itensDoMenu) {
      expect(paginas[item.href]?.titulo, item.href).toBe(item.rotulo);
      expect(paginas[item.href]?.subtitulo, item.href).toBeTruthy();
    }
  });

  it("o titulo de Lancamentos nao diverge do usado na aba do navegador", () => {
    expect(paginas["/lancamentos"].titulo).toBe(lancamentos.titulo);
    expect(paginas["/lancamentos"].subtitulo).toBe(lancamentos.subtitulo);
  });
});

describe("NavLinks", () => {
  it("destaca so o item da rota aberta, com aria-current", () => {
    const out = html(<NavLinks itens={itensDoMenu} caminho="/lancamentos" variante="lateral" />);
    expect(out.match(/aria-current="page"/g)).toHaveLength(1);
    expect(out).toMatch(/aria-current="page"[^>]*href="\/lancamentos"/);
  });

  it("sem rota conhecida, nenhum item fica ativo", () => {
    const out = html(<NavLinks itens={itensDoMenu} caminho={null} variante="inferior" />);
    expect(out).not.toContain("aria-current");
  });

  it("cada item tem texto visivel e icone decorativo", () => {
    const out = html(<NavLinks itens={itensDoMenu} caminho="/" variante="inferior" />);
    for (const item of itensDoMenu) expect(out).toContain(`<span>${item.rotulo}</span>`);
    expect(out.match(/aria-hidden="true"/g)).toHaveLength(itensDoMenu.length);
  });

  it("alvos de toque de pelo menos 44px", () => {
    expect(html(<NavLinks itens={itensDoMenu} caminho="/" variante="lateral" />)).toContain("min-h-11");
    expect(html(<NavLinks itens={itensDoMenu} caminho="/" variante="inferior" />)).toContain("min-h-[52px]");
  });
});

describe("Footer", () => {
  it("mostra o aviso de privacidade e o botao de restaurar", () => {
    const out = html(<Footer />);
    expect(out).toContain("<footer");
    expect(out).toContain(rodape.aviso);
    expect(out).toContain(rodape.restaurar);
  });

  it("o botao fica desativado enquanto nao ha o que restaurar", () => {
    expect(html(<Footer />)).toContain("disabled");
    expect(html(<Footer onRestaurar={() => {}} />)).not.toContain("disabled=");
  });
});

describe("textos de navegacao", () => {
  it("o link de pular para o conteudo existe", () => {
    expect(navegacao.pularParaOConteudo).toBe("Pular para o conteúdo");
  });
});
