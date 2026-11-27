import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { GastoPorCategoria } from "@/domain/account/spending";
import type { Movimentacao } from "@/domain/account/types";
import { CardsSummary } from "./cards-summary";
import { CategorySpending } from "./category-spending";
import { RecentTransactions } from "./recent-transactions";

const limpo = (html: string) => html.replace(/ /g, " ");

const gastos: GastoPorCategoria[] = [
  { categoria: "Lazer", valor: 100, percentual: 56 },
  { categoria: "Transporte", valor: 80, percentual: 44 },
];

describe("CategorySpending (RF09)", () => {
  const html = limpo(renderToStaticMarkup(<CategorySpending gastos={gastos} mes="Novembro de 2026" />));

  it("mostra cada categoria com valor e porcentagem em texto, nao so a barra", () => {
    expect(html).toContain("Lazer");
    expect(html).toContain("R$ 100,00");
    expect(html).toContain("56%");
    expect(html).toContain("Transporte");
    expect(html).toContain("R$ 80,00");
    expect(html).toContain("44%");
  });

  it("a maior categoria tem a barra cheia e as outras proporcionais", () => {
    expect(html).toContain("width:100%");
    expect(html).toContain("width:80%");
  });

  it("a barra e decorativa para leitor de tela e a lista tem nome", () => {
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('aria-label="Gastos por categoria em Novembro de 2026"');
  });

  it("os percentuais mostrados somam 100", () => {
    const mostrados = [...html.matchAll(/>(\d+)%</g)].map((r) => Number(r[1]));
    expect(mostrados.reduce((a, b) => a + b, 0)).toBe(100);
  });

  it("sem despesas mostra um estado vazio util, sem lista", () => {
    const vazio = limpo(renderToStaticMarkup(<CategorySpending gastos={[]} mes="Novembro de 2026" />));
    expect(vazio).toContain("Sem despesas neste mês.");
    expect(vazio).not.toContain("<ul");
  });

  it("o titulo e um h2", () => {
    expect(html).toMatch(/<h2[^>]*>Para onde vai o dinheiro/);
  });
});

const m = (extra: Partial<Movimentacao> & Pick<Movimentacao, "id">): Movimentacao => ({
  descricao: extra.id,
  valor: 10,
  tipo: "despesa",
  categoria: "Lazer",
  data: "2026-11-10",
  ...extra,
});

describe("RecentTransactions", () => {
  it("mostra descricao, categoria, data brasileira e valor com sinal", () => {
    const html = limpo(
      renderToStaticMarkup(
        <RecentTransactions
          movimentacoes={[
            m({ id: "Cinema", valor: 38, data: "2026-11-22" }),
            m({ id: "Mesada", tipo: "receita", categoria: "Mesada", valor: 300, data: "2026-11-05" }),
          ]}
        />,
      ),
    );
    expect(html).toContain("Cinema");
    expect(html).toContain("Lazer · 22/11/2026");
    expect(html).toContain("− R$ 38,00");
    expect(html).toContain("+ R$ 300,00");
    expect(html).toContain("Receita: ");
    expect(html).toContain("Despesa: ");
  });

  it("tem o atalho Ver todas para Lancamentos", () => {
    const html = renderToStaticMarkup(<RecentTransactions movimentacoes={[m({ id: "a" })]} />);
    expect(html).toMatch(/href="\/lancamentos"[^>]*>Ver todas/);
  });

  it("sem movimentacoes explica e leva para Lancamentos", () => {
    const html = renderToStaticMarkup(<RecentTransactions movimentacoes={[]} />);
    expect(html).toContain("Nenhuma movimentação ainda.");
    expect(html).toContain("Ir para Lançamentos");
    expect(html).not.toContain("<ul");
  });

  it("alvos de toque de pelo menos 44 px", () => {
    const html = renderToStaticMarkup(<RecentTransactions movimentacoes={[]} />);
    expect(html.match(/min-h-11/g)?.length).toBe(2);
  });
});

describe("CardsSummary", () => {
  const html = renderToStaticMarkup(<CardsSummary />);

  it("sem cartoes cadastrados mostra o estado vazio, sem numeros inventados", () => {
    expect(html).toContain("Nenhum cartão cadastrado.");
    expect(html).not.toMatch(/R\$/);
  });

  it("leva para a tela de Cartoes", () => {
    expect(html).toMatch(/href="\/cartoes"[^>]*>Gerenciar/);
  });
});
