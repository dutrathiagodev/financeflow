"use client";

import { useEffect, useState } from "react";
import type { PricePoint } from "@/domain/market/types";

export type HistoryState =
  | { status: "loading" }
  | { status: "error" }
  | { status: "ready"; points: PricePoint[] };

type Settled = { key: string; state: Exclude<HistoryState, { status: "loading" }> };

/** Busca o histórico de preço pela rota interna `/api/history`. */
export function useHistory(assetId: string, days: number): HistoryState {
  const key = `${assetId}:${days}`;
  const [settled, setSettled] = useState<Settled | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`/api/history?id=${encodeURIComponent(assetId)}&days=${days}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        return (await response.json()) as { points: PricePoint[] };
      })
      .then((data) => setSettled({ key, state: { status: "ready", points: data.points } }))
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") setSettled({ key, state: { status: "error" } });
      });

    return () => controller.abort();
  }, [assetId, days, key]);

  // Resultado de outra moeda/período ainda não é válido para esta chave.
  return settled?.key === key ? settled.state : { status: "loading" };
}
