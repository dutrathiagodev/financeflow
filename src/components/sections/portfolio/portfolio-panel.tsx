"use client";

import Link from "next/link";
import { useAccount } from "@/application/hooks/use-account";
import { Card } from "@/components/ui/card";
import { ChangePill } from "@/components/ui/change-pill";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/ui/stat-card";
import { portfolioText } from "@/content/trading";
import { allocation, summarize, valuePositions } from "@/domain/account/portfolio";
import type { MarketCoin } from "@/domain/market/types";
import { formatUsd } from "@/lib/format";
import { AllocationCard } from "./allocation-card";
import { PositionsTable } from "./positions-table";

export function PortfolioPanel({ coins }: { coins: MarketCoin[] }) {
  const { account, ready } = useAccount();
  if (!ready) return <Skeleton className="h-64" />;

  if (account.holdings.length === 0) {
    return (
      <Card className="flex flex-col items-start gap-4">
        <p className="text-ink-muted">{portfolioText.empty}</p>
        <Link
          href="/trade"
          className="rounded-control bg-accent px-5 py-3 font-medium text-brand-dark transition-colors hover:bg-brand-mint"
        >
          {portfolioText.goTrade}
        </Link>
      </Card>
    );
  }

  const prices = new Map(coins.map((coin) => [coin.id, coin.price]));
  const positions = valuePositions(account.holdings, (id) => prices.get(id));
  const summary = summarize(positions);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-5 md:grid-cols-2">
        <StatCard label={portfolioText.total} value={formatUsd(summary.totalValue)} />
        <StatCard
          label={portfolioText.pnl}
          value={
            <>
              {formatUsd(summary.pnl)}
              <ChangePill value={summary.pnlPercent} />
            </>
          }
        />
      </div>
      <AllocationCard slices={allocation(positions)} />
      <PositionsTable positions={positions} />
    </div>
  );
}
