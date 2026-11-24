import { Stat, StatStrip } from "@/components/ui/stat";
import { resumo as textos } from "@/content/lancamentos";
import { percentualGasto, type Resumo } from "@/domain/account/summary";
import { formatarReais } from "@/lib/format";

type SummaryStripProps = {
  /** Totais de TODA a lista: nunca dependem dos filtros (RN01). */
  resumo: Resumo;
};

/** Receitas, despesas e saldo no topo de Lancamentos (RF02). Recebe os numeros prontos. */
export function SummaryStrip({ resumo }: SummaryStripProps) {
  const gasto = percentualGasto(resumo);
  return (
    <StatStrip aria-label={textos.rotulo}>
      <Stat
        destaque
        label={textos.saldo}
        value={formatarReais(resumo.saldo)}
        support={gasto === null ? textos.semReceita : textos.gastou(gasto)}
      />
      <Stat label={textos.receitas} value={formatarReais(resumo.receitas)} tone="receita" />
      <Stat label={textos.despesas} value={formatarReais(resumo.despesas)} tone="despesa" />
    </StatStrip>
  );
}
