import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/page-header";
import { pages } from "@/content/navigation";

export const metadata: Metadata = { title: pages.cartoes.title };

export default function CartoesPage() {
  return <PageHeader page="cartoes" />;
}
