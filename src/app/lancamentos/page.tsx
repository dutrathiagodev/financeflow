import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { pages } from "@/content/navigation";

export const metadata: Metadata = { title: pages.lancamentos.title };

export default function LancamentosPage() {
  return <PageHeader page="lancamentos" />;
}
