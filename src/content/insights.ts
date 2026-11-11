import type { Sentiment } from "@/domain/market/insights";

export const insightsText = {
  title: "Insights",
  description: "Leituras automáticas do mercado, calculadas com as cotações atuais do top 50.",
  topGainer: "Maior alta em 24h",
  topLoser: "Maior queda em 24h",
  topVolume: "Maior volume em 24h",
  weekLeader: "Líder da semana",
  dominance: "Dominância do Bitcoin",
  dominanceHint: "Parcela do Bitcoin no valor de mercado do top 50.",
  breadth: "Moedas em alta",
  breadthHint: (total: number) => `Do top ${total}, quantas sobem nas últimas 24h.`,
};

export const sentimentText: Record<Sentiment, string> = {
  positive: "O mercado está majoritariamente positivo hoje.",
  negative: "O mercado está majoritariamente negativo hoje.",
  neutral: "O mercado está dividido hoje.",
};
