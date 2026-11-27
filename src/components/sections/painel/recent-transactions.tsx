import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ultimas as textos } from "@/content/painel";
import type { Movimentacao } from "@/domain/account/types";
import { formatarComSinal, formatarData } from "@/lib/format";
import { cn } from "@/lib/utils";

const link =
  "inline-flex min-h-11 items-center rounded-base px-2 font-semibold underline underline-offset-2 hover:bg-hover";

// Receita e despesa se distinguem por sinal e bolinha, nao so pela cor (RF05).
const tipos = {
  receita: { marcador: "bg-receita", valor: "text-receita", nome: textos.receita },
  despesa: { marcador: "bg-despesa", valor: "text-despesa", nome: textos.despesa },
} as const;

/** As ultimas movimentacoes que ja aconteceram, com atalho para a lista completa. */
export function RecentTransactions({ movimentacoes }: { movimentacoes: readonly Movimentacao[] }) {
  return (
    <Card
      title={textos.titulo}
      action={
        <Link href="/lancamentos" className={link}>
          {textos.verTodas}
        </Link>
      }
    >
      {movimentacoes.length === 0 ? (
        <div>
          <p className="font-display font-bold tracking-[-0.01em]">{textos.vazio.titulo}</p>
          <p className="mt-1 text-muted">{textos.vazio.dica}</p>
          <Link
            href="/lancamentos"
            className="mt-4 inline-flex min-h-11 items-center rounded-base border border-primario bg-primario px-4 font-semibold text-primario-texto hover:border-musgo hover:bg-musgo hover:text-creme"
          >
            {textos.vazio.acao}
          </Link>
        </div>
      ) : (
        <ul>
          {movimentacoes.map((m) => {
            const tipo = tipos[m.tipo];
            return (
              <li
                key={m.id}
                className="flex items-center justify-between gap-3 border-b border-regua py-2.5 last:border-b-0"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", tipo.marcador)} />
                  <div className="min-w-0">
                    <strong className="block break-words font-semibold">{m.descricao}</strong>
                    <span className="text-[0.875rem] text-muted">
                      {m.categoria} · {formatarData(m.data)}
                    </span>
                  </div>
                </div>
                <span className={cn("numero flex-none font-semibold", tipo.valor)}>
                  <span className="sr-only">{tipo.nome}: </span>
                  {formatarComSinal(m.valor, m.tipo)}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
