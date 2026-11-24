import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { SummaryStrip } from "./summary-strip";

const html = (el: React.ReactElement) => renderToStaticMarkup(el).replaceAll(" ", " ");

describe("SummaryStrip (RF02)", () => {
  const resumo = { receitas: 1350, despesas: 783.2, saldo: 566.8 };

  it("mostra receitas, despesas e saldo formatados em reais", () => {
    const out = html(<SummaryStrip resumo={resumo} />);
    expect(out).toContain("R$ 1.350,00");
    expect(out).toContain("R$ 783,20");
    expect(out).toContain("R$ 566,80");
  });

  it("receita em verde, despesa em vermelho e saldo em destaque", () => {
    const out = html(<SummaryStrip resumo={resumo} />);
    expect(out).toContain("text-receita");
    expect(out).toContain("text-despesa");
    expect(out).toContain("font-extrabold");
  });

  it("diz quanto do que entrou ja foi gasto", () => {
    expect(html(<SummaryStrip resumo={resumo} />)).toContain("Você gastou 58% do que recebeu.");
  });

  it("sem receita pede a primeira receita, sem dividir por zero", () => {
    const out = html(<SummaryStrip resumo={{ receitas: 0, despesas: 0, saldo: 0 }} />);
    expect(out).toContain("Registre sua primeira receita.");
    expect(out).toContain("R$ 0,00");
  });

  it("saldo negativo aparece com sinal", () => {
    const out = html(<SummaryStrip resumo={{ receitas: 10, despesas: 30, saldo: -20 }} />);
    expect(out).toMatch(/-R\$ 20,00|-\s?R\$ 20,00/);
  });

  it("tem nome acessivel para leitor de tela", () => {
    expect(html(<SummaryStrip resumo={resumo} />)).toContain('aria-label="Resumo financeiro"');
  });
});

describe("legibilidade (FF-0019)", () => {
  it("texto de apoio e rotulos com no minimo 14px (0.875rem)", () => {
    const out = html(<SummaryStrip resumo={{ receitas: 10, despesas: 5, saldo: 5 }} />);
    expect(out).not.toContain("text-[0.82rem]");
    expect(out).not.toContain("text-[0.85rem]");
    expect(out.match(/text-\[0\.875rem\]/g)?.length).toBeGreaterThanOrEqual(4);
  });
});
