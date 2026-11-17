import type { IconName } from "@/components/ui/icon";

/** Telas do app (uma rota por aba). */
export type PageId = "painel" | "lancamentos" | "planilha" | "cartoes" | "investimentos";

/** Ação principal de cada tela (RF26: uma ação principal por tela). */
export type PageAction = "nova-movimentacao" | "exportar";

export type NavItem = {
  id: PageId;
  href: "/" | "/lancamentos" | "/planilha" | "/cartoes" | "/investimentos";
  /** Rótulo no menu lateral. */
  label: string;
  /** Rótulo curto na barra inferior do celular. */
  shortLabel: string;
  icon: IconName;
};

export const navItems: ReadonlyArray<NavItem> = [
  { id: "painel", href: "/", label: "Painel", shortLabel: "Painel", icon: "layout-dashboard" },
  { id: "lancamentos", href: "/lancamentos", label: "Lançamentos", shortLabel: "Lançar", icon: "list-checks" },
  { id: "planilha", href: "/planilha", label: "Planilha do ano", shortLabel: "Planilha", icon: "table-2" },
  { id: "cartoes", href: "/cartoes", label: "Cartões", shortLabel: "Cartões", icon: "credit-card" },
  { id: "investimentos", href: "/investimentos", label: "Investimentos", shortLabel: "Investir", icon: "trending-up" },
];

export type PageInfo = {
  title: string;
  subtitle: string;
  action?: PageAction;
};

export const pages: Record<PageId, PageInfo> = {
  painel: { title: "Painel", subtitle: "Visão geral das suas finanças" },
  lancamentos: {
    title: "Lançamentos",
    subtitle: "Registre e acompanhe receitas e despesas",
    action: "nova-movimentacao",
  },
  planilha: {
    title: "Planilha do ano",
    subtitle: "Os 12 meses lado a lado, como na planilha",
    action: "exportar",
  },
  cartoes: { title: "Cartões", subtitle: "Faturas, limites e compras no cartão" },
  investimentos: { title: "Investimentos", subtitle: "Aportes, resgates e meta" },
};

export const layoutText = {
  brandFirst: "Finance",
  brandSecond: "Flow",
  brandTagline: "CONTROLE FINANCEIRO",
  skipToContent: "Pular para o conteúdo",
  mainNavLabel: "Menu principal",
  bottomNavLabel: "Navegação",
  storageNotice: "Seus dados ficam salvos só neste navegador.",
  restoreSample: "Restaurar dados de exemplo",
  actions: {
    "nova-movimentacao": { label: "Nova movimentação", shortLabel: "Nova", icon: "plus" },
    exportar: { label: "Exportar", shortLabel: "Exportar", icon: "download" },
  } satisfies Record<PageAction, { label: string; shortLabel: string; icon: IconName }>,
} as const;
