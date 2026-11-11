import { describe, expect, it } from "vitest";
import { addAlert, evaluateAlerts, isTriggered, MAX_ALERTS, parseAlerts, removeAlert, type PriceAlert } from "./price-alert";

const btc = { id: "bitcoin", symbol: "BTC", name: "Bitcoin" };
const meta = { id: "a1", time: 5 };

function unwrap(result: ReturnType<typeof addAlert>): PriceAlert[] {
  if (!result.ok) throw new Error(result.error);
  return result.value;
}

describe("addAlert", () => {
  it("cria o alerta no início da lista sem mutar a original", () => {
    const original: PriceAlert[] = [];
    const list = unwrap(addAlert(original, { asset: btc, direction: "above", target: 80_000 }, meta));
    expect(list).toEqual([
      { id: "a1", assetId: "bitcoin", symbol: "BTC", name: "Bitcoin", direction: "above", target: 80_000, createdAt: 5 },
    ]);
    expect(original).toEqual([]);
  });

  it("valida moeda e alvo", () => {
    expect(addAlert([], { asset: undefined, direction: "above", target: 1 }, meta)).toEqual({ ok: false, error: "missing-asset" });
    for (const target of [0, -1, NaN]) {
      expect(addAlert([], { asset: btc, direction: "above", target }, meta)).toEqual({ ok: false, error: "invalid-target" });
    }
  });

  it("rejeita duplicado exato mas aceita direção ou alvo diferente", () => {
    const list = unwrap(addAlert([], { asset: btc, direction: "above", target: 80_000 }, meta));
    expect(addAlert(list, { asset: btc, direction: "above", target: 80_000 }, meta)).toEqual({ ok: false, error: "duplicate" });
    expect(addAlert(list, { asset: btc, direction: "below", target: 80_000 }, { id: "a2", time: 6 }).ok).toBe(true);
    expect(addAlert(list, { asset: btc, direction: "above", target: 90_000 }, { id: "a3", time: 7 }).ok).toBe(true);
  });

  it("respeita o limite de alertas", () => {
    let list: PriceAlert[] = [];
    for (let i = 0; i < MAX_ALERTS; i++) {
      list = unwrap(addAlert(list, { asset: btc, direction: "above", target: 1 + i }, { id: `i${i}`, time: i }));
    }
    expect(addAlert(list, { asset: btc, direction: "above", target: 999 }, meta)).toEqual({ ok: false, error: "limit-reached" });
  });
});

describe("isTriggered / evaluateAlerts", () => {
  const above: PriceAlert = { id: "1", assetId: "bitcoin", symbol: "BTC", name: "Bitcoin", direction: "above", target: 100, createdAt: 1 };
  const below: PriceAlert = { ...above, id: "2", direction: "below" };

  it("dispara ao atingir ou passar o alvo", () => {
    expect(isTriggered(above, 100)).toBe(true);
    expect(isTriggered(above, 99.99)).toBe(false);
    expect(isTriggered(below, 100)).toBe(true);
    expect(isTriggered(below, 100.01)).toBe(false);
  });

  it("não dispara sem cotação conhecida", () => {
    const [status] = evaluateAlerts([above], () => undefined);
    expect(status).toEqual({ alert: above, price: undefined, triggered: false });
  });

  it("avalia cada alerta com o preço da sua moeda", () => {
    const statuses = evaluateAlerts([above, below], () => 150);
    expect(statuses.map((s) => s.triggered)).toEqual([true, false]);
  });
});

describe("removeAlert / parseAlerts", () => {
  it("remove por id", () => {
    const list = unwrap(addAlert([], { asset: btc, direction: "above", target: 1 }, meta));
    expect(removeAlert(list, "a1")).toEqual([]);
    expect(removeAlert(list, "x")).toHaveLength(1);
  });
  it("valida o que vem do storage", () => {
    const valid = { id: "a", assetId: "x", symbol: "X", name: "X", direction: "below", target: 2, createdAt: 1 };
    expect(parseAlerts([valid, { ...valid, direction: "up" }, { ...valid, target: -1 }, null, "x"])).toEqual([valid]);
    expect(parseAlerts({})).toEqual([]);
  });
});
