"use client";

import { usePathname } from "next/navigation";
import { itensDoMenu, navegacao } from "@/content/navegacao";
import { NavLinks } from "./nav-links";

/** Menu lateral (computador, a partir de 1024px). Client so para ler a rota aberta. */
export function SideNav() {
  const caminho = usePathname();
  return (
    <nav aria-label={navegacao.menuLateral}>
      <NavLinks itens={itensDoMenu} caminho={caminho} variante="lateral" />
    </nav>
  );
}

/** Barra inferior (celular, abaixo de 1024px), fixa na zona do polegar. */
export function BottomNav() {
  const caminho = usePathname();
  return (
    <nav
      aria-label={navegacao.menuInferior}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-regua-forte bg-painel px-1 pb-[calc(6px+env(safe-area-inset-bottom))] pt-1 lg:hidden"
    >
      <NavLinks itens={itensDoMenu} caminho={caminho} variante="inferior" />
    </nav>
  );
}
