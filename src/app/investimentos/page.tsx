import type { Metadata } from "next";
import { EmBreve } from "@/components/sections/em-breve/em-breve";
import { paginas } from "@/content/paginas";

export const metadata: Metadata = {
  title: paginas["/investimentos"].titulo,
  alternates: { canonical: "/investimentos" },
};

export default function InvestimentosPage() {
  return <EmBreve />;
}
