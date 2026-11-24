import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { IconButton } from "@/components/ui/icon-button";
import { tema } from "@/content/theme";
import { ATRIBUTO_DO_TEMA, CHAVE_DO_TEMA, TEMAS } from "@/lib/theme";
import { ThemeToggle } from "./theme-toggle";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe("configuracao do tema (igual a plataforma exemplo)", () => {
  it("usa a mesma chave e o mesmo atributo", () => {
    expect(CHAVE_DO_TEMA).toBe("financeflow:tema");
    expect(ATRIBUTO_DO_TEMA).toBe("data-tema");
    expect(TEMAS).toEqual(["light", "dark"]);
  });
});

describe("ThemeToggle", () => {
  it("tem o rotulo da plataforma e e um botao de 44px", () => {
    const out = html(<ThemeToggle />);
    expect(out).toContain(`aria-label="${tema.alternar}"`);
    expect(out).toContain("size-11");
    expect(out).toContain('type="button"');
  });

  it("lua no claro e sol no escuro, trocados por CSS", () => {
    const out = html(<ThemeToggle />);
    expect(out).toContain("dark:hidden");
    expect(out).toContain("dark:block");
  });

  it("no servidor nao afirma um estado (aria-pressed so depois de montar)", () => {
    expect(html(<ThemeToggle />)).not.toContain("aria-pressed");
  });
});

describe("IconButton", () => {
  it("exige nome acessivel e usa o contorno fino do design system", () => {
    const out = html(<IconButton aria-label="Fechar" />);
    expect(out).toContain('aria-label="Fechar"');
    expect(out).toContain("border-regua-forte");
    expect(out).toContain("rounded-base");
  });
});
