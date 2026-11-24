import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
import { Card } from "./card";
import { CreditCard } from "./credit-card";
import { Field, Input } from "./field";
import { SegmentedControl } from "./segmented-control";
import { Statement, StatementLine } from "./statement";
import { Tag } from "./tag";

const html = (el: React.ReactElement) => renderToStaticMarkup(el);

describe("Button", () => {
  it("tem altura minima de 44px e 34px no pequeno", () => {
    expect(html(<Button>Salvar</Button>)).toContain("min-h-11");
    expect(html(<Button size="sm">Ver</Button>)).toContain("min-h-[34px]");
  });

  it("usa type=button por padrao para nao enviar formulario sem querer", () => {
    expect(html(<Button>Ok</Button>)).toContain('type="button"');
  });

  it("variante primaria usa os tokens que viram lima no escuro", () => {
    const out = html(<Button variant="primary">Ok</Button>);
    expect(out).toContain("bg-primario");
    expect(out).toContain("text-primario-texto");
  });
});

describe("Field", () => {
  it("mostra o rotulo acima do controle", () => {
    const out = html(
      <Field label="Descrição">
        <Input name="descricao" />
      </Field>,
    );
    expect(out.indexOf("Descrição")).toBeLessThan(out.indexOf("<input"));
  });

  it("marca erro e anuncia a mensagem", () => {
    const out = html(
      <Field label="Valor" erro="Informe um valor maior que zero.">
        <Input name="valor" />
      </Field>,
    );
    expect(out).toContain("data-invalido");
    expect(out).toContain('role="alert"');
    expect(out).toContain("Informe um valor maior que zero.");
  });
});

describe("SegmentedControl", () => {
  const opcoes = [
    { value: "despesa", label: "Despesa", tone: "despesa" as const },
    { value: "receita", label: "Receita", tone: "receita" as const },
  ];

  it("renderiza radios nativos agrupados com legenda acessivel", () => {
    const out = html(
      <SegmentedControl name="tipo" legend="Tipo" options={opcoes} defaultValue="despesa" />,
    );
    expect(out.match(/type="radio"/g)).toHaveLength(2);
    expect(out).toContain("<legend");
    expect(out).toContain("peer-checked:bg-despesa-fundo");
    expect(out).toContain("peer-checked:bg-receita-fundo");
  });

  it("marca o valor inicial", () => {
    const out = html(
      <SegmentedControl name="tipo" legend="Tipo" options={opcoes} defaultValue="receita" />,
    );
    expect(out.match(/checked=""/g)).toHaveLength(1);
  });
});

describe("Tag", () => {
  it("usa raio de 5px (rounded-tag)", () => {
    expect(html(<Tag>1/3</Tag>)).toContain("rounded-tag");
  });
});

describe("Card", () => {
  it("vira section com h2 so quando ha titulo", () => {
    expect(html(<Card title="Resumo">x</Card>)).toContain("<h2");
    expect(html(<Card>x</Card>)).not.toContain("<h2");
  });

  it("nao usa sombra", () => {
    expect(html(<Card>x</Card>)).not.toContain("shadow");
  });
});

describe("Statement", () => {
  it("total usa regua forte e saldo final usa traco duplo", () => {
    const out = html(
      <Statement>
        <StatementLine label="Sobra" value="R$ 1,00" kind="total" />
        <StatementLine label="Saldo" value="R$ 2,00" kind="final" />
      </Statement>,
    );
    expect(out).toContain("border-t border-tinta");
    expect(out).toContain("border-double");
  });
});

describe("CreditCard", () => {
  const props = {
    cor: "roxo" as const,
    nome: "Nubank",
    detalhe: "fatura aberta · vence 27/12",
    fatura: "R$ 0,00",
    disponivel: "Disponível R$ 2.500,00",
    limiteTexto: "0% do limite",
    rotuloDoLimite: "Uso do limite",
  };

  it("limita o uso do limite entre 0 e 100", () => {
    expect(html(<CreditCard {...props} usoDoLimite={250} />)).toContain('aria-valuenow="100"');
    expect(html(<CreditCard {...props} usoDoLimite={-5} />)).toContain('aria-valuenow="0"');
  });

  it("o nome acessivel da barra vem por prop", () => {
    expect(html(<CreditCard {...props} usoDoLimite={10} rotuloDoLimite="Limite usado" />)).toContain(
      'aria-label="Limite usado"',
    );
  });

  it("acima de 80% a barra fica coral", () => {
    expect(html(<CreditCard {...props} usoDoLimite={90} />)).toContain("bg-coral");
    expect(html(<CreditCard {...props} usoDoLimite={10} />)).toContain("bg-cartao-roxo-2");
  });
});
