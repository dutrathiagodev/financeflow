"use client";

import { useAccount } from "@/application/hooks/use-account";
import { useAlerts } from "@/application/hooks/use-alerts";
import { useFavorites } from "@/application/hooks/use-favorites";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { settingsText } from "@/content/settings";
import { formatUsd } from "@/lib/format";

export function AccountSummary() {
  const { account, ready } = useAccount();
  const { ids } = useFavorites();
  const { alerts } = useAlerts();
  const text = settingsText.summary;

  if (!ready) return <Skeleton className="h-24" />;

  const items = [
    [text.cash, formatUsd(account.cash)],
    [text.positions, String(account.holdings.length)],
    [text.favorites, String(ids.length)],
    [text.alerts, String(alerts.length)],
  ];

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {items.map(([label, value]) => (
        <Card key={label} className="p-5">
          <p className="text-sm text-ink-muted">{label}</p>
          <p className="mt-1 text-2xl font-medium tracking-tight">{value}</p>
        </Card>
      ))}
    </div>
  );
}
