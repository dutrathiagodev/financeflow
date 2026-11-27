import Link from "next/link";
import { emBreve } from "@/content/paginas";

/** Conteudo provisorio das telas que ainda nao foram construidas (Painel, Planilha, Cartoes...). */
export function EmBreve() {
  return (
    <div className="mx-auto max-w-[1360px] px-4 pb-14 pt-6 lg:px-8">
      <div className="rounded-base border border-regua-forte bg-painel p-6">
        <p className="font-display text-[1.15rem] font-bold tracking-[-0.02em]">{emBreve.mensagem}</p>
        <p className="mt-1 text-muted">{emBreve.dica}</p>
        <Link
          href="/lancamentos"
          className="mt-4 inline-flex min-h-11 items-center rounded-base border border-primario bg-primario px-4 font-semibold text-primario-texto hover:border-musgo hover:bg-musgo hover:text-creme"
        >
          {emBreve.irParaLancamentos}
        </Link>
      </div>
    </div>
  );
}
