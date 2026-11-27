"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  adicionarMovimentacao,
  excluirMovimentacao,
  posicaoDe,
  restaurarMovimentacao,
  type PosicaoOriginal,
} from "@/domain/account/operations";
import { resumir } from "@/domain/account/summary";
import type {
  ErrosDoFormulario,
  Movimentacao,
  RascunhoMovimentacao,
} from "@/domain/account/types";
import type { Result } from "@/domain/shared/result";
import { useToday } from "./use-today";

/** A ultima movimentacao excluida e onde ela estava, para o "Desfazer". */
type ExclusaoDesfazivel = { movimentacao: Movimentacao; posicao: PosicaoOriginal };

/**
 * Estado das movimentacoes. So orquestra: le o estado, chama a funcao pura do dominio e guarda
 * o resultado. A persistencia no localStorage entra no card FF-0038.
 * Quem usa e o TransactionsProvider, uma vez so, no layout: assim Painel e Lancamentos enxergam
 * a mesma lista ao trocar de tela.
 */
export function useTransactionsState() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  // So a ultima exclusao pode ser desfeita; ela vira definitiva quando o aviso some (RF04).
  const [excluida, setExcluida] = useState<ExclusaoDesfazivel | null>(null);

  const hojeLocal = useToday();

  // Totais derivados da lista inteira, nunca guardados nem filtrados (RN01).
  const resumo = useMemo(() => resumir(movimentacoes, hojeLocal), [movimentacoes, hojeLocal]);

  const adicionar = useCallback(
    (rascunho: RascunhoMovimentacao): Result<Movimentacao[], ErrosDoFormulario> => {
      const resultado = adicionarMovimentacao(movimentacoes, rascunho);
      if (resultado.ok) setMovimentacoes(resultado.valor);
      return resultado;
    },
    [movimentacoes],
  );

  const excluir = useCallback(
    (id: string) => {
      const posicao = posicaoDe(movimentacoes, id);
      if (!posicao) return;
      setExcluida({ movimentacao: movimentacoes[posicao.indice], posicao });
      setMovimentacoes(excluirMovimentacao(movimentacoes, id));
    },
    [movimentacoes],
  );

  const desfazerExclusao = useCallback(() => {
    if (!excluida) return;
    setMovimentacoes((lista) => restaurarMovimentacao(lista, excluida.movimentacao, excluida.posicao));
    setExcluida(null);
  }, [excluida]);

  /** A exclusao fica definitiva: nao ha mais o que desfazer. */
  const confirmarExclusao = useCallback(() => setExcluida(null), []);

  return {
    movimentacoes,
    resumo,
    hoje: hojeLocal,
    adicionar,
    excluir,
    /** Id da movimentacao que o "Desfazer" devolveria; null quando nao ha o que desfazer. */
    exclusaoPendente: excluida?.movimentacao.id ?? null,
    desfazerExclusao,
    confirmarExclusao,
  };
}

export type TransactionsApi = ReturnType<typeof useTransactionsState>;

export const TransactionsContext = createContext<TransactionsApi | null>(null);

/** As movimentacoes compartilhadas entre as telas. Precisa estar dentro do TransactionsProvider. */
export function useTransactions(): TransactionsApi {
  const api = useContext(TransactionsContext);
  if (!api) throw new Error("useTransactions precisa estar dentro do TransactionsProvider.");
  return api;
}
