import Link from "next/link";
import type { ItemDeMenu } from "@/content/navegacao";
import { rotaAtiva } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { NavIcon } from "./nav-icons";

type NavLinksProps = {
  itens: readonly ItemDeMenu[];
  /** Rota aberta agora; null quando ainda nao se sabe (nenhum item fica ativo). */
  caminho: string | null;
  /** lateral: lista vertical no computador. inferior: cinco colunas no celular. */
  variante: "lateral" | "inferior";
};

// Classes completas para o Tailwind enxergar cada uma.
const listas = {
  lateral: "grid gap-0.5",
  inferior: "grid grid-cols-5",
} as const;

const links = {
  lateral:
    "flex min-h-11 items-center gap-3 rounded-base px-3 text-[0.95rem] font-medium text-creme/70 hover:bg-creme/[0.07] hover:text-creme",
  inferior:
    "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-base px-1 text-center text-[0.72rem] font-semibold leading-tight text-muted hover:bg-hover",
} as const;

const ativos = {
  lateral: "bg-creme font-bold text-marca hover:bg-creme hover:text-marca",
  inferior: "bg-primario text-primario-texto hover:bg-primario",
} as const;

/** Links do menu. Item ativo: destaque visual + aria-current, nunca so a cor. Sem estado proprio. */
export function NavLinks({ itens, caminho, variante }: NavLinksProps) {
  return (
    <ul className={listas[variante]}>
      {itens.map((item) => {
        const ativo = rotaAtiva(item.href, caminho);
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              aria-current={ativo ? "page" : undefined}
              className={cn(links[variante], ativo && ativos[variante])}
            >
              <NavIcon id={item.id} />
              <span>{item.rotulo}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
