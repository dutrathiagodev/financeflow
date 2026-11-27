import type { Metadata } from "next";
import { EmBreve } from "@/components/sections/em-breve/em-breve";
import { paginas } from "@/content/paginas";

export const metadata: Metadata = {
  title: paginas["/planilha"].titulo,
  alternates: { canonical: "/planilha" },
};

export default function PlanilhaPage() {
  return <EmBreve />;
}
