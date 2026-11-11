import { describe, expect, it } from "vitest";
import { parseAccount } from "./parse";
import { createAccount } from "./operations";

describe("parseAccount", () => {
  it("aceita uma conta válida", () => {
    const raw = {
      cash: 100,
      holdings: [{ assetId: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "", quantity: 1, cost: 10 }],
      transactions: [{ id: "a", type: "buy", time: 1, usd: 10, quantity: 1, price: 10, assetId: "bitcoin", symbol: "BTC" }],
    };
    expect(parseAccount(raw)).toMatchObject({ cash: 100 });
    expect(parseAccount(raw).holdings).toHaveLength(1);
    expect(parseAccount(raw).transactions[0]).toMatchObject({ id: "a", type: "buy" });
  });

  it("volta à conta inicial para lixo", () => {
    for (const raw of [null, undefined, 42, "x", [], {}, { cash: "10" }, { cash: -1 }, { cash: NaN }]) {
      expect(parseAccount(raw)).toEqual(createAccount());
    }
  });

  it("descarta posições e transações malformadas sem perder o resto", () => {
    const result = parseAccount({
      cash: 5,
      holdings: [{ assetId: "x" }, null, { assetId: "e", symbol: "E", name: "E", image: "", quantity: 2, cost: 4 }],
      transactions: [{ id: "a", type: "hack", time: 1, usd: 1 }, { id: "b", type: "deposit", time: 1, usd: 1 }],
    });
    expect(result.holdings.map((h) => h.assetId)).toEqual(["e"]);
    expect(result.transactions.map((t) => t.id)).toEqual(["b"]);
  });
});
