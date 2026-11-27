import Link from "next/link";
import { Card } from "@/components/ui/card";
import { cartoes as textos } from "@/content/painel";

/**
 * Resumo dos cartoes. O cadastro de cartoes e as faturas chegam com o card FF-0031; ate la o
 * painel mostra o estado vazio, sem inventar numeros.
 */
export function CardsSummary() {
  return (
    <Card
      title={textos.titulo}
      action={
        <Link
          href="/cartoes"
          className="inline-flex min-h-11 items-center rounded-base px-2 font-semibold underline underline-offset-2 hover:bg-hover"
        >
          {textos.gerenciar}
        </Link>
      }
    >
      <p className="font-display font-bold tracking-[-0.01em]">{textos.vazio.titulo}</p>
      <p className="mt-1 text-muted">{textos.vazio.dica}</p>
    </Card>
  );
}
