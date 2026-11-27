import type { Metadata } from "next";
import { EmBreve } from "@/components/sections/em-breve/em-breve";
import { paginas } from "@/content/paginas";

export const metadata: Metadata = {
  title: paginas["/cartoes"].titulo,
  alternates: { canonical: "/cartoes" },
};

export default function CartoesPage() {
  return <EmBreve />;
}
