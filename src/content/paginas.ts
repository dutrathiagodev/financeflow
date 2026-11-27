// Titulo e subtitulo de cada tela. O cabecalho mostra o unico h1 da pagina a partir daqui.

export type TextoDePagina = { titulo: string; subtitulo: string };

/** Chave = rota (mesmo href do menu em content/navegacao.ts). */
export const paginas: Record<string, TextoDePagina> = {
  "/": { titulo: "Painel", subtitulo: "Visão geral das suas finanças" },
  "/lancamentos": {
    titulo: "Lançamentos",
    subtitulo: "Registre e acompanhe receitas e despesas",
  },
  "/planilha": { titulo: "Planilha do ano", subtitulo: "Os 12 meses lado a lado, como na planilha" },
  "/cartoes": { titulo: "Cartões", subtitulo: "Faturas, limites e compras no cartão" },
  "/investimentos": { titulo: "Investimentos", subtitulo: "Aportes, resgates e meta" },
};

/** Usado quando a rota nao esta na lista (ex.: pagina de erro). */
export const paginaPadrao: TextoDePagina = { titulo: "FinanceFlow", subtitulo: "Controle financeiro" };

/** Tela ainda sem conteudo: so o aviso, sem inventar numeros. */
export const emBreve = {
  mensagem: "Esta tela ainda está sendo construída.",
  dica: "Enquanto isso, registre suas receitas e despesas em Lançamentos.",
  irParaLancamentos: "Ir para Lançamentos",
} as const;
