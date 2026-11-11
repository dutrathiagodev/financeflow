"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TextField } from "@/components/ui/text-field";
import { simulationNotice, walletText } from "@/content/trading";
import { formatUsd } from "@/lib/format";
import { useAccount } from "@/lib/use-account";
import type { MarketCoin } from "@/types/market";

function MoneyForm({
  title,
  action,
  onSubmit,
}: {
  title: string;
  action: string;
  onSubmit: (usd: number) => { ok: boolean; error?: string };
}) {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const result = onSubmit(Number(value.replace(",", ".")));
    setMessage({ ok: result.ok, text: result.ok ? "Operação concluída." : (result.error ?? "") });
    if (result.ok) setValue("");
  };

  return (
    <Card>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <h2 className="text-xl font-medium">{title}</h2>
        <TextField
          label={walletText.amountLabel}
          inputMode="decimal"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="0,00"
        />
        <Button type="submit">{action}</Button>
        {message && (
          <p role="status" className={message.ok ? "text-up" : "text-down"}>
            {message.text}
          </p>
        )}
      </form>
    </Card>
  );
}

export function WalletPanel({ coins }: { coins: MarketCoin[] }) {
  const { account, deposit, withdraw, reset } = useAccount();
  const [resetMessage, setResetMessage] = useState("");

  const prices = new Map(coins.map((c) => [c.id, c.price]));
  const invested = account.holdings.reduce((sum, h) => sum + h.quantity * (prices.get(h.coinId) ?? h.cost / h.quantity), 0);

  const onReset = () => {
    if (window.confirm(walletText.resetConfirm)) {
      reset();
      setResetMessage(walletText.resetDone);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 md:grid-cols-3">
        <Card>
          <p className="text-ink-muted">{walletText.cash}</p>
          <p className="mt-2 text-4xl font-medium tracking-tight">{formatUsd(account.cash)}</p>
        </Card>
        <Card>
          <p className="text-ink-muted">{walletText.invested}</p>
          <p className="mt-2 text-4xl font-medium tracking-tight">{formatUsd(invested)}</p>
        </Card>
        <Card>
          <p className="text-ink-muted">{walletText.total}</p>
          <p className="mt-2 text-4xl font-medium tracking-tight text-accent">{formatUsd(account.cash + invested)}</p>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <MoneyForm title={walletText.depositTitle} action={walletText.deposit} onSubmit={deposit} />
        <MoneyForm title={walletText.withdrawTitle} action={walletText.withdraw} onSubmit={withdraw} />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="danger" onClick={onReset}>{walletText.reset}</Button>
        {resetMessage && <p role="status" className="text-up">{resetMessage}</p>}
        <p className="text-sm text-ink-faint">{simulationNotice}</p>
      </div>
    </div>
  );
}
