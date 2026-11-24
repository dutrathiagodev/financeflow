/** Datas como texto ISO "AAAA-MM-DD" (o que o <input type="date"> entrega e o storage guarda). */

function doisDigitos(n: number): string {
  return String(n).padStart(2, "0");
}

/** Data de hoje no fuso do aparelho. */
export function hoje(agora: Date = new Date()): string {
  return `${agora.getFullYear()}-${doisDigitos(agora.getMonth() + 1)}-${doisDigitos(agora.getDate())}`;
}

/** Confere formato e calendario (rejeita 2026-02-31). */
export function ehDataIso(texto: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(texto);
  if (!m) return false;
  const [ano, mes, dia] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  return data.getUTCFullYear() === ano && data.getUTCMonth() === mes - 1 && data.getUTCDate() === dia;
}

/** Mes de uma data, "AAAA-MM". */
export function mesDe(data: string): string {
  return data.slice(0, 7);
}
