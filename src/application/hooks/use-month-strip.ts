"use client";

import { useCallback, useMemo, useState } from "react";
import { deslocarMes, faixaDoMes, mesDaData, type FaixaDoMes, type Mes } from "@/domain/account/months";
import type { Movimentacao } from "@/domain/account/types";

/**
 * Faixa do mes (RF15, RF17). Estado de tela: qual mes a pessoa esta olhando. Comeca no mes de
 * hoje e anda de um em um. Os valores saem sempre da lista inteira, nunca da filtrada.
 *
 * `hoje` vem vazio antes de o navegador saber a data; ate la nao ha mes para mostrar.
 */
export function useMonthStrip(movimentacoes: readonly Movimentacao[], hoje: string) {
  const [escolhido, setEscolhido] = useState<Mes | null>(null);
  const mesAtual: Mes | null = hoje ? mesDaData(hoje) : null;
  const mes = escolhido ?? mesAtual;

  const faixa: FaixaDoMes | null = useMemo(
    () => (mes ? faixaDoMes(movimentacoes, mes) : null),
    [movimentacoes, mes],
  );

  const anterior = useCallback(() => {
    if (mes) setEscolhido(deslocarMes(mes, -1));
  }, [mes]);
  const proximo = useCallback(() => {
    if (mes) setEscolhido(deslocarMes(mes, 1));
  }, [mes]);
  const voltarParaAtual = useCallback(() => setEscolhido(null), []);

  return { faixa, anterior, proximo, voltarParaAtual, noMesAtual: mes === mesAtual };
}
