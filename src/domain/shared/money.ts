// Dinheiro em reais com no maximo 2 casas. O arredondamento a centavos acontece so aqui,
// nunca na UI (clean-architecture.md, regras de qualidade).

/** Arredonda a centavos, sem o erro de ponto flutuante (1.005 -> 1.01). */
export function arredondar(valor: number): number {
  return Math.round((valor + Number.EPSILON) * 100) / 100;
}

/** Soma em centavos inteiros para nao acumular erro (0,1 + 0,2 = 0,3). */
export function somar(...valores: number[]): number {
  const centavos = valores.reduce((total, v) => total + Math.round(v * 100), 0);
  return centavos / 100;
}

/**
 * Le um valor digitado em pt-BR ("12,50", "1.234,56", "R$ 10") ou com ponto decimal ("12.5").
 * Devolve null quando nao e um numero.
 */
export function lerValor(texto: string): number | null {
  const limpo = texto.replace(/R\$|\s/g, "");
  if (limpo === "") return null;
  const normalizado = limpo.includes(",") ? limpo.replace(/\./g, "").replace(",", ".") : limpo;
  if (!/^-?\d+(\.\d+)?$/.test(normalizado)) return null;
  const numero = Number(normalizado);
  return Number.isFinite(numero) ? arredondar(numero) : null;
}
