import type { HistoryRange } from "@/domain/market/history";

export const analyticsText = {
  title: "Análises",
  description: "Histórico de preço de qualquer moeda do top 50. Passe o mouse no gráfico para ver cada ponto.",
  coin: "Moeda",
  rangeLabel: "Período",
  loading: "Carregando histórico...",
  error: "Não foi possível carregar o histórico agora. Tente de novo em instantes.",
  stats: { start: "Início do período", end: "Preço atual", high: "Máxima", low: "Mínima" },
};

export const ranges: { id: string; days: HistoryRange; label: string }[] = [
  { id: "1", days: 1, label: "24h" },
  { id: "7", days: 7, label: "7d" },
  { id: "30", days: 30, label: "30d" },
  { id: "90", days: 90, label: "90d" },
  { id: "365", days: 365, label: "1a" },
];
