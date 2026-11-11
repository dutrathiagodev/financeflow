import type { Metadata } from "next";
import { Trade } from "@/components/sections/trade/trade";

export const metadata: Metadata = { title: "Negociar · FinanceFlow" };

export default function TradePage() {
  return <Trade />;
}
