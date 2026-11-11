"use client";

import { usePersistedState } from "./use-persisted-state";
import { DEFAULT_PROFILE, parseProfile, validateName, type Profile } from "@/domain/preferences/profile";

export function useProfile() {
  const { value: profile, set } = usePersistedState("ff:profile", parseProfile, DEFAULT_PROFILE);

  return {
    profile,
    replace: (next: Profile) => set(next),
    rename: (input: string) => {
      const result = validateName(input);
      if (result.ok) set({ name: result.value });
      return result;
    },
  };
}
