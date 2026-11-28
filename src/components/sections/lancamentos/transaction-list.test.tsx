import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { lista } from "@/content/lancamentos";
import type { Movimentacao } from "@/domain/account/types";
import { TransactionList } from "./transaction-list";

type Props = Parameters<typeof TransactionList>[0];
/** Lista sem filtros: o total e a propria lista, e os callbacks nao fazem nada. */
const Lista = (p: Pick<Props, "movimentacoes" | "hoje"> & Partial<Props>) => (
  <TransactionList total={p.movimentacoes.length} onExcluir={() => {}} onLimparFiltros={() => {}} {...p} />
);

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

const nbsp = " ";

const almoco: Movimentacao = {
  id: "a",
  descricao: "Almoço",
  valor: 25.5,
  tipo: "despesa",
  categoria: "Alimentação",
  data: "2026-11-27",
};
const salario: Movimentacao = {
  id: "b",
  descricao: "Salário",
  valor: 1000,
  tipo: "receita",
  categoria: "Salário",
  data: "2026-11-05",
};

describe("TransactionList", () => {
  it("renderiza uma linha por movimentacao, na ordem recebida", () => {
    const out = html(<Lista movimentacoes={[almoco, salario]} hoje="2026-11-27" />);
    expect(out.match(/<li/g)).toHaveLength(2);
    expect(out.indexOf("Almoço")).toBeLessThan(out.indexOf("Salário</strong>"));
  });

  it("mostra categoria, data no formato brasileiro e forma de pagamento", () => {
    const out = html(<Lista movimentacoes={[almoco]} hoje="2026-11-27" />);
    expect(out).toContain("Alimentação");
    expect(out).toContain("27/11/2026");
    expect(out).toContain(lista.pagamento.avista);
  });

  it("usa a forma de pagamento guardada quando existe", () => {
    const noCartao: Movimentacao = { ...almoco, pagamento: "cartao" };
    expect(html(<Lista movimentacoes={[noCartao]} hoje="2026-11-27" />)).toContain(
      lista.pagamento.cartao,
    );
  });

  it("receita e despesa se distinguem por sinal e marcador, nao so pela cor", () => {
    const out = html(<Lista movimentacoes={[almoco, salario]} hoje="2026-11-27" />);
    expect(out).toContain(`− R$${nbsp}25,50`);
    expect(out).toContain(`+ R$${nbsp}1.000,00`);
    expect(out).toContain("bg-despesa");
    expect(out).toContain("bg-receita");
    // Leitor de tela ouve o tipo, nao so o sinal.
    expect(out).toContain(`${lista.despesa}: `);
    expect(out).toContain(`${lista.receita}: `);
  });

  it("parcela mostra 2/3 e parcela futura leva a etiqueta agendada", () => {
    const parcela: Movimentacao = { ...almoco, data: "2026-12-10", parcela: { atual: 2, total: 3 } };
    const out = html(<Lista movimentacoes={[parcela]} hoje="2026-11-27" />);
    expect(out).toContain(">2/3<");
    expect(out).toContain(`>${lista.agendada}<`);
  });

  it("parcela que ja venceu nao e agendada", () => {
    const parcela: Movimentacao = { ...almoco, data: "2026-11-01", parcela: { atual: 1, total: 3 } };
    const out = html(<Lista movimentacoes={[parcela]} hoje="2026-11-27" />);
    expect(out).toContain(">1/3<");
    expect(out).not.toContain(`>${lista.agendada}<`);
  });

  it("antes de saber a data de hoje nao inventa etiqueta de agendada", () => {
    const parcela: Movimentacao = { ...almoco, data: "2026-12-10", parcela: { atual: 2, total: 3 } };
    expect(html(<Lista movimentacoes={[parcela]} hoje="" />)).not.toContain(
      `>${lista.agendada}<`,
    );
  });

  it("no celular os detalhes descem para uma linha de apoio e o valor fica a direita", () => {
    const out = html(<Lista movimentacoes={[almoco]} hoje="2026-11-27" />);
    expect(out).toContain("lg:hidden");
    expect(out).toContain("Alimentação · 27/11/2026 · À vista");
    expect(out).toContain("text-right");
  });

  it("sem movimentacoes mostra uma mensagem util, sem lista", () => {
    const out = html(<Lista movimentacoes={[]} hoje="2026-11-27" />);
    expect(out).toContain(lista.vazio.titulo);
    expect(out).toContain(lista.vazio.dica);
    expect(out).not.toContain("<ul");
  });

  it("o titulo da lista e um h2 (o h1 e da pagina)", () => {
    const out = html(<Lista movimentacoes={[]} hoje="" />);
    expect(out).toContain("<h2");
    expect(out).toContain(lista.titulo);
    expect(out).not.toContain("<h1");
  });
});

describe("lixeira de cada linha (RF04)", () => {
  it("tem um botao com nome acessivel que cita a movimentacao e alvo de 44 px", () => {
    const out = html(<Lista movimentacoes={[almoco]} hoje="2026-11-27" />);
    expect(out).toContain(`aria-label="${lista.excluir("Almoço")}"`);
    expect(out).toContain("size-11");
    expect(out).toContain('type="button"');
  });

  it("uma lixeira por linha", () => {
    const out = html(<Lista movimentacoes={[almoco, salario]} hoje="2026-11-27" />);
    expect(out.match(/aria-label="Excluir /g)).toHaveLength(2);
  });
});

describe("contagem e filtros", () => {
  it("mostra quantas aparecem de quantas existem", () => {
    const out = html(<Lista movimentacoes={[almoco]} total={12} hoje="2026-11-27" />);
    expect(out).toContain(lista.contagem(1, 12));
    expect(out).toContain('role="status"');
  });

  it("sem nenhuma movimentacao nao mostra contagem nem filtros", () => {
    const out = html(<Lista movimentacoes={[]} hoje="" filtros={<p>FILTROS</p>} />);
    expect(out).not.toContain("FILTROS");
    expect(out).not.toContain("Mostrando");
  });

  it("com movimentacoes mostra o bloco de filtros acima da lista", () => {
    const out = html(<Lista movimentacoes={[almoco]} hoje="" filtros={<p>FILTROS</p>} />);
    expect(out.indexOf("FILTROS")).toBeGreaterThan(-1);
    expect(out.indexOf("FILTROS")).toBeLessThan(out.indexOf("<ul"));
  });

  it("filtro sem resultado explica e oferece limpar, sem esconder os filtros", () => {
    const out = html(<Lista movimentacoes={[]} total={5} hoje="" filtros={<p>FILTROS</p>} />);
    expect(out).toContain(lista.semResultado.titulo);
    expect(out).toContain(lista.semResultado.dica);
    expect(out).toContain(lista.semResultado.limpar);
    expect(out).toContain("FILTROS");
    expect(out).toContain(lista.contagem(0, 5));
    expect(out).not.toContain("<ul");
  });

  it("com filtro ativo e resultados mostra o botao Limpar filtros acima da lista", () => {
    const out = html(<Lista movimentacoes={[almoco]} total={5} hoje="" filtros={<p>FILTROS</p>} filtrosAtivos />);
    expect(out).toContain(lista.semResultado.limpar);
    expect(out).toContain("<ul");
    expect(out.indexOf("FILTROS")).toBeLessThan(out.indexOf(lista.semResultado.limpar));
    expect(out.indexOf(lista.semResultado.limpar)).toBeLessThan(out.indexOf("<ul"));
  });

  it("sem filtro ativo nao mostra o botao Limpar filtros", () => {
    const out = html(<Lista movimentacoes={[almoco]} total={5} hoje="" filtros={<p>FILTROS</p>} />);
    expect(out).not.toContain(lista.semResultado.limpar);
  });

  it("sem resultado o botao Limpar filtros aparece uma vez so", () => {
    const out = html(<Lista movimentacoes={[]} total={5} hoje="" filtrosAtivos />);
    expect(out.split(lista.semResultado.limpar)).toHaveLength(2);
  });

  it("o botao Limpar filtros tem alvo de toque de pelo menos 44 px", () => {
    const out = html(<Lista movimentacoes={[almoco]} total={5} hoje="" filtrosAtivos />);
    expect(out).toMatch(/min-h-11[^>]*>Limpar filtros/);
  });
});
