"use client";

import { usePersistedState } from "./use-persisted-state";
import { parseBoolean } from "@/domain/preferences/profile";

export function useSidebarState() {
  const { value: collapsed, set } = usePersistedState("ff:sidebar-collapsed", parseBoolean, false);
  return { collapsed, toggle: () => set(!collapsed) };
}
