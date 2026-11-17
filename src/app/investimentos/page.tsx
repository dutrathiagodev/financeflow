import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { pages } from "@/content/navigation";

export const metadata: Metadata = { title: pages.investimentos.title };

export default function InvestimentosPage() {
  return <PageHeader page="investimentos" />;
}
