import { isPositiveNumber } from "@/domain/money";
import { err, ok, type Result } from "@/domain/result";

export type AlertDirection = "above" | "below";

export type PriceAlert = {
  id: string;
  assetId: string;
  symbol: string;
  name: string;
  direction: AlertDirection;
  /** Preço-alvo em USD. */
  target: number;
  createdAt: number;
};

export type AlertError = "missing-asset" | "invalid-target" | "duplicate" | "limit-reached";

export type AlertStatus = {
  alert: PriceAlert;
  /** Preço atual; undefined se a moeda não está nas cotações carregadas. */
  price: number | undefined;
  triggered: boolean;
};

export const MAX_ALERTS = 20;

type NewAlertInput = {
  asset: { id: string; symbol: string; name: string } | undefined;
  direction: AlertDirection;
  target: number;
};

/** Devolve a lista com o novo alerta no início. Não altera a lista original. */
export function addAlert(
  alerts: PriceAlert[],
  input: NewAlertInput,
  meta: { id: string; time: number },
): Result<PriceAlert[], AlertError> {
  if (!input.asset) return err("missing-asset");
  if (!isPositiveNumber(input.target)) return err("invalid-target");
  if (alerts.length >= MAX_ALERTS) return err("limit-reached");

  const { asset, direction, target } = input;
  const exists = alerts.some((a) => a.assetId === asset.id && a.direction === direction && a.target === target);
  if (exists) return err("duplicate");

  const alert: PriceAlert = {
    id: meta.id,
    assetId: asset.id,
    symbol: asset.symbol,
    name: asset.name,
    direction,
    target,
    createdAt: meta.time,
  };
  return ok([alert, ...alerts]);
}

export function removeAlert(alerts: PriceAlert[], id: string): PriceAlert[] {
  return alerts.filter((a) => a.id !== id);
}

/** Acima: dispara quando o preço atinge ou passa o alvo. Abaixo: quando atinge ou cai do alvo. */
export function isTriggered(alert: PriceAlert, price: number): boolean {
  return alert.direction === "above" ? price >= alert.target : price <= alert.target;
}

export function evaluateAlerts(alerts: PriceAlert[], priceOf: (assetId: string) => number | undefined): AlertStatus[] {
  return alerts.map((alert) => {
    const price = priceOf(alert.assetId);
    return { alert, price, triggered: price !== undefined && isTriggered(alert, price) };
  });
}

export function parseAlerts(raw: unknown): PriceAlert[] {
  if (!Array.isArray(raw)) return [];
  return raw.flatMap((item): PriceAlert[] => {
    if (typeof item !== "object" || item === null) return [];
    const { id, assetId, symbol, name, direction, target, createdAt } = item as Record<string, unknown>;
    const valid =
      typeof id === "string" && id && typeof assetId === "string" && assetId &&
      typeof symbol === "string" && typeof name === "string" &&
      (direction === "above" || direction === "below") &&
      isPositiveNumber(target) && typeof createdAt === "number" && Number.isFinite(createdAt);
    return valid ? [{ id, assetId, symbol, name, direction, target, createdAt }] : [];
  });
}
