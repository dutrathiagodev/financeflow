import type { NavGroup } from "@/types/navigation";

export const brand = {
  name: "FinanceFlow",
  tagline: "Investimentos com IA",
};

export const welcome = {
  greeting: "Bem-vindo",
  name: "de volta, Jason",
  lastLogin: "Último acesso: 15 jun 2025",
};

export const navGroups: NavGroup[] = [
  {
    title: "Visão geral",
    items: [{ label: "Dashboard", href: "/", icon: "dashboard", active: true }],
  },
  {
    title: "Conta",
    items: [
      { label: "Portfólio", href: "#", icon: "portfolio", badge: { kind: "dot" } },
      { label: "Carteira", href: "#", icon: "wallet" },
      { label: "Favoritos", href: "#", icon: "watchlist" },
    ],
  },
  {
    title: "Atividade",
    items: [
      { label: "Negociar", href: "#", icon: "trade" },
      { label: "Transações", href: "#", icon: "transactions" },
    ],
  },
  {
    title: "Mais",
    items: [
      { label: "Insights", href: "#", icon: "insights" },
      {
        label: "Análises",
        href: "#",
        icon: "analytics",
        badge: { kind: "tag", label: "Beta" },
      },
      { label: "Tendências", href: "#", icon: "trends" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { label: "Ajuda", href: "#", icon: "support", badge: { kind: "count", value: 2 } },
      { label: "Configurações", href: "#", icon: "settings" },
    ],
  },
];
