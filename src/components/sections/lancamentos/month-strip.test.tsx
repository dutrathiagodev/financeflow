import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import type { FaixaDoMes } from "@/domain/account/months";
import { MonthStrip } from "./month-strip";

const nada = () => {};
const exemplo: FaixaDoMes = {
  mes: "2026-11",
  saldoAnterior: 428.5,
  receitas: 300,
  despesas: 161.7,
  sobra: 138.3,
  saldoNoFim: 566.8,
};

const html = (faixa: FaixaDoMes = exemplo, noMesAtual = true) =>
  renderToStaticMarkup(
    <MonthStrip
      faixa={faixa}
      noMesAtual={noMesAtual}
      onAnterior={nada}
      onProximo={nada}
      onVoltarParaAtual={nada}
    />,
  ).replace(/ /g, " ");

describe("MonthStrip (RF15, RF17)", () => {
  it("mostra o mes por extenso", () => {
    expect(html()).toContain("Novembro de 2026");
  });

  it("mostra os cinco valores com o rotulo de cada um", () => {
    const texto = html();
    for (const rotulo of ["Saldo anterior", "Receitas do mês", "Despesas do mês", "Sobra do mês", "Saldo no fim do mês"]) {
      expect(texto).toContain(rotulo);
    }
    expect(texto).toContain("R$ 428,50");
    expect(texto).toContain("+ R$ 300,00");
    expect(texto).toContain("− R$ 161,70");
    expect(texto).toContain("R$ 138,30");
    expect(texto).toContain("R$ 566,80");
  });

  it("tem os botoes de mes anterior e proximo, com nome acessivel e 44 px", () => {
    const texto = html();
    expect(texto).toContain('aria-label="Mês anterior"');
    expect(texto).toContain('aria-label="Próximo mês"');
    expect(texto.match(/size-11/g)?.length).toBe(2);
  });

  it("o mes e anunciado por leitor de tela quando muda", () => {
    expect(html()).toMatch(/role="status"[^>]*>Novembro de 2026/);
  });

  it("so oferece voltar ao mes atual quando esta em outro mes", () => {
    expect(html(exemplo, true)).not.toContain("Voltar ao mês atual");
    expect(html(exemplo, false)).toContain("Voltar ao mês atual");
  });

  it("mes sem lancamentos mostra zeros, nao erro", () => {
    const vazio: FaixaDoMes = {
      mes: "2026-06",
      saldoAnterior: 0,
      receitas: 0,
      despesas: 0,
      sobra: 0,
      saldoNoFim: 0,
    };
    const texto = html(vazio);
    expect(texto).toContain("Junho de 2026");
    expect(texto).toContain("R$ 0,00");
  });

  it("sobra e saldo negativos ficam em vermelho e com sinal", () => {
    const negativo: FaixaDoMes = { ...exemplo, sobra: -40, saldoNoFim: -40, saldoAnterior: 0, receitas: 0, despesas: 40 };
    const texto = html(negativo);
    expect(texto).toMatch(/text-despesa[^>]*>[^<]*-\s?R\$|text-despesa[^>]*>[^<]*−\s?R\$/);
  });

  it("agrupa tudo numa regiao com nome", () => {
    expect(html()).toContain('aria-label="Faixa do mês"');
  });
});
