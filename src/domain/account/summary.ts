import { arredondar, somar } from "../shared/money";
import type { Movimentacao } from "./types";

export type Resumo = {
  receitas: number;
  despesas: number;
  /** RN01: receitas - despesas. */
  saldo: number;
};

/**
 * RN12: parcela com data futura aparece na lista e na planilha, mas so entra nos totais
 * quando a data chega.
 */
export function contaNosTotais(movimentacao: Movimentacao, hoje: string): boolean {
  return !(movimentacao.parcela !== undefined && movimentacao.data > hoje);
}

/**
 * RF02: total de receitas, de despesas e saldo.
 * Recebe a lista inteira, nunca a filtrada: os totais do topo nao mudam com filtros (RN01).
 * Investimentos ficam em outra lista e nao entram aqui (RN07).
 */
export function resumir(movimentacoes: readonly Movimentacao[], hoje: string): Resumo {
  const validas = movimentacoes.filter((m) => contaNosTotais(m, hoje));
  const receitas = somar(...validas.filter((m) => m.tipo === "receita").map((m) => m.valor));
  const despesas = somar(...validas.filter((m) => m.tipo === "despesa").map((m) => m.valor));
  return { receitas, despesas, saldo: somar(receitas, -despesas) };
}

/** Quanto do que entrou ja foi gasto, de 0 a 100+. Null quando nao houve receita. */
export function percentualGasto(resumo: Resumo): number | null {
  if (resumo.receitas <= 0) return null;
  return Math.round(arredondar((resumo.despesas / resumo.receitas) * 100));
}
