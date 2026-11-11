import type { Metadata } from "next";
import { Wallet } from "@/components/sections/wallet/wallet";

export const metadata: Metadata = { title: "Carteira · FinanceFlow" };

export default function WalletPage() {
  return <Wallet />;
}
