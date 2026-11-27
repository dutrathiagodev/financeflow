import { Card } from "@/components/ui/card";
import { lista as textos } from "@/content/lancamentos";
import type { Movimentacao } from "@/domain/account/types";
import { TransactionItem } from "./transaction-item";

type TransactionListProps = {
  /** Ja na ordem certa: da mais recente para a mais antiga (domain/account/operations.ts). */
  movimentacoes: readonly Movimentacao[];
  hoje: string;
};

/** Lista de movimentacoes (RF03). Mostra tudo, de todos os meses; estado vazio com mensagem util. */
export function TransactionList({ movimentacoes, hoje }: TransactionListProps) {
  return (
    <Card title={textos.titulo} aria-label={textos.rotulo} className="min-w-0">
      {movimentacoes.length === 0 ? (
        <div className="py-6 text-center">
          <p className="font-display text-[1.05rem] font-bold tracking-[-0.01em]">{textos.vazio.titulo}</p>
          <p className="mt-1 text-muted">{textos.vazio.dica}</p>
        </div>
      ) : (
        <>
          {/* Cabecalho so no computador; cada linha ja se explica sozinha para o leitor de tela. */}
          <div
            aria-hidden="true"
            className="hidden grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_88px_minmax(0,1fr)_minmax(0,1.1fr)] gap-x-4 border-b-2 border-tinta px-1 pb-2 text-[0.82rem] font-semibold text-muted lg:grid"
          >
            <span>{textos.colunas.descricao}</span>
            <span>{textos.colunas.categoria}</span>
            <span>{textos.colunas.data}</span>
            <span>{textos.colunas.pagamento}</span>
            <span className="text-right">{textos.colunas.valor}</span>
          </div>
          <ul>
            {movimentacoes.map((m) => (
              <TransactionItem key={m.id} movimentacao={m} hoje={hoje} />
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
