"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { parseRaw, readRaw, subscribeToStore, writeValue } from "@/infrastructure/storage/local-store";
import type { Result } from "@/domain/result";

const noopSubscribe = () => () => {};

/**
 * Estado persistido no navegador e compartilhado entre componentes e abas.
 * `parse` valida o que vem do storage; `initial` é usado quando não há dado válido.
 * `ready` é false até a hidratação, evitando mostrar o estado inicial por engano.
 */
export function usePersistedState<T>(key: string, parse: (raw: unknown) => T, initial: T) {
  const raw = useSyncExternalStore(
    subscribeToStore,
    () => readRaw(key),
    () => null,
  );
  const ready = useSyncExternalStore(noopSubscribe, () => true, () => false);

  const value = useMemo(() => {
    const parsed = parseRaw(raw);
    return parsed === undefined ? initial : parse(parsed);
  }, [raw, parse, initial]);

  const set = useCallback((next: T) => writeValue(key, next), [key]);

  /** Aplica uma operação de domínio ao valor mais recente do storage e persiste se der certo. */
  const transact = useCallback(
    <E>(operation: (current: T) => Result<T, E>): Result<T, E> => {
      const parsed = parseRaw(readRaw(key));
      const current = parsed === undefined ? initial : parse(parsed);
      const result = operation(current);
      if (result.ok) writeValue(key, result.value);
      return result;
    },
    [key, parse, initial],
  );

  return { value, ready, set, transact };
}
