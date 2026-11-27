import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { lista } from "@/content/lancamentos";
import type { Movimentacao } from "@/domain/account/types";
import { TransactionList } from "./transaction-list";

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
    const out = html(<TransactionList movimentacoes={[almoco, salario]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out.match(/<li/g)).toHaveLength(2);
    expect(out.indexOf("Almoço")).toBeLessThan(out.indexOf("Salário</strong>"));
  });

  it("mostra categoria, data no formato brasileiro e forma de pagamento", () => {
    const out = html(<TransactionList movimentacoes={[almoco]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out).toContain("Alimentação");
    expect(out).toContain("27/11/2026");
    expect(out).toContain(lista.pagamento.avista);
  });

  it("usa a forma de pagamento guardada quando existe", () => {
    const noCartao: Movimentacao = { ...almoco, pagamento: "cartao" };
    expect(html(<TransactionList movimentacoes={[noCartao]} hoje="2026-11-27" onExcluir={() => {}} />)).toContain(
      lista.pagamento.cartao,
    );
  });

  it("receita e despesa se distinguem por sinal e marcador, nao so pela cor", () => {
    const out = html(<TransactionList movimentacoes={[almoco, salario]} hoje="2026-11-27" onExcluir={() => {}} />);
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
    const out = html(<TransactionList movimentacoes={[parcela]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out).toContain(">2/3<");
    expect(out).toContain(`>${lista.agendada}<`);
  });

  it("parcela que ja venceu nao e agendada", () => {
    const parcela: Movimentacao = { ...almoco, data: "2026-11-01", parcela: { atual: 1, total: 3 } };
    const out = html(<TransactionList movimentacoes={[parcela]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out).toContain(">1/3<");
    expect(out).not.toContain(`>${lista.agendada}<`);
  });

  it("antes de saber a data de hoje nao inventa etiqueta de agendada", () => {
    const parcela: Movimentacao = { ...almoco, data: "2026-12-10", parcela: { atual: 2, total: 3 } };
    expect(html(<TransactionList movimentacoes={[parcela]} hoje="" onExcluir={() => {}} />)).not.toContain(
      `>${lista.agendada}<`,
    );
  });

  it("no celular os detalhes descem para uma linha de apoio e o valor fica a direita", () => {
    const out = html(<TransactionList movimentacoes={[almoco]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out).toContain("lg:hidden");
    expect(out).toContain("Alimentação · 27/11/2026 · À vista");
    expect(out).toContain("text-right");
  });

  it("sem movimentacoes mostra uma mensagem util, sem lista", () => {
    const out = html(<TransactionList movimentacoes={[]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out).toContain(lista.vazio.titulo);
    expect(out).toContain(lista.vazio.dica);
    expect(out).not.toContain("<ul");
  });

  it("o titulo da lista e um h2 (o h1 e da pagina)", () => {
    const out = html(<TransactionList movimentacoes={[]} hoje="" onExcluir={() => {}} />);
    expect(out).toContain("<h2");
    expect(out).toContain(lista.titulo);
    expect(out).not.toContain("<h1");
  });
});

describe("lixeira de cada linha (RF04)", () => {
  it("tem um botao com nome acessivel que cita a movimentacao e alvo de 44 px", () => {
    const out = html(<TransactionList movimentacoes={[almoco]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out).toContain(`aria-label="${lista.excluir("Almoço")}"`);
    expect(out).toContain("size-11");
    expect(out).toContain('type="button"');
  });

  it("uma lixeira por linha", () => {
    const out = html(<TransactionList movimentacoes={[almoco, salario]} hoje="2026-11-27" onExcluir={() => {}} />);
    expect(out.match(/aria-label="Excluir /g)).toHaveLength(2);
  });
});
