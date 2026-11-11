import type { TrendFilter } from "@/domain/market/coin-queries";

export const dashboardHeader = {
  sourceLabel: "Dados:",
  sourceValue: "CoinGecko · atualiza a cada minuto",
  title: "Cotações de cripto ao vivo",
};

export const marketFilters: { id: TrendFilter; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "gainers", label: "Ganhos" },
  { id: "losers", label: "Perdas" },
];

export const marketOverview = {
  eyebrow: "Atualizações ao vivo",
  title: "Visão do mercado",
  filterLabel: "Filtrar por desempenho em 24h",
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

export const priceCardText = {
  pair: (symbol: string) => `${symbol}/USD`,
  price: "Preço",
};
