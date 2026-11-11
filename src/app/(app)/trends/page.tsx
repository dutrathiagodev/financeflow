import type { Metadata } from "next";
import { Trends } from "@/components/sections/trends/trends";

export const metadata: Metadata = { title: "Tendências · FinanceFlow" };

export default function TrendsPage() {
  return <Trends />;
}
