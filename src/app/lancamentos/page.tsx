import type { Metadata } from "next";
import { Lancamentos } from "@/components/sections/lancamentos/lancamentos";
import { lancamentos } from "@/content/lancamentos";

// Titulo da aba: "Lançamentos · FinanceFlow" (modelo definido no layout).
export const metadata: Metadata = {
  title: lancamentos.titulo,
  alternates: { canonical: "/lancamentos" },
};

export default function LancamentosPage() {
  return <Lancamentos />;
}
