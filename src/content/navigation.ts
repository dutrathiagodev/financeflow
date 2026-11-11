import type { NavGroup } from "@/types/navigation";

export const brand = {
  logo: "/images/financeflow-logo.png",
  logoAlt: "FinanceFlow — Controle financeiro",
};

export const welcome = {
  greeting: "Bem-vindo",
  lastLogin: "Seus dados ficam salvos neste navegador",
};

export const navGroups: NavGroup[] = [
  {
    title: "Visão geral",
    items: [{ label: "Dashboard", href: "/", icon: "dashboard" }],
  },
  {
    title: "Conta",
    items: [
      { label: "Portfólio", href: "/portfolio", icon: "portfolio" },
      { label: "Carteira", href: "/wallet", icon: "wallet" },
      { label: "Favoritos", href: "/watchlist", icon: "watchlist" },
    ],
  },
  {
    title: "Atividade",
    items: [
      { label: "Negociar", href: "/trade", icon: "trade" },
      { label: "Transações", href: "/transactions", icon: "transactions" },
    ],
  },
  {
    title: "Mais",
    items: [
      { label: "Insights", href: "/insights", icon: "insights" },
      {
        label: "Análises",
        href: "/analytics",
        icon: "analytics",
        badge: { kind: "tag", label: "Beta" },
      },
      { label: "Tendências", href: "/trends", icon: "trends" },
    ],
  },
  {
    title: "Suporte",
    items: [
      { label: "Ajuda", href: "/support", icon: "support" },
      { label: "Configurações", href: "/settings", icon: "settings" },
    ],
  },
];

export const sidebarText = {
  collapse: "Recolher menu",
  expand: "Expandir menu",
  mainNav: "Principal",
};

export const searchText = {
  placeholder: "Buscar moedas...",
  label: "Buscar moedas",
  home: "Visão geral",
};
