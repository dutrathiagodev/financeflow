/** Resultado de uma operacao que pode falhar por motivo esperado (em vez de lancar excecao). */
export type Result<T, E> = { ok: true; valor: T } | { ok: false; erro: E };

export function ok<T>(valor: T): Result<T, never> {
  return { ok: true, valor };
}

export function falha<E>(erro: E): Result<never, E> {
  return { ok: false, erro };
}
