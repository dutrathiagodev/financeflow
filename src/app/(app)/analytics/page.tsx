import type { Metadata } from "next";
import { Analytics } from "@/components/sections/analytics/analytics";

export const metadata: Metadata = { title: "Análises · FinanceFlow" };

export default function AnalyticsPage() {
  return <Analytics />;
}
