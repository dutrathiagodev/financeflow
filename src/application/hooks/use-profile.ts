"use client";

import { usePersistedState } from "./use-persisted-state";
import { DEFAULT_PROFILE, parseProfile, validateName } from "@/domain/preferences/profile";

export function useProfile() {
  const { value: profile, set } = usePersistedState("ff:profile", parseProfile, DEFAULT_PROFILE);

  return {
    profile,
    rename: (input: string) => {
      const result = validateName(input);
      if (result.ok) set({ name: result.value });
      return result;
    },
  };
}
