import { Card } from "@/components/ui/card";
import { gastos as textos } from "@/content/painel";
import type { GastoPorCategoria } from "@/domain/account/spending";
import { formatarReais } from "@/lib/format";

type CategorySpendingProps = {
  gastos: readonly GastoPorCategoria[];
  /** Mes por extenso ("Novembro de 2026"). */
  mes: string;
};

/**
 * RF09: para onde foi o dinheiro no mes. Cada barra tem valor e porcentagem em texto, entao a
 * informacao nao depende so do comprimento nem da cor.
 */
export function CategorySpending({ gastos, mes }: CategorySpendingProps) {
  const maior = gastos[0]?.valor ?? 0;
  return (
    <Card title={textos.titulo} action={mes}>
      {gastos.length === 0 ? (
        <div>
          <p className="font-display font-bold tracking-[-0.01em]">{textos.vazio.titulo}</p>
          <p className="mt-1 text-muted">{textos.vazio.dica}</p>
        </div>
      ) : (
        <ul aria-label={textos.rotulo(mes)} className="grid gap-3">
          {gastos.map((g) => (
            <li
              key={g.categoria}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-3 gap-y-1.5 sm:grid-cols-[minmax(0,9rem)_minmax(0,1fr)_auto]"
            >
              <span className="min-w-0 break-words font-semibold">{g.categoria}</span>
              <span className="numero text-right font-semibold sm:order-3">
                {formatarReais(g.valor)}{" "}
                <span className="ml-1 text-[0.875rem] font-medium text-muted">
                  {textos.percentual(g.percentual)}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="col-span-2 h-2.5 overflow-hidden rounded-full bg-regua sm:order-2 sm:col-span-1"
              >
                <span
                  className="block h-full rounded-full bg-despesa"
                  style={{ width: `${maior > 0 ? (g.valor / maior) * 100 : 0}%` }}
                />
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
