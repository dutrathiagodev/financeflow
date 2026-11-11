import { describe, expect, it } from "vitest";
import { MarketUnavailableError, type MarketRepository } from "@/application/ports/market-repository";
import type { MarketCoin } from "@/domain/market/types";
import { loadHistory, loadTopCoins } from "./use-cases";

const coin = { id: "bitcoin" } as MarketCoin;

function repo(overrides: Partial<MarketRepository> = {}): MarketRepository {
  return {
    listTopCoins: async () => [coin],
    getHistory: async () => [{ time: 1, price: 2 }],
    ...overrides,
  };
}

describe("loadTopCoins", () => {
  it("retorna as moedas", async () => {
    expect(await loadTopCoins(repo())).toEqual({ ok: true, value: [coin] });
  });
  it("converte falha e lista vazia em erro de domínio", async () => {
    const failing = repo({ listTopCoins: async () => { throw new MarketUnavailableError(); } });
    expect(await loadTopCoins(failing)).toEqual({ ok: false, error: "market-unavailable" });
    expect(await loadTopCoins(repo({ listTopCoins: async () => [] }))).toEqual({ ok: false, error: "market-unavailable" });
  });
});

describe("erros inesperados", () => {
  it("não são engolidos: bugs e sinais do framework propagam", async () => {
    const buggy = repo({ listTopCoins: async () => { throw new Error("bug"); } });
    await expect(loadTopCoins(buggy)).rejects.toThrow("bug");
  });
});

describe("loadHistory", () => {
  it("valida os parâmetros antes de chamar o repositório", async () => {
    let called = false;
    const spy = repo({ getHistory: async () => { called = true; return []; } });
    expect(await loadHistory(spy, "../x", 7)).toEqual({ ok: false, error: "invalid-request" });
    expect(await loadHistory(spy, "bitcoin", 3)).toEqual({ ok: false, error: "invalid-request" });
    expect(called).toBe(false);
  });
  it("retorna pontos ou erro de indisponibilidade", async () => {
    expect(await loadHistory(repo(), "bitcoin", 7)).toEqual({ ok: true, value: [{ time: 1, price: 2 }] });
    const failing = repo({ getHistory: async () => { throw new MarketUnavailableError(); } });
    expect(await loadHistory(failing, "bitcoin", 7)).toEqual({ ok: false, error: "market-unavailable" });
  });
});
