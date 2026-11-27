import { somar } from "../shared/money";
import { mesDaData, type Mes } from "./months";
import { ordenarPorData } from "./operations";
import { contaNosTotais } from "./summary";
import type { Movimentacao } from "./types";

export type GastoPorCategoria = {
  categoria: string;
  valor: number;
  /** Inteiro de 0 a 100. A soma de todas as categorias do mes e sempre 100. */
  percentual: number;
};

/**
 * RF09: para onde foi o dinheiro no mes. So despesas; a data define o mes (RN11), o que inclui
 * parcelas futuras no mes em que vencem (RN12). Da maior para a menor; empate em ordem alfabetica.
 *
 * Os percentuais sao inteiros e somam exatamente 100: cada categoria recebe a parte inteira e os
 * pontos que sobram vao para as maiores sobras decimais (maior resto). Assim a soma bate sempre,
 * sem arredondar tres categorias de 33,3% para 33 + 33 + 33.
 * Sem despesas no mes devolve lista vazia.
 */
export function gastosPorCategoria(
  movimentacoes: readonly Movimentacao[],
  mes: Mes,
): GastoPorCategoria[] {
  const totais = new Map<string, number>();
  for (const m of movimentacoes) {
    if (m.tipo !== "despesa" || mesDaData(m.data) !== mes) continue;
    totais.set(m.categoria, somar(totais.get(m.categoria) ?? 0, m.valor));
  }
  const total = somar(...totais.values());
  if (total <= 0) return [];

  const partes = [...totais.entries()].map(([categoria, valor]) => {
    const exato = (valor / total) * 100;
    return { categoria, valor, inteiro: Math.floor(exato), resto: exato - Math.floor(exato) };
  });
  let faltam = 100 - partes.reduce((soma, p) => soma + p.inteiro, 0);
  const porResto = [...partes].sort(
    (a, b) => b.resto - a.resto || b.valor - a.valor || a.categoria.localeCompare(b.categoria, "pt-BR"),
  );
  for (const p of porResto) {
    if (faltam <= 0) break;
    p.inteiro += 1;
    faltam -= 1;
  }

  return partes
    .sort((a, b) => b.valor - a.valor || a.categoria.localeCompare(b.categoria, "pt-BR"))
    .map((p) => ({ categoria: p.categoria, valor: p.valor, percentual: p.inteiro }));
}

/**
 * As ultimas movimentacoes que ja aconteceram, da mais recente para a mais antiga.
 * Parcela futura ainda nao aconteceu (RN12), entao fica de fora. Com a mesma data, a mais nova
 * (adicionada por ultimo) vem primeiro, como na lista de Lancamentos.
 */
export function ultimasMovimentacoes(
  movimentacoes: readonly Movimentacao[],
  hoje: string,
  quantidade: number,
): Movimentacao[] {
  return ordenarPorData(movimentacoes.filter((m) => contaNosTotais(m, hoje))).slice(0, quantidade);
}
