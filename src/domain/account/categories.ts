import type { TipoMovimentacao } from "./types";

/** RN03: a lista de categorias depende do tipo. */
export const CATEGORIAS: Record<TipoMovimentacao, readonly string[]> = {
  receita: ["Salário", "Freelance", "Mesada", "Outros"],
  despesa: ["Alimentação", "Transporte", "Moradia", "Educação", "Lazer", "Saúde", "Outros"],
};

export function categoriasDoTipo(tipo: TipoMovimentacao): readonly string[] {
  return CATEGORIAS[tipo];
}

export function categoriaValida(tipo: TipoMovimentacao, categoria: string): boolean {
  return CATEGORIAS[tipo].includes(categoria);
}

/** Primeira categoria do tipo; usada ao trocar o tipo para nunca ficar com uma categoria invalida. */
export function categoriaPadrao(tipo: TipoMovimentacao): string {
  return CATEGORIAS[tipo][0];
}
