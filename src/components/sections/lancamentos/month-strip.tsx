import { Card } from "@/components/ui/card";
import { IconButton } from "@/components/ui/icon-button";
import { Statement, StatementLine } from "@/components/ui/statement";
import { faixaDoMes as textos } from "@/content/lancamentos";
import type { FaixaDoMes } from "@/domain/account/months";
import { formatarComSinal, formatarMes, formatarReais } from "@/lib/format";

type MonthStripProps = {
  faixa: FaixaDoMes;
  noMesAtual: boolean;
  onAnterior: () => void;
  onProximo: () => void;
  onVoltarParaAtual: () => void;
};

function Seta({ direcao }: { direcao: "esquerda" | "direita" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="2">
      <path d={direcao === "esquerda" ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} />
    </svg>
  );
}

/** Faixa do mes (RF15, RF17): navegacao entre meses e o demonstrativo do mes escolhido. */
export function MonthStrip({ faixa, noMesAtual, onAnterior, onProximo, onVoltarParaAtual }: MonthStripProps) {
  const tom = (valor: number) => (valor < 0 ? "despesa" : "neutro");
  // No computador as cinco linhas ficam lado a lado; no celular, empilhadas como um livro-caixa.
  const coluna = "lg:flex-col lg:items-start lg:gap-1 lg:border-0 lg:py-0";
  return (
    <Card
      aria-label={textos.rotulo}
      className="mt-4"
      title={
        <span className="flex items-center gap-2">
          <IconButton aria-label={textos.mesAnterior} onClick={onAnterior}>
            <Seta direcao="esquerda" />
          </IconButton>
          <span role="status" className="min-w-[10.5rem] text-center">
            {formatarMes(faixa.mes)}
          </span>
          <IconButton aria-label={textos.proximoMes} onClick={onProximo}>
            <Seta direcao="direita" />
          </IconButton>
        </span>
      }
      action={
        noMesAtual ? null : (
          <button
            type="button"
            onClick={onVoltarParaAtual}
            className="min-h-11 cursor-pointer rounded-base px-2 font-semibold underline underline-offset-2 hover:bg-hover"
          >
            {textos.mesAtual}
          </button>
        )
      }
    >
      <Statement className="lg:grid-cols-5 lg:gap-x-8">
        <StatementLine className={coluna} label={textos.saldoAnterior} value={formatarReais(faixa.saldoAnterior)} />
        <StatementLine
          className={coluna}
          label={textos.receitas}
          value={formatarComSinal(faixa.receitas, "receita")}
          tone="receita"
        />
        <StatementLine
          className={coluna}
          label={textos.despesas}
          value={formatarComSinal(faixa.despesas, "despesa")}
          tone="despesa"
        />
        <StatementLine
          className={coluna}
          kind="total"
          label={textos.sobra}
          value={formatarReais(faixa.sobra)}
          tone={tom(faixa.sobra)}
        />
        <StatementLine
          className={coluna}
          kind="final"
          label={textos.saldoNoFim}
          value={formatarReais(faixa.saldoNoFim)}
          tone={tom(faixa.saldoNoFim)}
        />
      </Statement>
    </Card>
  );
}
