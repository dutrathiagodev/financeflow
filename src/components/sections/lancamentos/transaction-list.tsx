import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { lista as textos } from "@/content/lancamentos";
import type { Movimentacao } from "@/domain/account/types";
import { TransactionItem } from "./transaction-item";

type TransactionListProps = {
  /** O que aparece agora (ja filtrado), na ordem certa: da mais recente para a mais antiga. */
  movimentacoes: readonly Movimentacao[];
  /** Quantas movimentacoes existem ao todo, com ou sem filtro. */
  total: number;
  hoje: string;
  onExcluir: (id: string) => void;
  /** Controles de filtro, mostrados so quando ha movimentacoes. */
  filtros?: ReactNode;
  /** Ha algum filtro escolhido: mostra o botao "Limpar filtros" tambem quando ha resultados. */
  filtrosAtivos?: boolean;
  /** Chamado pelos botoes "Limpar filtros" (com resultados e no estado sem resultado). */
  onLimparFiltros: () => void;
};

function EstadoVazio({ titulo, dica, children }: { titulo: string; dica: string; children?: ReactNode }) {
  return (
    <div className="py-6 text-center">
      <p className="font-display text-[1.05rem] font-bold tracking-[-0.01em]">{titulo}</p>
      <p className="mt-1 text-muted">{dica}</p>
      {children}
    </div>
  );
}

/**
 * Lista de movimentacoes (RF03). Mostra tudo, de todos os meses, ate a pessoa filtrar.
 * Tres estados: sem nenhuma movimentacao, filtros sem resultado e lista normal.
 */
export function TransactionList({
  movimentacoes,
  total,
  hoje,
  onExcluir,
  filtros,
  filtrosAtivos = false,
  onLimparFiltros,
}: TransactionListProps) {
  return (
    <Card
      title={textos.titulo}
      // "3 de 12": anunciado pelo leitor de tela sempre que os filtros mudam.
      action={total > 0 ? <span role="status">{textos.contagem(movimentacoes.length, total)}</span> : null}
      aria-label={textos.rotulo}
      className="min-w-0"
    >
      {total === 0 ? (
        <EstadoVazio titulo={textos.vazio.titulo} dica={textos.vazio.dica} />
      ) : (
        <>
          {filtros}
          {filtrosAtivos && movimentacoes.length > 0 ? (
            <div className="mb-3 flex justify-end">
              <Button variant="outline" onClick={onLimparFiltros}>
                {textos.semResultado.limpar}
              </Button>
            </div>
          ) : null}
          {movimentacoes.length === 0 ? (
            <EstadoVazio titulo={textos.semResultado.titulo} dica={textos.semResultado.dica}>
              <Button variant="outline" className="mt-4" onClick={onLimparFiltros}>
                {textos.semResultado.limpar}
              </Button>
            </EstadoVazio>
          ) : (
            <>
              {/* Cabecalho so no computador; cada linha ja se explica sozinha para o leitor de tela. */}
              <div
                aria-hidden="true"
                className="hidden grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_88px_minmax(0,1fr)_minmax(0,1.1fr)_44px] gap-x-4 border-b-2 border-tinta px-1 pb-2 text-[0.82rem] font-semibold text-muted lg:grid"
              >
                <span>{textos.colunas.descricao}</span>
                <span>{textos.colunas.categoria}</span>
                <span>{textos.colunas.data}</span>
                <span>{textos.colunas.pagamento}</span>
                <span className="text-right">{textos.colunas.valor}</span>
                <span />
              </div>
              <ul>
                {movimentacoes.map((m) => (
                  <TransactionItem key={m.id} movimentacao={m} hoje={hoje} onExcluir={onExcluir} />
                ))}
              </ul>
            </>
          )}
        </>
      )}
    </Card>
  );
}
