"use client";

import { useCallback, useState } from "react";
import { adicionarMovimentacao } from "@/domain/account/operations";
import type {
  ErrosDoFormulario,
  Movimentacao,
  RascunhoMovimentacao,
} from "@/domain/account/types";
import type { Result } from "@/domain/shared/result";

/**
 * Estado das movimentacoes. So orquestra: le o estado, chama a funcao pura do dominio e guarda
 * o resultado. A persistencia no localStorage entra no card FF-0038.
 */
export function useTransactions() {
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);

  const adicionar = useCallback(
    (rascunho: RascunhoMovimentacao): Result<Movimentacao[], ErrosDoFormulario> => {
      const resultado = adicionarMovimentacao(movimentacoes, rascunho);
      if (resultado.ok) setMovimentacoes(resultado.valor);
      return resultado;
    },
    [movimentacoes],
  );

  return { movimentacoes, adicionar };
}
