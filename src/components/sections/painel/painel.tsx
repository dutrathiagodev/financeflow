"use client";

import { useMemo } from "react";
import { useMonthStrip } from "@/application/hooks/use-month-strip";
import { useTransactions } from "@/application/hooks/use-transactions";
import { gastosPorCategoria, ultimasMovimentacoes } from "@/domain/account/spending";
import { formatarMes } from "@/lib/format";
import { MonthStrip } from "../lancamentos/month-strip";
import { SummaryStrip } from "../lancamentos/summary-strip";
import { CardsSummary } from "./cards-summary";
import { CategorySpending } from "./category-spending";
import { RecentTransactions } from "./recent-transactions";

/** Quantas movimentacoes aparecem em "Ultimas movimentacoes". */
const QUANTIDADE_RECENTES = 6;

/**
 * Tela Painel: saldo do periodo, demonstrativo do mes, para onde foi o dinheiro e o que
 * aconteceu por ultimo. So le a lista inteira e compoe; as contas estao no domain.
 */
export function Painel() {
  const { movimentacoes, resumo, hoje } = useTransactions();
  const faixaMes = useMonthStrip(movimentacoes, hoje);
  const mes = faixaMes.faixa?.mes ?? null;

  const gastos = useMemo(() => (mes ? gastosPorCategoria(movimentacoes, mes) : []), [movimentacoes, mes]);
  const recentes = useMemo(
    () => (hoje ? ultimasMovimentacoes(movimentacoes, hoje, QUANTIDADE_RECENTES) : []),
    [movimentacoes, hoje],
  );

  return (
    <div className="mx-auto max-w-[1360px] px-4 pb-28 pt-6 lg:px-8 lg:pb-14">
      <SummaryStrip resumo={resumo} />
      {faixaMes.faixa ? (
        <MonthStrip
          faixa={faixaMes.faixa}
          noMesAtual={faixaMes.noMesAtual}
          onAnterior={faixaMes.anterior}
          onProximo={faixaMes.proximo}
          onVoltarParaAtual={faixaMes.voltarParaAtual}
        />
      ) : null}
      <div className="mt-4 grid items-start gap-4 lg:grid-cols-2">
        <CategorySpending gastos={gastos} mes={mes ? formatarMes(mes) : ""} />
        <RecentTransactions movimentacoes={recentes} />
        <CardsSummary />
      </div>
    </div>
  );
}
