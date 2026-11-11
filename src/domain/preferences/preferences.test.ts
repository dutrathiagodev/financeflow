import { describe, expect, it } from "vitest";
import { parseFavorites, toggleFavorite } from "./favorites";
import { DEFAULT_PROFILE, parseBoolean, parseProfile, validateName } from "./profile";

describe("favorites", () => {
  it("alterna sem mutar a lista", () => {
    const list = ["bitcoin"];
    expect(toggleFavorite(list, "ethereum")).toEqual(["bitcoin", "ethereum"]);
    expect(toggleFavorite(list, "bitcoin")).toEqual([]);
    expect(list).toEqual(["bitcoin"]);
  });
  it("valida e remove duplicados", () => {
    expect(parseFavorites(["a", "a", 3, "", null, "b"])).toEqual(["a", "b"]);
    expect(parseFavorites("x")).toEqual([]);
  });
});

describe("profile", () => {
  it("usa o padrão para dados inválidos", () => {
    for (const raw of [null, 1, {}, { name: "  " }, { name: 5 }]) expect(parseProfile(raw)).toEqual(DEFAULT_PROFILE);
  });
  it("normaliza e limita o nome", () => {
    expect(parseProfile({ name: "  Ana " })).toEqual({ name: "Ana" });
    expect(parseProfile({ name: "x".repeat(50) }).name).toHaveLength(30);
  });
  it("valida o nome digitado", () => {
    expect(validateName("  Bia ")).toEqual({ ok: true, value: "Bia" });
    expect(validateName("   ")).toEqual({ ok: false, error: "empty-name" });
  });
  it("parseBoolean aceita só true", () => {
    expect(parseBoolean(true)).toBe(true);
    for (const raw of [false, "true", 1, null]) expect(parseBoolean(raw)).toBe(false);
  });
});
