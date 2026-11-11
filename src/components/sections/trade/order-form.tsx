"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SegmentedTabs } from "@/components/ui/segmented-tabs";
import { SelectField } from "@/components/ui/select-field";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { TextField } from "@/components/ui/text-field";
import { commonText } from "@/content/common";
import { accountErrors, tradeText } from "@/content/trading";
import { estimateOrder, type OrderSide } from "@/domain/account/estimate";
import type { Account, AccountError } from "@/domain/account/types";
import type { MarketCoin } from "@/domain/market/types";
import type { Result } from "@/domain/result";
import { formatQuantity, formatUsd } from "@/lib/format";
import { parseDecimalInput } from "@/lib/parse-number";
import { cn } from "@/lib/utils";

const SIDES = [
  { id: "buy", label: tradeText.buy },
  { id: "sell", label: tradeText.sell },
] as const;

type OrderFormProps = {
  coins: MarketCoin[];
  coin: MarketCoin;
  holdingQuantity: number;
  onCoinChange: (id: string) => void;
  onBuy: (coin: MarketCoin, usd: number) => Result<Account, AccountError>;
  onSell: (coin: MarketCoin, quantity: number) => Result<Account, AccountError>;
};

export function OrderForm({ coins, coin, holdingQuantity, onCoinChange, onBuy, onSell }: OrderFormProps) {
  const [side, setSide] = useState<OrderSide>("buy");
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const amount = parseDecimalInput(value);
  const estimate = estimateOrder(side, amount, coin.price);
  const isBuy = side === "buy";

  const resetInput = () => {
    setValue("");
    setFeedback(null);
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = isBuy ? onBuy(coin, amount) : onSell(coin, amount);
    if (result.ok) {
      setValue("");
      setFeedback({ ok: true, text: isBuy ? tradeText.doneBuy : tradeText.doneSell });
    } else {
      setFeedback({ ok: false, text: accountErrors[result.error] });
    }
  };

  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <SegmentedTabs
          options={SIDES}
          value={side}
          onChange={(next) => {
            setSide(next);
            resetInput();
          }}
          label={tradeText.sideLabel}
        />

        <SelectField
          label={tradeText.coin}
          value={coin.id}
          onChange={(event) => {
            onCoinChange(event.target.value);
            resetInput();
          }}
          options={coins.map((c) => ({ value: c.id, label: `${c.name} (${c.symbol})` }))}
        />

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <TextField
              label={isBuy ? tradeText.buyAmount : tradeText.sellAmount}
              inputMode="decimal"
              value={value}
              onChange={(event) => setValue(event.target.value)}
              placeholder="0"
              className="w-full"
            />
          </div>
          {!isBuy && holdingQuantity > 0 && (
            <Button variant="ghost" onClick={() => setValue(String(holdingQuantity))}>
              {tradeText.max}
            </Button>
          )}
        </div>

        <p className="text-ink-muted">
          {isBuy ? tradeText.estimateBuy : tradeText.estimateSell}:{" "}
          <span className="text-ink">{isBuy ? `${formatQuantity(estimate)} ${coin.symbol}` : formatUsd(estimate)}</span>
        </p>

        <Button type="submit" className={cn(!isBuy && "bg-down text-white hover:bg-down/80")}>
          {isBuy ? tradeText.submitBuy : tradeText.submitSell}
        </Button>
        <StatusMessage feedback={feedback} />
        <p className="text-sm text-ink-faint">{commonText.simulationNotice}</p>
      </form>
    </Card>
  );
}
