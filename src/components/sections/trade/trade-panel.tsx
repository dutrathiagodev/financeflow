"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CoinBadge } from "@/components/ui/coin-badge";
import { TextField } from "@/components/ui/text-field";
import { simulationNotice, tradeText } from "@/content/trading";
import { formatQuantity, formatUsd } from "@/lib/format";
import { useAccount } from "@/lib/use-account";
import { cn } from "@/lib/utils";
import type { MarketCoin } from "@/types/market";

type Side = "buy" | "sell";

export function TradePanel({ coins }: { coins: MarketCoin[] }) {
  const { account, buy, sell } = useAccount();
  const [coinId, setCoinId] = useState(coins[0]?.id ?? "");
  const [side, setSide] = useState<Side>("buy");
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const coin = coins.find((c) => c.id === coinId) ?? coins[0];
  const holding = account.holdings.find((h) => h.coinId === coin.id);
  const amount = Number(value.replace(",", ".")) || 0;
  const estimate = side === "buy" ? amount / coin.price : amount * coin.price;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = side === "buy" ? buy(coin, amount) : sell(coin, amount);
    setMessage({
      ok: result.ok,
      text: result.ok ? (side === "buy" ? tradeText.doneBuy : tradeText.doneSell) : result.error,
    });
    if (result.ok) setValue("");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
      <Card>
        <form onSubmit={submit} className="flex flex-col gap-5">
          <div role="group" aria-label="Tipo de ordem" className="grid grid-cols-2 gap-2 rounded-control bg-panel-raised p-1">
            {(["buy", "sell"] as const).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={side === item}
                onClick={() => {
                  setSide(item);
                  setValue("");
                  setMessage(null);
                }}
                className={cn(
                  "rounded-[10px] py-3 text-base transition-colors",
                  side === item
                    ? item === "buy"
                      ? "bg-up-soft text-up"
                      : "bg-down-soft text-down"
                    : "text-ink-muted hover:text-ink",
                )}
              >
                {item === "buy" ? tradeText.buy : tradeText.sell}
              </button>
            ))}
          </div>

          <label className="flex flex-col gap-2 text-sm text-ink-muted">
            {tradeText.coin}
            <select
              value={coin.id}
              onChange={(e) => {
                setCoinId(e.target.value);
                setValue("");
                setMessage(null);
              }}
              className="rounded-control border border-line bg-panel-raised px-4 py-3 text-base text-ink focus:border-accent focus:outline-none"
            >
              {coins.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.symbol})
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <TextField
                label={side === "buy" ? tradeText.buyAmount : tradeText.sellAmount}
                inputMode="decimal"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="0"
                className="w-full"
              />
            </div>
            {side === "sell" && holding && (
              <Button variant="ghost" onClick={() => setValue(String(holding.quantity))}>
                {tradeText.max}
              </Button>
            )}
          </div>

          <p className="text-ink-muted">
            {side === "buy" ? tradeText.estimateBuy : tradeText.estimate}:{" "}
            <span className="text-ink">
              {side === "buy" ? `${formatQuantity(estimate)} ${coin.symbol}` : formatUsd(estimate)}
            </span>
          </p>

          <Button type="submit" className={side === "sell" ? "bg-down text-white hover:bg-down/80" : undefined}>
            {side === "buy" ? tradeText.submitBuy : tradeText.submitSell}
          </Button>
          {message && (
            <p role="status" className={message.ok ? "text-up" : "text-down"}>
              {message.text}
            </p>
          )}
          <p className="text-sm text-ink-faint">{simulationNotice}</p>
        </form>
      </Card>

      <Card className="h-fit">
        <div className="flex items-center gap-3">
          <CoinBadge image={coin.image} name={coin.name} className="size-10" />
          <div className="leading-tight">
            <p className="text-lg">{coin.name}</p>
            <p className="text-sm text-ink-muted">{coin.symbol}</p>
          </div>
        </div>
        <dl className="mt-6 flex flex-col gap-4">
          <div>
            <dt className="text-sm text-ink-muted">{tradeText.price}</dt>
            <dd className="text-2xl">{formatUsd(coin.price)}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-muted">{tradeText.available}</dt>
            <dd className="text-lg">{formatUsd(account.cash)}</dd>
          </div>
          <div>
            <dt className="text-sm text-ink-muted">{tradeText.holding}</dt>
            <dd className="text-lg">
              {formatQuantity(holding?.quantity ?? 0)} {coin.symbol}
            </dd>
          </div>
        </dl>
      </Card>
    </div>
  );
}
