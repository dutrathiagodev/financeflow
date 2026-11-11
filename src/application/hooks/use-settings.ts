"use client";

import { usePersistedState } from "./use-persisted-state";
import { DEFAULT_SETTINGS, parseSettings, type Settings } from "@/domain/preferences/settings";

export function useSettings() {
  const { value: settings, set, transact } = usePersistedState("ff:settings", parseSettings, DEFAULT_SETTINGS);

  return {
    settings,
    /** Altera só os campos informados, partindo do valor mais recente do storage. */
    update: (patch: Partial<Settings>) => transact((current) => ({ ok: true, value: { ...current, ...patch } })),
    replace: (next: Settings) => set(next),
  };
}
