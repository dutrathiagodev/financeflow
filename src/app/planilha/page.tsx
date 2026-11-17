import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { pages } from "@/content/navigation";

export const metadata: Metadata = { title: pages.planilha.title };

export default function PlanilhaPage() {
  return <PageHeader page="planilha" />;
}
