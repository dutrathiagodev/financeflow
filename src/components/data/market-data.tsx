import { Suspense, type ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { UnavailableNotice } from "@/components/ui/unavailable-notice";
import type { MarketCoin } from "@/domain/market/types";
import { getTopCoins } from "@/infrastructure/composition";

type MarketDataProps = {
  children: (coins: MarketCoin[]) => ReactNode;
  /** O que mostrar se as cotações não carregarem. Por padrão, um aviso. */
  fallback?: ReactNode;
  /** O que mostrar enquanto carrega. Por padrão, um esqueleto. */
  loading?: ReactNode;
};

async function MarketDataContent({ children, fallback }: Pick<MarketDataProps, "children" | "fallback">) {
  const result = await getTopCoins();
  if (!result.ok) return <>{fallback}</>;
  return <>{children(result.value)}</>;
}

/**
 * Carrega as cotações no servidor e entrega às seções, tratando a falha em um só lugar.
 * O Suspense deixa o resto da página aparecer enquanto as cotações chegam.
 */
export function MarketData({
  children,
  fallback = <UnavailableNotice />,
  loading = <Skeleton className="h-48" />,
}: MarketDataProps) {
  return (
    <Suspense fallback={loading}>
      <MarketDataContent fallback={fallback}>{children}</MarketDataContent>
    </Suspense>
  );
}
