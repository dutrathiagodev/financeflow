export const analyticsText = {
  title: "Análises",
  description: "Histórico de preço de qualquer moeda do top 50. Passe o mouse no gráfico para ver cada ponto.",
  coin: "Moeda",
  range: "Período",
  loading: "Carregando histórico...",
  error: "Não foi possível carregar o histórico agora. Tente de novo em instantes.",
  stats: { start: "Início do período", end: "Preço atual", high: "Máxima", low: "Mínima", change: "Variação" },
  unavailable: "Não foi possível carregar as cotações agora.",
};

export const ranges = [
  { days: 1, label: "24h" },
  { days: 7, label: "7d" },
  { days: 30, label: "30d" },
  { days: 90, label: "90d" },
  { days: 365, label: "1a" },
] as const;
