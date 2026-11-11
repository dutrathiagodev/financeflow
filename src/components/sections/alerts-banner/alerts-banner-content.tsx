"use client";

import Link from "next/link";
import { useAlerts } from "@/application/hooks/use-alerts";
import { Icon } from "@/components/ui/icon";
import { alertsBannerText } from "@/content/alerts";
import { evaluateAlerts } from "@/domain/alerts/price-alert";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";

export function AlertsBannerContent({ coins }: { coins: MarketCoin[] }) {
  const { alerts, ready } = useAlerts();
  if (!ready) return null;

  const prices = new Map(coins.map((coin) => [coin.id, coin.price]));
  const triggered = evaluateAlerts(alerts, (id) => prices.get(id)).filter((status) => status.triggered);
  if (triggered.length === 0) return null;

  return (
    <section
      role="status"
      aria-label={alertsBannerText.title(triggered.length)}
      className="mx-6 mt-6 rounded-2xl border border-accent/40 bg-accent-soft px-5 py-4 lg:mx-10"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 font-medium text-accent">
          <Icon name="bell" className="size-5" />
          {alertsBannerText.title(triggered.length)}
        </p>
        <Link href="/settings" className="text-sm text-ink-muted underline-offset-4 hover:text-ink hover:underline">
          {alertsBannerText.manage}
        </Link>
      </div>
      <ul className="mt-3 flex flex-col gap-1 text-sm">
        {triggered.map(({ alert, price }) => (
          <li key={alert.id}>
            <span className="text-ink">{alert.name}</span>{" "}
            <span className="text-ink-muted">
              {alertsBannerText.direction[alert.direction]} {formatUsd(alert.target)} · {alertsBannerText.now}{" "}
              {price !== undefined && formatUsd(price)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
