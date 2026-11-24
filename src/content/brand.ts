// Textos e dados da marca. Todo texto visivel fica em src/content (clean-architecture.md).

export const marca = {
  nome: "FinanceFlow",
  /** Parte do nome em cor mais viva (PRD secao 8: "Flow" mais vivo que "Finance"). */
  primeiraParte: "Finance",
  segundaParte: "Flow",
  slogan: "CONTROLE FINANCEIRO",
} as const;

export const site = {
  titulo: "FinanceFlow · Controle financeiro",
  /** Modelo de titulo das paginas internas: "Lançamentos · FinanceFlow". */
  modeloDeTitulo: "%s · FinanceFlow",
  descricao:
    "Controle financeiro pessoal: receitas, despesas, cartões e investimentos em um só lugar, com seus dados salvos só no seu navegador.",
  idioma: "pt-BR",
  nomeCurto: "FinanceFlow",
  /** Cores do navegador (barra do celular): fundo claro e escuro do design system. */
  corDoTemaClaro: "#e8ece1",
  corDoTemaEscuro: "#0d1410",
} as const;
