import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS, parseSettings } from "./settings";

describe("parseSettings", () => {
  it("usa o padrão para lixo", () => {
    for (const raw of [null, undefined, 3, "x", []]) expect(parseSettings(raw)).toEqual(DEFAULT_SETTINGS);
  });
  it("aceita valores válidos", () => {
    expect(parseSettings({ tickerAnimated: false, tableRows: 25, initialCash: 50_000 })).toEqual({
      tickerAnimated: false,
      tableRows: 25,
      initialCash: 50_000,
    });
  });
  it("corrige campo a campo, sem perder os válidos", () => {
    expect(parseSettings({ tickerAnimated: "sim", tableRows: 7, initialCash: 50_000 })).toEqual({
      ...DEFAULT_SETTINGS,
      initialCash: 50_000,
    });
  });
});
