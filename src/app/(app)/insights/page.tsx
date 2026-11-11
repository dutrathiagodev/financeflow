import type { Metadata } from "next";
import { Insights } from "@/components/sections/insights/insights";

export const metadata: Metadata = { title: "Insights · FinanceFlow" };

export default function InsightsPage() {
  return <Insights />;
}
