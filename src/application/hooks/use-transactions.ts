"use client";

import { useCallback, useMemo, useState } from "react";
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
 */
export function useTransactions() {
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
