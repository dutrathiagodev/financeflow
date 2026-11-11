const CHANGE_EVENT = "financeflow:store";

/** Lê o texto bruto salvo. Retorna null se ausente ou se o storage estiver indisponível. */
export function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

/** Converte o texto bruto em dado desconhecido; JSON inválido vira undefined. */
export function parseRaw(raw: string | null): unknown {
  if (raw === null) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function writeValue(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage cheio ou bloqueado: a UI continua funcionando sem persistir.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function subscribeToStore(callback: () => void): () => void {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
