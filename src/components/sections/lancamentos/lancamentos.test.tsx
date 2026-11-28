// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { Lancamentos } from "./lancamentos";

// Diz ao React que este ambiente de teste usa act().
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

let raiz: Root;
let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
  raiz = createRoot(container);
});

afterEach(() => {
  act(() => raiz.unmount());
  container.remove();
});

/** Escreve num campo como a pessoa escreveria, para o React perceber a mudanca. */
function escrever(campo: HTMLInputElement | HTMLSelectElement, valor: string) {
  const proto = campo instanceof HTMLSelectElement ? HTMLSelectElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value")!.set!.call(campo, valor);
  campo.dispatchEvent(new Event(campo instanceof HTMLSelectElement ? "change" : "input", { bubbles: true }));
}

type Dado = { tipo: "receita" | "despesa"; descricao: string; valor: string; data: string; categoria: string };

// Os mesmos seis lancamentos das fotos de evidencia do FF-0023: duas despesas de Lazer.
const DADOS: Dado[] = [
  { tipo: "receita", descricao: "Mesada de novembro", valor: "450", data: "2026-11-05", categoria: "Mesada" },
  { tipo: "despesa", descricao: "Almoço no refeitório", valor: "25,50", data: "2026-11-20", categoria: "Alimentação" },
  { tipo: "despesa", descricao: "Cinema com a turma", valor: "38", data: "2026-11-22", categoria: "Lazer" },
  { tipo: "receita", descricao: "Freela de design", valor: "300", data: "2026-10-28", categoria: "Freelance" },
  { tipo: "despesa", descricao: "Passagem de ônibus", valor: "5,50", data: "2026-11-24", categoria: "Transporte" },
  { tipo: "despesa", descricao: "Jogo no fliperama", valor: "20", data: "2026-10-30", categoria: "Lazer" },
];

function adicionar(d: Dado) {
  const form = container.querySelector("form")!;
  act(() => {
    form.querySelector<HTMLInputElement>(`input[name=tipo][value=${d.tipo}]`)!.click();
  });
  act(() => {
    escrever(form.querySelector<HTMLInputElement>("[name=descricao]")!, d.descricao);
    escrever(form.querySelector<HTMLInputElement>("[name=valor]")!, d.valor);
    escrever(form.querySelector<HTMLInputElement>("[name=data]")!, d.data);
    escrever(form.querySelector<HTMLSelectElement>("[name=categoria]")!, d.categoria);
  });
  act(() => form.requestSubmit());
}

const linhas = () => Array.from(container.querySelectorAll("li strong")).map((e) => e.textContent);
const contagem = () => container.querySelector("[role=status]")?.textContent ?? "";
const botoesLimpar = () =>
  Array.from(container.querySelectorAll("button")).filter((b) => b.textContent === "Limpar filtros");
const selectsDeFiltro = () => container.querySelectorAll<HTMLSelectElement>("select:not([name])");
const resumo = () => container.querySelector('[aria-label="Resumo financeiro"]')?.textContent ?? "";

function filtrarDespesasDeLazer() {
  act(() => container.querySelector<HTMLInputElement>("input[name=filtro-tipo][value=despesa]")!.click());
  act(() => escrever(selectsDeFiltro()[0], "Lazer"));
}

describe("Lancamentos: filtrar so as despesas de Lazer e limpar (FF-0023)", () => {
  beforeEach(() => {
    act(() => raiz.render(<Lancamentos />));
    DADOS.forEach(adicionar);
  });

  it("depois de lancar, a lista mostra as seis, sem botao de limpar", () => {
    expect(linhas()).toHaveLength(6);
    expect(contagem()).toBe("Mostrando 6 de 6");
    expect(botoesLimpar()).toHaveLength(0);
  });

  it("Despesa + Lazer mostra so as duas despesas de Lazer, 2 de 6, com o botao de limpar", () => {
    filtrarDespesasDeLazer();
    expect(linhas()).toHaveLength(2);
    expect(new Set(linhas())).toEqual(new Set(["Cinema com a turma", "Jogo no fliperama"]));
    expect(contagem()).toBe("Mostrando 2 de 6");
    expect(botoesLimpar()).toHaveLength(1);
  });

  it("os totais do topo continuam com todos os lancamentos enquanto filtra", () => {
    const antes = resumo();
    filtrarDespesasDeLazer();
    expect(resumo()).toBe(antes);
    expect(resumo()).toContain("750,00");
    expect(resumo()).toContain("89,00");
  });

  it("clicar em Limpar filtros devolve as seis linhas e os filtros ao padrao", () => {
    filtrarDespesasDeLazer();
    expect(linhas()).toHaveLength(2);

    act(() => botoesLimpar()[0].click());

    expect(linhas()).toHaveLength(6);
    expect(contagem()).toBe("Mostrando 6 de 6");
    expect(botoesLimpar()).toHaveLength(0);
    expect(container.querySelector<HTMLInputElement>("input[name=filtro-tipo]:checked")!.value).toBe("todos");
    expect(selectsDeFiltro()[0].value).toBe("todos");
    expect(selectsDeFiltro()[1].value).toBe("todos");
    expect(selectsDeFiltro()[2].value).toBe("todos");
  });

  it("limpar tambem funciona no estado sem resultado", () => {
    // Receitas de Lazer nao existem: o tipo "Receitas" ja troca a categoria para uma valida,
    // entao o jeito de chegar a zero resultados e combinar com o pagamento "Cartao".
    act(() => escrever(selectsDeFiltro()[1], "cartao"));
    expect(linhas()).toHaveLength(0);
    expect(contagem()).toBe("Mostrando 0 de 6");
    expect(botoesLimpar()).toHaveLength(1);

    act(() => botoesLimpar()[0].click());
    expect(linhas()).toHaveLength(6);
  });
});
