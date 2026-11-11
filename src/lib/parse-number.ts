/** Converte texto digitado ("1.5" ou "1,5") em número. Entradas inválidas viram 0. */
export function parseDecimalInput(value: string): number {
  const parsed = Number(value.trim().replace(",", "."));
  return Number.isFinite(parsed) ? parsed : 0;
}
