"use client";

import { useState, type FormEvent } from "react";
import { useAlerts } from "@/application/hooks/use-alerts";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { SelectField } from "@/components/ui/select-field";
import { SettingsCard } from "@/components/ui/settings-card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { TextField } from "@/components/ui/text-field";
import { alertDirections, alertErrors, settingsText } from "@/content/settings";
import { evaluateAlerts, type AlertDirection } from "@/domain/alerts/price-alert";
import { findCoin } from "@/domain/market/coin-queries";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";
import { parseDecimalInput } from "@/lib/parse-number";
import { cn } from "@/lib/utils";

export function AlertsManager({ coins }: { coins: MarketCoin[] }) {
  const { alerts, add, remove } = useAlerts();
  const [coinId, setCoinId] = useState(coins[0].id);
  const [direction, setDirection] = useState<AlertDirection>("above");
  const [target, setTarget] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const text = settingsText.alerts;

  const prices = new Map(coins.map((coin) => [coin.id, coin.price]));
  const statuses = evaluateAlerts(alerts, (id) => prices.get(id));

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = add({ asset: findCoin(coins, coinId), direction, target: parseDecimalInput(target) });
    if (result.ok) setTarget("");
    setFeedback({ ok: result.ok, text: result.ok ? text.added : alertErrors[result.error] });
  };

  return (
    <SettingsCard icon="bell" title={text.title} description={text.description}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <SelectField
          label={text.coin}
          value={coinId}
          onChange={(event) => setCoinId(event.target.value)}
          options={coins.map((coin) => ({ value: coin.id, label: `${coin.name} (${coin.symbol})` }))}
        />
        <div className="flex flex-col gap-2 text-sm text-ink-muted">
          {text.direction}
          <SegmentedTabs
            options={alertDirections}
            value={direction}
            onChange={setDirection}
            label={text.directionLabel}
          />
        </div>
        <TextField
          label={text.target}
          inputMode="decimal"
          value={target}
          onChange={(event) => setTarget(event.target.value)}
          placeholder="0,00"
        />
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit">
            <span className="flex items-center gap-2">
              <Icon name="plus" className="size-4" />
              {text.add}
            </span>
          </Button>
          <StatusMessage feedback={feedback} />
        </div>
      </form>

      {statuses.length === 0 ? (
        <p className="text-ink-muted">{text.empty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {statuses.map(({ alert, price, triggered }) => (
            <li
              key={alert.id}
              className="flex items-center gap-4 rounded-2xl border border-line bg-panel-raised px-4 py-3"
            >
              <div className="flex-1 leading-tight">
                <p>
                  {alert.name} <span className="text-sm text-ink-muted">{alert.symbol}</span>
                </p>
                <p className="text-sm text-ink-muted">
                  {alert.direction === "above" ? text.above : text.below} {formatUsd(alert.target)}
                  {price !== undefined && ` · ${text.current} ${formatUsd(price)}`}
                </p>
              </div>
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs",
                  triggered ? "bg-up-soft text-up" : "bg-white/5 text-ink-muted",
                )}
              >
                {triggered ? text.triggered : text.waiting}
              </span>
              <button
                type="button"
                onClick={() => remove(alert.id)}
                aria-label={text.remove(alert.name)}
                className="grid size-9 place-items-center rounded-control text-ink-faint transition-colors hover:bg-down-soft hover:text-down"
              >
                <Icon name="trash" className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </SettingsCard>
  );
}
