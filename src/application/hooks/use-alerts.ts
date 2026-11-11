"use client";

import { usePersistedState } from "./use-persisted-state";
import { addAlert, parseAlerts, removeAlert, type AlertDirection, type PriceAlert } from "@/domain/alerts/price-alert";

const EMPTY: PriceAlert[] = [];

type NewAlert = {
  asset: { id: string; symbol: string; name: string } | undefined;
  direction: AlertDirection;
  target: number;
};

export function useAlerts() {
  const { value: alerts, ready, set, transact } = usePersistedState("ff:alerts", parseAlerts, EMPTY);

  return {
    alerts,
    ready,
    add: (input: NewAlert) =>
      transact((current) => addAlert(current, input, { id: crypto.randomUUID(), time: Date.now() })),
    remove: (id: string) => transact((current) => ({ ok: true, value: removeAlert(current, id) })),
    replace: (next: PriceAlert[]) => set(next),
  };
}
