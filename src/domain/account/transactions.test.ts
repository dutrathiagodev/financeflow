import { describe, expect, it } from "vitest";
import { filterTransactions } from "./transactions";
import type { Transaction } from "./types";

const make = (id: string, type: Transaction["type"]): Transaction => ({ id, type, time: 1, usd: 1 });
const list = [make("1", "buy"), make("2", "sell"), make("3", "deposit"), make("4", "withdraw")];

describe("filterTransactions", () => {
  it("devolve tudo com 'all'", () => {
    expect(filterTransactions(list, "all")).toHaveLength(4);
  });
  it("filtra compras e vendas", () => {
    expect(filterTransactions(list, "buy").map((t) => t.id)).toEqual(["1"]);
    expect(filterTransactions(list, "sell").map((t) => t.id)).toEqual(["2"]);
  });
  it("agrupa depósitos e saques em 'cash'", () => {
    expect(filterTransactions(list, "cash").map((t) => t.id)).toEqual(["3", "4"]);
  });
});
