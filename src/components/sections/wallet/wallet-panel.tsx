"use client";

import { useState } from "react";
import { useAccount } from "@/application/hooks/use-account";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { StatusMessage, type Feedback } from "@/components/ui/status-message";
import { commonText } from "@/content/common";
import { walletText } from "@/content/trading";
import { summarize, totalEquity, valuePositions } from "@/domain/account/portfolio";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";
import { MoneyForm } from "./money-form";

export function WalletPanel({ coins }: { coins: MarketCoin[] }) {
  const { account, ready, deposit, withdraw, reset } = useAccount();
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  if (!ready) return <Skeleton className="h-64" />;

  const prices = new Map(coins.map((coin) => [coin.id, coin.price]));
  const priceOf = (id: string) => prices.get(id);
  const invested = summarize(valuePositions(account.holdings, priceOf)).totalValue;

  const confirmReset = () => {
    if (!window.confirm(walletText.resetConfirm)) return;
    reset();
    setFeedback({ ok: true, text: walletText.resetDone });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 md:grid-cols-3">
        <StatCard label={walletText.cash} value={formatUsd(account.cash)} />
        <StatCard label={walletText.invested} value={formatUsd(invested)} />
        <StatCard label={walletText.total} value={formatUsd(totalEquity(account, priceOf))} accent />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <MoneyForm
          title={walletText.deposit.title}
          action={walletText.deposit.action}
          successText={walletText.deposit.done}
          onSubmit={deposit}
        />
        <MoneyForm
          title={walletText.withdraw.title}
          action={walletText.withdraw.action}
          successText={walletText.withdraw.done}
          onSubmit={withdraw}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button variant="danger" onClick={confirmReset}>
          {walletText.reset}
        </Button>
        <StatusMessage feedback={feedback} />
        <p className="text-sm text-ink-faint">{commonText.simulationNotice}</p>
      </div>
    </div>
  );
}
