"use client";

import { usePersistedState } from "./use-persisted-state";
import { parseFavorites, toggleFavorite } from "@/domain/preferences/favorites";

const EMPTY: string[] = [];

export function useFavorites() {
  const { value: ids, ready, set, transact } = usePersistedState("ff:favorites", parseFavorites, EMPTY);

  return {
    ids,
    ready,
    has: (id: string) => ids.includes(id),
    toggle: (id: string) => transact((current) => ({ ok: true, value: toggleFavorite(current, id) })),
    clear: () => set([]),
  };
}
