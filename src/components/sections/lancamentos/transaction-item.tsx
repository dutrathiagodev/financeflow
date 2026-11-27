import { IconButton } from "@/components/ui/icon-button";
import { Tag } from "@/components/ui/tag";
import { lista } from "@/content/lancamentos";
import { contaNosTotais } from "@/domain/account/summary";
import type { Movimentacao } from "@/domain/account/types";
import { formatarComSinal, formatarData } from "@/lib/format";
import { cn } from "@/lib/utils";

type TransactionItemProps = {
  movimentacao: Movimentacao;
  /** Hoje ("AAAA-MM-DD"); decide se a parcela ainda e "agendada". Vazio antes de montar. */
  hoje: string;
  /** Chamado com o id quando a pessoa toca na lixeira (RF04). */
  onExcluir: (id: string) => void;
};

// Receita e despesa nao dependem so da cor: sinal (+ / −) e bolinha tambem as diferenciam (RF05).
const tipos = {
  receita: { marcador: "bg-receita", valor: "text-receita", nome: lista.receita },
  despesa: { marcador: "bg-despesa", valor: "text-despesa", nome: lista.despesa },
} as const;

/**
 * Uma linha da lista (RF03). No computador: descricao, categoria, data, pagamento e valor em
 * colunas. No celular: descricao e valor em cima, e os detalhes numa linha de apoio embaixo.
 */
export function TransactionItem({ movimentacao: m, hoje, onExcluir }: TransactionItemProps) {
  const tipo = tipos[m.tipo];
  const agendada = hoje !== "" && !contaNosTotais(m, hoje);
  const pagamento = lista.pagamento[m.pagamento ?? "avista"];

  return (
    <li className="grid grid-cols-[minmax(0,1fr)_auto_44px] items-center gap-x-3 border-b border-regua px-1 py-1.5 text-[0.93rem] hover:bg-hover lg:grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_88px_minmax(0,1fr)_minmax(0,1.1fr)_44px] lg:gap-x-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <span aria-hidden="true" className={cn("size-2.5 flex-none rounded-full", tipo.marcador)} />
        <div className="flex min-w-0 flex-wrap items-center gap-x-2 gap-y-0.5">
          <strong className="min-w-0 break-words font-semibold">{m.descricao}</strong>
          {m.parcela ? <Tag>{lista.parcela(m.parcela.atual, m.parcela.total)}</Tag> : null}
          {agendada ? <Tag>{lista.agendada}</Tag> : null}
        </div>
      </div>

      <span className="hidden text-muted lg:block">{m.categoria}</span>
      <span className="numero hidden text-muted lg:block">{formatarData(m.data)}</span>
      <span className="hidden text-muted lg:block">{pagamento}</span>

      <span className={cn("numero text-right font-bold whitespace-nowrap", tipo.valor)}>
        <span className="sr-only">{tipo.nome}: </span>
        {formatarComSinal(m.valor, m.tipo)}
      </span>

      <IconButton
        aria-label={lista.excluir(m.descricao)}
        onClick={() => onExcluir(m.id)}
        className="border-transparent text-muted hover:text-despesa"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-[18px] fill-none stroke-current"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
          <path d="M3 6h18" />
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      </IconButton>

      {/* Celular: os detalhes que somem das colunas descem para uma linha de apoio. */}
      <p className="col-span-3 -mt-1.5 pb-1.5 pl-5 text-[0.8rem] text-muted lg:hidden">
        {m.categoria} · {formatarData(m.data)} · {pagamento}
      </p>
    </li>
  );
}
