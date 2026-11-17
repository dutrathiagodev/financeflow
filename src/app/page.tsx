import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { pages } from "@/content/navigation";

// A page apenas compõe seções (docs/architecture/feature.spec.md, regra 4).
export const metadata: Metadata = { title: pages.painel.title };

export default function PainelPage() {
  return <PageHeader page="painel" />;
}
