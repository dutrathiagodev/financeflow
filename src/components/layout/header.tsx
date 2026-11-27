"use client";

import { usePathname } from "next/navigation";
import { paginaPadrao, paginas } from "@/content/paginas";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";

/**
 * Cabecalho fixo no topo. Mostra o unico h1 da pagina (titulo da rota aberta) e o botao de tema.
 * No celular entra o simbolo da marca, porque o menu lateral nao aparece.
 * Nao tem "Nova movimentacao" nem "Exportar": cada acao principal mora na sua tela (RF26).
 */
export function Header() {
  const caminho = usePathname();
  const pagina = (caminho && paginas[caminho]) || paginaPadrao;

  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-regua-forte bg-fundo px-4 py-3 lg:items-end lg:px-8 lg:pb-4 lg:pt-5">
      <Logo variante="auto" tamanho="sm" somenteSimbolo className="lg:hidden" />
      <div className="min-w-0 flex-1">
        <h1 className="truncate font-display text-[1.35rem] font-bold leading-[1.15] tracking-[-0.03em] lg:text-[1.9rem] lg:leading-[1.1]">
          {pagina.titulo}
        </h1>
        <p className="mt-0.5 hidden text-[0.9rem] text-muted lg:block">{pagina.subtitulo}</p>
      </div>
      <ThemeToggle />
    </header>
  );
}
