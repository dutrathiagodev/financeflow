// Todo texto da tela Painel. O tom segue o PRD secao 8: diz o que fazer, sem culpar.

export const gastos = {
  titulo: "Para onde vai o dinheiro",
  /** Rotulo acessivel da lista de categorias. */
  rotulo: (mes: string) => `Gastos por categoria em ${mes}`,
  vazio: {
    titulo: "Sem despesas neste mês.",
    dica: "Quando você registrar uma despesa, ela aparece aqui com o valor e a porcentagem.",
  },
  /** "38% do mês": parte da categoria no total de despesas do mes. */
  percentual: (valor: number) => `${valor}%`,
} as const;

export const ultimas = {
  titulo: "Últimas movimentações",
  verTodas: "Ver todas",
  receita: "Receita",
  despesa: "Despesa",
  vazio: {
    titulo: "Nenhuma movimentação ainda.",
    dica: "Registre sua primeira receita ou despesa para ela aparecer aqui.",
    acao: "Ir para Lançamentos",
  },
} as const;

export const cartoes = {
  titulo: "Cartões",
  gerenciar: "Gerenciar",
  vazio: {
    titulo: "Nenhum cartão cadastrado.",
    dica: "Os cartões e as faturas aparecem aqui quando você cadastrá-los.",
  },
} as const;
