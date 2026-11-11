import type { Metadata } from "next";
import { Portfolio } from "@/components/sections/portfolio/portfolio";

export const metadata: Metadata = { title: "Portfólio · FinanceFlow" };

export default function PortfolioPage() {
  return <Portfolio />;
}
