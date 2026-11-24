"use client";

import { useTransactions } from "@/application/hooks/use-transactions";
import { lancamentos } from "@/content/lancamentos";
import { MovementForm } from "./movement-form";
import { SummaryStrip } from "./summary-strip";

/** Tela Lancamentos. A lista de movimentacoes entra no card FF-0020. */
export function Lancamentos() {
  const { resumo, adicionar } = useTransactions();

  return (
    <div className="mx-auto max-w-[1360px] px-4 pb-14 pt-6 lg:px-8">
      <header className="mb-6">
        <h1 className="font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em]">
          {lancamentos.titulo}
        </h1>
        <p className="mt-0.5 text-[0.9rem] text-muted">{lancamentos.subtitulo}</p>
      </header>
      <SummaryStrip resumo={resumo} />
      <div className="mt-4 max-w-[330px]">
        <MovementForm
          onAdicionar={(rascunho) => {
            const resultado = adicionar(rascunho);
            return resultado.ok ? null : resultado.erro;
          }}
        />
      </div>
    </div>
  );
}
