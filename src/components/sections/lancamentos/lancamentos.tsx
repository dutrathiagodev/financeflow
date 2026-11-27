"use client";

import { useCallback, useState } from "react";
import { useTransactionFilters } from "@/application/hooks/use-transaction-filters";
import { useTransactions } from "@/application/hooks/use-transactions";
import { FloatingButton } from "@/components/ui/floating-button";
import { Notice } from "@/components/ui/notice";
import { Sheet } from "@/components/ui/sheet";
import { formulario, lista } from "@/content/lancamentos";
import { MovementForm } from "./movement-form";
import { SummaryStrip } from "./summary-strip";
import { TransactionFilters } from "./transaction-filters";
import { TransactionList } from "./transaction-list";

/** Tela Lancamentos: totais, formulario e lista de movimentacoes. */
export function Lancamentos() {
  const {
    movimentacoes,
    resumo,
    hoje,
    adicionar,
    excluir,
    exclusaoPendente,
    desfazerExclusao,
    confirmarExclusao,
  } = useTransactions();
  // Os filtros so mudam o que a lista mostra; o resumo do topo usa sempre a lista inteira (RN01).
  const filtragem = useTransactionFilters(movimentacoes);
  // Celular: o formulario abre em gaveta pelo botao "+ Nova". Computador: fica sempre na tela.
  const [gavetaAberta, setGavetaAberta] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const fecharGaveta = useCallback(() => setGavetaAberta(false), []);
  const fecharAviso = useCallback(() => setAviso(null), []);

  return (
    <div className="mx-auto max-w-[1360px] px-4 pb-36 pt-6 lg:px-8 lg:pb-14">
      <SummaryStrip resumo={resumo} />
      {/* Computador: formulario a esquerda e lista a direita. Celular: so a lista, formulario em gaveta. */}
      <div className="mt-4 lg:grid lg:grid-cols-[330px_minmax(0,1fr)] lg:items-start lg:gap-4">
        <Sheet
          aberto={gavetaAberta}
          onFechar={fecharGaveta}
          titulo={formulario.titulo}
          rotuloFechar={formulario.fechar}
          className="lg:sticky lg:top-[calc(var(--spacing-header)+1rem)]"
        >
          <MovementForm
            onAdicionar={(rascunho) => {
              const resultado = adicionar(rascunho);
              if (!resultado.ok) return resultado.erro;
              // Adicionar enquanto o aviso de exclusao esta aberto torna a exclusao definitiva.
              confirmarExclusao();
              setGavetaAberta(false);
              setAviso(formulario.sucesso);
              return null;
            }}
          />
        </Sheet>
        <TransactionList
          movimentacoes={filtragem.filtradas}
          total={movimentacoes.length}
          hoje={hoje}
          filtros={
            <TransactionFilters
              filtros={filtragem.filtros}
              categorias={filtragem.categorias}
              meses={filtragem.meses}
              onTipo={filtragem.alterarTipo}
              onCategoria={filtragem.alterarCategoria}
              onPagamento={filtragem.alterarPagamento}
              onMes={filtragem.alterarMes}
            />
          }
          onLimparFiltros={filtragem.limpar}
          onExcluir={(id) => {
            setAviso(null);
            excluir(id);
          }}
        />
      </div>
      <FloatingButton onClick={() => setGavetaAberta(true)}>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[18px] fill-none stroke-current" strokeWidth="1.9">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        {formulario.abrirNoCelular}
      </FloatingButton>
      {exclusaoPendente ? (
        // key: cada exclusao reinicia os 4,5 s, mesmo com o texto igual ao da anterior.
        <Notice
          key={exclusaoPendente}
          mensagem={lista.excluido}
          acaoTexto={lista.desfazer}
          onAcao={desfazerExclusao}
          onFechar={confirmarExclusao}
        />
      ) : aviso ? (
        <Notice mensagem={aviso} onFechar={fecharAviso} />
      ) : null}
    </div>
  );
}
