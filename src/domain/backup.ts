import { parseAccount } from "@/domain/account/parse";
import type { Account } from "@/domain/account/types";
import { parseAlerts, type PriceAlert } from "@/domain/alerts/price-alert";
import { parseFavorites } from "@/domain/preferences/favorites";
import { parseProfile, type Profile } from "@/domain/preferences/profile";
import { parseSettings, type Settings } from "@/domain/preferences/settings";
import { err, ok, type Result } from "@/domain/result";

export const BACKUP_VERSION = 1;

export type Backup = {
  version: typeof BACKUP_VERSION;
  profile: Profile;
  settings: Settings;
  favorites: string[];
  alerts: PriceAlert[];
  account: Account;
};

export function createBackup(data: Omit<Backup, "version">): Backup {
  return { version: BACKUP_VERSION, ...data };
}

/** Valida um arquivo de backup. Cada parte é sanitizada; sem versão ou conta, o arquivo é recusado. */
export function parseBackup(raw: unknown): Result<Backup, "invalid-backup"> {
  if (typeof raw !== "object" || raw === null) return err("invalid-backup");
  const data = raw as Record<string, unknown>;
  if (data.version !== BACKUP_VERSION) return err("invalid-backup");
  if (typeof data.account !== "object" || data.account === null || Array.isArray(data.account)) return err("invalid-backup");

  return ok(
    createBackup({
      profile: parseProfile(data.profile),
      settings: parseSettings(data.settings),
      favorites: parseFavorites(data.favorites),
      alerts: parseAlerts(data.alerts),
      account: parseAccount(data.account),
    }),
  );
}
