import type { ReactNode } from "react";
import type { ItemDeMenu } from "@/content/navegacao";

// Icones Lucide (os mesmos da plataforma exemplo), desenhados em 24x24 com traco.
const desenhos: Record<ItemDeMenu["id"], ReactNode> = {
  painel: (
    <>
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </>
  ),
  lancamentos: (
    <>
      <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <path d="m3 17 2 2 4-4" />
      <path d="m3 7 2 2 4-4" />
    </>
  ),
  planilha: (
    <>
      <path d="M3 9h18" />
      <path d="M9 3v18" />
      <rect x="3" y="3" width="18" height="18" rx="2" />
    </>
  ),
  cartoes: (
    <>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
      <path d="M6 14h2" />
    </>
  ),
  investimentos: (
    <>
      <path d="M16 7h6v6" />
      <path d="m22 7-8.5 8.5-5-5L2 17" />
    </>
  ),
};

/** Icone decorativo do menu: o nome acessivel vem sempre do texto ao lado. */
export function NavIcon({ id }: { id: ItemDeMenu["id"] }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="size-5 flex-none fill-none stroke-current"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {desenhos[id]}
    </svg>
  );
}
