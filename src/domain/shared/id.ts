/** Identificador unico de um registro. */
export function novoId(): string {
  return globalThis.crypto.randomUUID();
}
