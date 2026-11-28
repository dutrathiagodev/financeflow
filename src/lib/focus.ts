/** Seletor dos elementos que recebem foco pelo teclado (o que o Tab visita). */
export const SELETOR_FOCAVEL = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/**
 * Prende o Tab dentro de um grupo (ex.: uma gaveta aberta).
 *
 * `indiceAtivo` e a posicao do elemento com foco na lista `total` de focaveis, ou -1 quando o
 * foco esta fora da lista (no proprio painel ou fora dele). Devolve o indice que deve receber o
 * foco, ou null quando o navegador pode seguir sozinho: o Tab normal no meio do grupo.
 */
export function proximoFoco(total: number, indiceAtivo: number, voltando: boolean): number | null {
  if (total === 0) return null;
  const primeiro = 0;
  const ultimo = total - 1;
  if (indiceAtivo === -1) return voltando ? ultimo : primeiro;
  if (voltando && indiceAtivo === primeiro) return ultimo;
  if (!voltando && indiceAtivo === ultimo) return primeiro;
  return null;
}
