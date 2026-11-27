import { CATEGORIAS, categoriasDoTipo } from "./categories";
import { mesDe } from "../shared/dates";
import type { FormaDePagamento, Movimentacao, TipoMovimentacao } from "./types";

/** Valor "nao filtrar" de cada filtro. */
export const TODOS = "todos";

export type Filtros = {
  /** Obrigatorio (Req. 7). */
  tipo: typeof TODOS | TipoMovimentacao;
  /** Obrigatorio (Req. 7). "todos" ou o nome de uma categoria. */
  categoria: string;
  /** Extra (RF11). */
  pagamento: typeof TODOS | FormaDePagamento;
  /** Extra (RF19). "todos" ou "AAAA-MM". */
  mes: string;
};

/** Padrao: tudo aparece, inclusive todos os meses (RF19). */
export const FILTROS_PADRAO: Filtros = {
  tipo: TODOS,
  categoria: TODOS,
  pagamento: TODOS,
  mes: TODOS,
};

/** Sem o campo, a movimentacao foi paga a vista (ver Movimentacao.pagamento). */
function pagamentoDe(m: Movimentacao): FormaDePagamento {
  return m.pagamento ?? "avista";
}

/**
 * RF06, RF11 e RF19: aplica os filtros com filter(), mantendo a ordem recebida.
 * Funcao pura. So afeta a lista exibida: os totais do topo sempre usam a lista inteira (RN01).
 */
export function filtrarMovimentacoes(
  lista: readonly Movimentacao[],
  filtros: Filtros,
): Movimentacao[] {
  return lista.filter(
    (m) =>
      (filtros.tipo === TODOS || m.tipo === filtros.tipo) &&
      (filtros.categoria === TODOS || m.categoria === filtros.categoria) &&
      (filtros.pagamento === TODOS || pagamentoDe(m) === filtros.pagamento) &&
      (filtros.mes === TODOS || mesDe(m.data) === filtros.mes),
  );
}

/**
 * A lista de categorias do filtro acompanha o tipo escolhido (RN03). Em "Todos" mostra as de
 * receita e as de despesa, sem repetir nomes iguais (ex.: "Outros").
 */
export function categoriasDoFiltro(tipo: Filtros["tipo"]): readonly string[] {
  if (tipo !== TODOS) return categoriasDoTipo(tipo);
  return [...new Set([...CATEGORIAS.receita, ...CATEGORIAS.despesa])];
}

/** Troca o tipo e limpa a categoria se ela nao existir no tipo novo. */
export function alterarTipoDoFiltro(filtros: Filtros, tipo: Filtros["tipo"]): Filtros {
  const categoriaServe = filtros.categoria === TODOS || categoriasDoFiltro(tipo).includes(filtros.categoria);
  return { ...filtros, tipo, categoria: categoriaServe ? filtros.categoria : TODOS };
}

/** Meses que tem movimentacao agora ("AAAA-MM"), do mais recente para o mais antigo. */
export function mesesDisponiveis(lista: readonly Movimentacao[]): string[] {
  return [...new Set(lista.map((m) => mesDe(m.data)))].sort().reverse();
}

/**
 * Se o mes escolhido deixou de existir (a ultima movimentacao dele foi excluida), volta para
 * "todos os meses". Devolve o mesmo objeto quando nada muda, para quem guarda o estado poder
 * comparar por referencia.
 */
export function normalizarFiltros(filtros: Filtros, lista: readonly Movimentacao[]): Filtros {
  if (filtros.mes === TODOS || mesesDisponiveis(lista).includes(filtros.mes)) return filtros;
  return { ...filtros, mes: TODOS };
}

/** Ha algum filtro diferente do padrao? */
export function haFiltroAtivo(filtros: Filtros): boolean {
  return (
    filtros.tipo !== TODOS ||
    filtros.categoria !== TODOS ||
    filtros.pagamento !== TODOS ||
    filtros.mes !== TODOS
  );
}
