export const dashboardHeader = {
  breadcrumb: ["Visão geral", "Dashboard"],
  searchPlaceholder: "Buscar...",
  lastUpdateLabel: "Dados:",
  lastUpdateValue: "CoinGecko · atualiza a cada minuto",
  title: "Cotações de cripto ao vivo",
};

export const marketFilters = [
  { id: "all", label: "Todos" },
  { id: "gainers", label: "Ganhos" },
  { id: "losers", label: "Perdas" },
] as const;

export const marketOverview = {
  eyebrow: "Atualizações ao vivo",
  title: "Visão do mercado",
  unavailable: "Não foi possível carregar as cotações agora. Tente novamente em instantes.",
  empty: "Nenhuma moeda neste filtro.",
  columns: {
    rank: "Nº",
    coin: "Moeda",
    price: "Preço",
    change7d: "7D%",
    change24h: "24H%",
    favorite: "Favorito",
  },
};
