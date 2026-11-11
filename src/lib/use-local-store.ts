"use client";

import { useCallback, useSyncExternalStore } from "react";

const EVENT = "financeflow:store";

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Estado persistido em localStorage e sincronizado entre componentes e abas. */
export function useLocalStore<T>(key: string, initial: T) {
  const getSnapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }, [key]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);

  let value = initial;
  if (raw !== null) {
    try {
      value = JSON.parse(raw) as T;
    } catch {
      value = initial;
    }
  }

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      let current = initial;
      try {
        const stored = window.localStorage.getItem(key);
        if (stored !== null) current = JSON.parse(stored) as T;
      } catch {}
      const resolved = typeof next === "function" ? (next as (prev: T) => T)(current) : next;
      try {
        window.localStorage.setItem(key, JSON.stringify(resolved));
      } catch {}
      window.dispatchEvent(new Event(EVENT));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [value, set] as const;
}
