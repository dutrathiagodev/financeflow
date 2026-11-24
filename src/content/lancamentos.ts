// Todo texto da tela Lancamentos. O tom segue o PRD secao 8: diz o que fazer, sem culpar.

export const lancamentos = {
  titulo: "Lançamentos",
  subtitulo: "Registre e acompanhe receitas e despesas",
} as const;

export const resumo = {
  rotulo: "Resumo financeiro",
  saldo: "Saldo disponível · todo o período",
  receitas: "Receitas",
  despesas: "Despesas",
  semReceita: "Registre sua primeira receita.",
  gastou: (percentual: number) => `Você gastou ${percentual}% do que recebeu.`,
} as const;

export const formulario = {
  titulo: "Nova movimentação",
  /** Botao flutuante no celular. */
  abrirNoCelular: "Nova",
  fechar: "Fechar",
  tipoLegenda: "Tipo da movimentação",
  receita: "Receita",
  despesa: "Despesa",
  descricao: "Descrição",
  descricaoExemplo: "Ex.: Almoço no refeitório",
  valor: "Valor (R$)",
  valorExemplo: "0,00",
  data: "Data",
  categoria: "Categoria",
  enviar: "Adicionar movimentação",
  sucesso: "Movimentação adicionada.",
} as const;

// Chaves = codigos de erro de src/domain/account/types.ts (CodigoDeErro). O formulario indexa este
// objeto com esse tipo, entao o TypeScript acusa se faltar uma mensagem.
export const errosDoFormulario = {
  "descricao-vazia": "Informe uma descrição, por exemplo \"Almoço\".",
  "valor-invalido": "Informe um valor maior que zero.",
  "categoria-invalida": "Escolha uma categoria da lista.",
  "data-ausente": "Escolha a data da movimentação.",
  "data-invalida": "Escolha uma data que exista no calendário.",
} as const;
