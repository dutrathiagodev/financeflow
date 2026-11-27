import { Field, Select } from "@/components/ui/field";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { filtros as textos } from "@/content/lancamentos";
import { TODOS, type Filtros } from "@/domain/account/transactions";
import { formatarMes } from "@/lib/format";

type TransactionFiltersProps = {
  filtros: Filtros;
  /** Categorias do tipo escolhido (a lista acompanha o tipo). */
  categorias: readonly string[];
  /** Meses que tem movimentacao, "AAAA-MM". */
  meses: readonly string[];
  onTipo: (tipo: Filtros["tipo"]) => void;
  onCategoria: (categoria: string) => void;
  onPagamento: (pagamento: Filtros["pagamento"]) => void;
  onMes: (mes: string) => void;
};

const tipoOpcoes = [
  { value: TODOS, label: textos.tipoOpcoes.todos },
  { value: "receita", label: textos.tipoOpcoes.receita },
  { value: "despesa", label: textos.tipoOpcoes.despesa },
];

/**
 * Filtros da lista: tipo e categoria (obrigatorios, Req. 7) e pagamento e mes (extras).
 * Controles nativos (radios e selects): teclado e leitor de tela funcionam sem codigo extra.
 */
export function TransactionFilters({
  filtros,
  categorias,
  meses,
  onTipo,
  onCategoria,
  onPagamento,
  onMes,
}: TransactionFiltersProps) {
  return (
    <div
      role="group"
      aria-label={textos.rotulo}
      className="mb-2 grid grid-cols-2 gap-x-3 lg:grid-cols-[1.3fr_1fr_1fr_1fr]"
    >
      <div className="col-span-2 mb-3.5 lg:col-span-1">
        {/* O nome acessivel do grupo e a legenda do fieldset; este texto so alinha com os campos. */}
        <span aria-hidden="true" className="mb-[5px] block text-[0.85rem] font-semibold">
          {textos.tipo}
        </span>
        <SegmentedControl
          name="filtro-tipo"
          legend={textos.tipo}
          options={tipoOpcoes}
          value={filtros.tipo}
          onChange={(evento) => onTipo(evento.target.value as Filtros["tipo"])}
        />
      </div>

      <Field label={textos.categoria}>
        <Select value={filtros.categoria} onChange={(evento) => onCategoria(evento.target.value)}>
          <option value={TODOS}>{textos.todasCategorias}</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </Select>
      </Field>

      <Field label={textos.pagamento}>
        <Select
          value={filtros.pagamento}
          onChange={(evento) => onPagamento(evento.target.value as Filtros["pagamento"])}
        >
          <option value={TODOS}>{textos.pagamentoOpcoes.todos}</option>
          <option value="avista">{textos.pagamentoOpcoes.avista}</option>
          <option value="cartao">{textos.pagamentoOpcoes.cartao}</option>
        </Select>
      </Field>

      <Field label={textos.mes} className="col-span-2 lg:col-span-1">
        <Select value={filtros.mes} onChange={(evento) => onMes(evento.target.value)}>
          <option value={TODOS}>{textos.todosMeses}</option>
          {meses.map((mes) => (
            <option key={mes} value={mes}>
              {formatarMes(mes)}
            </option>
          ))}
        </Select>
      </Field>
    </div>
  );
}
