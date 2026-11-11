"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ChangePill } from "@/components/ui/change-pill";
import { PriceChart, type ChartPoint } from "@/components/ui/price-chart";
import { analyticsText, ranges } from "@/content/analytics";
import { formatUsd } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MarketCoin, PricePoint } from "@/types/market";

type State = { key: string; points: PricePoint[] | null; failed: boolean };

function labelFor(time: number, days: number) {
  const date = new Date(time);
  return days <= 1
    ? date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
    : date.toLocaleString("pt-BR", { day: "2-digit", month: "short", hour: days <= 7 ? "2-digit" : undefined, minute: days <= 7 ? "2-digit" : undefined });
}

export function AnalyticsPanel({ coins }: { coins: MarketCoin[] }) {
  const [coinId, setCoinId] = useState(coins[0].id);
  const [days, setDays] = useState<number>(7);
  const [state, setState] = useState<State>({ key: "", points: null, failed: false });
  const key = `${coinId}:${days}`;

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/history?id=${coinId}&days=${days}`, { signal: controller.signal })
      .then((res) => res.json() as Promise<{ points: PricePoint[] }>)
      .then((data) => setState({ key, points: data.points, failed: data.points.length === 0 }))
      .catch((error: unknown) => {
        if ((error as Error).name !== "AbortError") setState({ key, points: null, failed: true });
      });
    return () => controller.abort();
  }, [coinId, days, key]);

  const coin = coins.find((c) => c.id === coinId) ?? coins[0];
  const loading = state.key !== key;
  const raw = !loading ? state.points : null;
  const step = raw ? Math.max(1, Math.floor(raw.length / 120)) : 1;
  const points: ChartPoint[] = raw ? raw.filter((_, i) => i % step === 0).map((p) => ({ value: p.price, label: labelFor(p.time, days) })) : [];
  const prices = raw?.map((p) => p.price) ?? [];
  const start = prices[0];
  const end = prices[prices.length - 1];
  const change = start ? ((end - start) / start) * 100 : 0;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <label className="flex flex-col gap-2 text-sm text-ink-muted">
          {analyticsText.coin}
          <select
            value={coinId}
            onChange={(e) => setCoinId(e.target.value)}
            className="rounded-control border border-line bg-panel-raised px-4 py-3 text-base text-ink focus:border-accent focus:outline-none"
          >
            {coins.map((c) => (
              <option key={c.id} value={c.id}>{c.name} ({c.symbol})</option>
            ))}
          </select>
        </label>
        <ul aria-label={analyticsText.range} className="flex gap-2">
          {ranges.map((r) => (
            <li key={r.days}>
              <button
                type="button"
                aria-pressed={days === r.days}
                onClick={() => setDays(r.days)}
                className={cn(
                  "rounded-control px-4 py-2.5 transition-colors",
                  days === r.days ? "bg-accent-soft text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {r.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <Card>
        <div className="flex items-baseline gap-4">
          <p className="text-4xl font-medium tracking-tight">{formatUsd(raw && end ? end : coin.price)}</p>
          {raw && start ? <ChangePill value={change} /> : null}
        </div>
        <div className="mt-6 min-h-48">
          {loading && <p className="text-ink-muted">{analyticsText.loading}</p>}
          {!loading && state.failed && <p className="text-down">{analyticsText.error}</p>}
          {!loading && points.length > 1 && <PriceChart points={points} tone={change >= 0 ? "up" : "down"} />}
        </div>
      </Card>

      {raw && prices.length > 0 && (
        <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [analyticsText.stats.start, formatUsd(start)],
            [analyticsText.stats.end, formatUsd(end)],
            [analyticsText.stats.high, formatUsd(Math.max(...prices))],
            [analyticsText.stats.low, formatUsd(Math.min(...prices))],
          ].map(([label, value]) => (
            <Card key={label}>
              <dt className="text-sm text-ink-muted">{label}</dt>
              <dd className="mt-1 text-xl">{value}</dd>
            </Card>
          ))}
        </dl>
      )}
    </div>
  );
}
