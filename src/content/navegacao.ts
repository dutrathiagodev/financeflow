// Textos do menu, do cabecalho e do rodape. O tom segue o PRD secao 8.

export type ItemDeMenu = {
  id: "painel" | "lancamentos" | "planilha" | "cartoes" | "investimentos";
  rotulo: string;
  href: string;
};

/** As cinco telas do app, na ordem do menu (PRD secao 4). */
export const itensDoMenu: readonly ItemDeMenu[] = [
  { id: "painel", rotulo: "Painel", href: "/" },
  { id: "lancamentos", rotulo: "Lançamentos", href: "/lancamentos" },
  { id: "planilha", rotulo: "Planilha do ano", href: "/planilha" },
  { id: "cartoes", rotulo: "Cartões", href: "/cartoes" },
  { id: "investimentos", rotulo: "Investimentos", href: "/investimentos" },
];

export const navegacao = {
  menuLateral: "Menu principal",
  menuInferior: "Menu principal no celular",
  pularParaOConteudo: "Pular para o conteúdo",
} as const;

export const rodape = {
  aviso: "Seus dados ficam salvos só neste navegador.",
  restaurar: "Restaurar dados de exemplo",
} as const;
