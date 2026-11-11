import { describe, expect, it } from "vitest";
import { buy, createAccount, deposit, INITIAL_CASH, sell, withdraw } from "./operations";
import type { Account, AssetQuote } from "./types";

const meta = { id: "tx-1", time: 1_000 };
const btc: AssetQuote = { id: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "btc.png", price: 50_000 };

function unwrap(result: ReturnType<typeof buy>): Account {
  if (!result.ok) throw new Error(`esperava sucesso, veio ${result.error}`);
  return result.value;
}

describe("createAccount", () => {
  it("começa com saldo inicial, sem posições nem histórico", () => {
    expect(createAccount()).toEqual({ cash: INITIAL_CASH, holdings: [], transactions: [] });
  });
});

describe("deposit / withdraw", () => {
  it("deposita e registra a transação", () => {
    const account = unwrap(deposit(createAccount(), 500, meta));
    expect(account.cash).toBe(10_500);
    expect(account.transactions[0]).toMatchObject({ type: "deposit", usd: 500, id: "tx-1" });
  });

  it("rejeita valores inválidos", () => {
    for (const value of [0, -5, NaN, Infinity, 0.001]) {
      expect(deposit(createAccount(), value, meta)).toEqual({ ok: false, error: "invalid-amount" });
    }
  });

  it("saca até o saldo e rejeita acima dele", () => {
    const account = createAccount();
    expect(unwrap(withdraw(account, 10_000, meta)).cash).toBe(0);
    expect(withdraw(account, 10_000.01, meta)).toEqual({ ok: false, error: "insufficient-funds" });
  });

  it("evita erro de ponto flutuante no saldo", () => {
    let account = { ...createAccount(), cash: 0 };
    account = unwrap(deposit(account, 0.1, meta));
    account = unwrap(deposit(account, 0.2, meta));
    expect(account.cash).toBe(0.3);
  });

  it("não altera a conta original", () => {
    const account = createAccount();
    deposit(account, 100, meta);
    expect(account).toEqual(createAccount());
  });
});

describe("buy", () => {
  it("debita o caixa, cria posição e registra a compra", () => {
    const account = unwrap(buy(createAccount(), btc, 1_000, meta));
    expect(account.cash).toBe(9_000);
    expect(account.holdings).toEqual([
      { assetId: "bitcoin", symbol: "BTC", name: "Bitcoin", image: "btc.png", quantity: 0.02, cost: 1_000 },
    ]);
    expect(account.transactions[0]).toMatchObject({ type: "buy", usd: 1_000, quantity: 0.02, price: 50_000 });
  });

  it("acumula na posição existente", () => {
    let account = unwrap(buy(createAccount(), btc, 1_000, meta));
    account = unwrap(buy(account, { ...btc, price: 25_000 }, 1_000, { id: "tx-2", time: 2_000 }));
    expect(account.holdings).toHaveLength(1);
    expect(account.holdings[0]).toMatchObject({ quantity: 0.06, cost: 2_000 });
    expect(account.transactions.map((t) => t.id)).toEqual(["tx-2", "tx-1"]);
  });

  it("rejeita saldo insuficiente, valor inválido e preço inválido", () => {
    expect(buy(createAccount(), btc, 10_001, meta)).toEqual({ ok: false, error: "insufficient-funds" });
    expect(buy(createAccount(), btc, 0, meta)).toEqual({ ok: false, error: "invalid-amount" });
    expect(buy(createAccount(), { ...btc, price: 0 }, 100, meta)).toEqual({ ok: false, error: "invalid-price" });
  });

  it("rejeita compra tão pequena que resultaria em quantidade zero", () => {
    expect(buy(createAccount(), { ...btc, price: 1e12 }, 0.01, meta)).toEqual({ ok: false, error: "invalid-amount" });
  });
});

describe("sell", () => {
  const withBtc = () => unwrap(buy(createAccount(), btc, 1_000, meta));

  it("credita o caixa e reduz a posição mantendo o custo proporcional", () => {
    const account = unwrap(sell(withBtc(), { ...btc, price: 60_000 }, 0.01, { id: "tx-2", time: 2_000 }));
    expect(account.cash).toBe(9_600);
    expect(account.holdings[0]).toMatchObject({ quantity: 0.01, cost: 500 });
    expect(account.transactions[0]).toMatchObject({ type: "sell", usd: 600, quantity: 0.01 });
  });

  it("remove a posição ao vender tudo", () => {
    const account = unwrap(sell(withBtc(), btc, 0.02, { id: "tx-2", time: 2_000 }));
    expect(account.holdings).toEqual([]);
    expect(account.cash).toBe(10_000);
  });

  it("rejeita vender mais do que possui ou ativo sem posição", () => {
    expect(sell(withBtc(), btc, 0.03, meta)).toEqual({ ok: false, error: "insufficient-holding" });
    expect(sell(createAccount(), btc, 0.01, meta)).toEqual({ ok: false, error: "insufficient-holding" });
  });

  it("rejeita quantidade inválida", () => {
    expect(sell(withBtc(), btc, 0, meta)).toEqual({ ok: false, error: "invalid-amount" });
    expect(sell(withBtc(), btc, -1, meta)).toEqual({ ok: false, error: "invalid-amount" });
  });
});
