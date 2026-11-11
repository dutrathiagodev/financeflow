import type { TrendRanking } from "@/domain/market/coin-queries";

export const trendsText = {
  title: "Tendências",
  description: "Maiores altas, quedas e volume das últimas 24 horas. Busque qualquer moeda do top 50.",
  searchLabel: "Filtrar moedas",
  searchPlaceholder: "Nome ou símbolo",
  tabsLabel: "Ranking",
  empty: "Nenhuma moeda encontrada.",
};

export const trendTabs: { id: TrendRanking; label: string }[] = [
  { id: "gainers", label: "Maiores altas" },
  { id: "losers", label: "Maiores quedas" },
  { id: "volume", label: "Maior volume" },
];
