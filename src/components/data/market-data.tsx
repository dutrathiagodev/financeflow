import type { ReactNode } from "react";
import { UnavailableNotice } from "@/components/ui/unavailable-notice";
import type { MarketCoin } from "@/domain/market/types";
import { getTopCoins } from "@/infrastructure/composition";

type MarketDataProps = {
  children: (coins: MarketCoin[]) => ReactNode;
  /** O que mostrar se as cotações não carregarem. Por padrão, um aviso. */
  fallback?: ReactNode;
};

/** Carrega as cotações no servidor e entrega às seções, tratando a falha em um só lugar. */
export async function MarketData({ children, fallback = <UnavailableNotice /> }: MarketDataProps) {
  const result = await getTopCoins();
  if (!result.ok) return <>{fallback}</>;
  return <>{children(result.value)}</>;
}
