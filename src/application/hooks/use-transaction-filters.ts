"use client";

import { useCallback, useMemo, useState } from "react";
import {
  alterarTipoDoFiltro,
  categoriasDoFiltro,
  FILTROS_PADRAO,
  filtrarMovimentacoes,
  haFiltroAtivo,
  mesesDisponiveis,
  normalizarFiltros,
  type Filtros,
} from "@/domain/account/transactions";
import type { Movimentacao } from "@/domain/account/types";

/**
 * Filtros da lista de Lancamentos. Estado de tela, nao de negocio: so escolhe o que mostrar.
 * Os totais do topo nao passam por aqui e sempre usam a lista inteira (RN01).
 */
export function useTransactionFilters(movimentacoes: readonly Movimentacao[]) {
  const [escolhidos, setFiltros] = useState<Filtros>(FILTROS_PADRAO);

  // Se o mes escolhido ficou sem movimentacoes (a ultima foi excluida), o filtro volta para
  // "todos os meses". Ajustar durante a renderizacao evita um quadro com a lista errada e impede
  // que o mes volte a valer sozinho se alguem adicionar uma movimentacao nele depois.
  const filtros = normalizarFiltros(escolhidos, movimentacoes);
  if (filtros !== escolhidos) setFiltros(filtros);

  const filtradas = useMemo(() => filtrarMovimentacoes(movimentacoes, filtros), [movimentacoes, filtros]);
  const meses = useMemo(() => mesesDisponiveis(movimentacoes), [movimentacoes]);
  const categorias = useMemo(() => categoriasDoFiltro(filtros.tipo), [filtros.tipo]);

  const alterarTipo = useCallback(
    (tipo: Filtros["tipo"]) => setFiltros((atual) => alterarTipoDoFiltro(atual, tipo)),
    [],
  );
  const alterarCategoria = useCallback(
    (categoria: string) => setFiltros((atual) => ({ ...atual, categoria })),
    [],
  );
  const alterarPagamento = useCallback(
    (pagamento: Filtros["pagamento"]) => setFiltros((atual) => ({ ...atual, pagamento })),
    [],
  );
  const alterarMes = useCallback((mes: string) => setFiltros((atual) => ({ ...atual, mes })), []);
  const limpar = useCallback(() => setFiltros(FILTROS_PADRAO), []);

  return {
    filtros,
    filtradas,
    meses,
    categorias,
    ativo: haFiltroAtivo(filtros),
    alterarTipo,
    alterarCategoria,
    alterarPagamento,
    alterarMes,
    limpar,
  };
}
