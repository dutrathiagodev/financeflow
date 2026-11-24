"use client";

import { useCallback, useState } from "react";
import { useTransactions } from "@/application/hooks/use-transactions";
import { FloatingButton } from "@/components/ui/floating-button";
import { Notice } from "@/components/ui/notice";
import { Sheet } from "@/components/ui/sheet";
import { formulario, lancamentos } from "@/content/lancamentos";
import { MovementForm } from "./movement-form";
import { SummaryStrip } from "./summary-strip";

/** Tela Lancamentos. A lista de movimentacoes entra no card FF-0020. */
export function Lancamentos() {
  const { resumo, adicionar } = useTransactions();
  // Celular: o formulario abre em gaveta pelo botao "+ Nova". Computador: fica sempre na tela.
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const fecharGaveta = useCallback(() => setGavetaAberta(false), []);
  const fecharAviso = useCallback(() => setAviso(null), []);

  return (
    <div className="mx-auto max-w-[1360px] px-4 pb-36 pt-6 lg:px-8 lg:pb-14">
      <header className="mb-6">
        <h1 className="font-display text-[1.9rem] font-bold leading-[1.1] tracking-[-0.03em]">
          {lancamentos.titulo}
        </h1>
        <p className="mt-0.5 text-[0.9rem] text-muted">{lancamentos.subtitulo}</p>
      </header>
      <SummaryStrip resumo={resumo} />
      <Sheet
        aberto={gavetaAberta}
        onFechar={fecharGaveta}
        titulo={formulario.titulo}
        rotuloFechar={formulario.fechar}
        className="lg:mt-4 lg:max-w-[330px]"
      >
        <MovementForm
          onAdicionar={(rascunho) => {
            const resultado = adicionar(rascunho);
            if (!resultado.ok) return resultado.erro;
            setGavetaAberta(false);
            setAviso(formulario.sucesso);
            return null;
          }}
        />
      </Sheet>
      <FloatingButton onClick={() => setGavetaAberta(true)}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.9">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        {formulario.abrirNoCelular}
      </FloatingButton>
      {aviso ? <Notice mensagem={aviso} onFechar={fecharAviso} /> : null}
    </div>
  );
}
