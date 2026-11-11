"use client";

import { useAccount } from "./use-account";
import { useAlerts } from "./use-alerts";
import { useFavorites } from "./use-favorites";
import { useProfile } from "./use-profile";
import { useSettings } from "./use-settings";
import { createBackup, parseBackup, type Backup } from "@/domain/backup";
import type { Result } from "@/domain/result";

/** Junta todos os dados locais para exportar e restaura a partir de um arquivo validado. */
export function useBackup() {
  const { account, replace: replaceAccount } = useAccount();
  const { ids, replace: replaceFavorites } = useFavorites();
  const { profile, replace: replaceProfile } = useProfile();
  const { settings, replace: replaceSettings } = useSettings();
  const { alerts, replace: replaceAlerts } = useAlerts();

  return {
    snapshot: (): Backup => createBackup({ profile, settings, favorites: ids, alerts, account }),
    restore: (raw: unknown): Result<Backup, "invalid-backup"> => {
      const result = parseBackup(raw);
      if (result.ok) {
        replaceAccount(result.value.account);
        replaceFavorites(result.value.favorites);
        replaceProfile(result.value.profile);
        replaceSettings(result.value.settings);
        replaceAlerts(result.value.alerts);
      }
      return result;
    },
  };
}
