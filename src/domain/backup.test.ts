import { describe, expect, it } from "vitest";
import { createAccount } from "@/domain/account/operations";
import { createBackup, parseBackup } from "./backup";
import { DEFAULT_PROFILE } from "@/domain/preferences/profile";
import { DEFAULT_SETTINGS } from "@/domain/preferences/settings";

const backup = createBackup({
  profile: { name: "Ana" },
  settings: { ...DEFAULT_SETTINGS, tableRows: 25 },
  favorites: ["bitcoin"],
  alerts: [],
  account: { ...createAccount(), cash: 123 },
});

describe("parseBackup", () => {
  it("restaura o que foi exportado (ida e volta pelo JSON)", () => {
    const result = parseBackup(JSON.parse(JSON.stringify(backup)));
    expect(result).toEqual({ ok: true, value: backup });
  });

  it("recusa arquivos sem versão, sem conta ou que não são objeto", () => {
    for (const raw of [null, 1, "x", [], {}, { version: 2, account: {} }, { version: 1 }, { version: 1, account: [] }]) {
      expect(parseBackup(raw)).toEqual({ ok: false, error: "invalid-backup" });
    }
  });

  it("sanitiza partes inválidas em vez de recusar tudo", () => {
    const result = parseBackup({ version: 1, account: { cash: 50 }, profile: 5, settings: "x", favorites: [1], alerts: 3 });
    expect(result).toMatchObject({
      ok: true,
      value: { profile: DEFAULT_PROFILE, settings: DEFAULT_SETTINGS, favorites: [], alerts: [], account: { cash: 50 } },
    });
  });
});
