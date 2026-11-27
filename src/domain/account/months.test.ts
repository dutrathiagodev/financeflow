import { describe, expect, it } from "vitest";
import { deslocarMes, faixaDoMes, mesDaData } from "./months";
import type { Movimentacao } from "./types";

const m = (extra: Partial<Movimentacao> & Pick<Movimentacao, "id">): Movimentacao => ({
  descricao: extra.id,
  valor: 10,
  tipo: "despesa",
  categoria: "Lazer",
  data: "2026-11-10",
  ...extra,
});

describe("mesDaData e deslocarMes", () => {
  it("a data define o mes (RN11)", () => {
    expect(mesDaData("2026-11-30")).toBe("2026-11");
  });

  it("anda para o mes seguinte e o anterior", () => {
    expect(deslocarMes("2026-05", 1)).toBe("2026-06");
    expect(deslocarMes("2026-05", -1)).toBe("2026-04");
  });

  it("vira o ano nos dois sentidos", () => {
    expect(deslocarMes("2026-12", 1)).toBe("2027-01");
    expect(deslocarMes("2027-01", -1)).toBe("2026-12");
  });

  it("anda varios meses de uma vez", () => {
    expect(deslocarMes("2026-11", 14)).toBe("2028-01");
    expect(deslocarMes("2026-11", -11)).toBe("2025-12");
  });
});

describe("faixaDoMes", () => {
  it("reproduz o exemplo do PRD: 428,50 + 138,30 = 566,80", () => {
    const lista = [
      m({ id: "r0", tipo: "receita", valor: 500, data: "2026-10-05" }),
      m({ id: "d0", valor: 71.5, data: "2026-10-20" }),
      m({ id: "r1", tipo: "receita", valor: 300, data: "2026-11-05" }),
      m({ id: "d1", valor: 161.7, data: "2026-11-12" }),
    ];
    const faixa = faixaDoMes(lista, "2026-11");
    expect(faixa.saldoAnterior).toBe(428.5);
    expect(faixa.sobra).toBe(138.3);
    expect(faixa.saldoNoFim).toBe(566.8);
  });

  it("separa receitas e despesas do mes", () => {
    const lista = [
      m({ id: "r", tipo: "receita", valor: 100, data: "2026-11-01" }),
      m({ id: "d", valor: 30, data: "2026-11-02" }),
      m({ id: "fora", valor: 999, data: "2026-12-01" }),
    ];
    const faixa = faixaDoMes(lista, "2026-11");
    expect(faixa.receitas).toBe(100);
    expect(faixa.despesas).toBe(30);
    expect(faixa.sobra).toBe(70);
  });

  it("o saldo anterior soma as sobras de todos os meses anteriores, inclusive de outros anos", () => {
    const lista = [
      m({ id: "a", tipo: "receita", valor: 200, data: "2025-03-10" }),
      m({ id: "b", valor: 50, data: "2025-12-31" }),
      m({ id: "c", tipo: "receita", valor: 10, data: "2026-01-01" }),
    ];
    expect(faixaDoMes(lista, "2026-01").saldoAnterior).toBe(150);
    expect(faixaDoMes(lista, "2026-02").saldoAnterior).toBe(160);
  });

  it("virada de ano: dezembro fecha e janeiro abre com o mesmo valor", () => {
    const lista = [
      m({ id: "r", tipo: "receita", valor: 1000, data: "2026-12-05" }),
      m({ id: "d", valor: 250, data: "2026-12-20" }),
      m({ id: "n", valor: 100, data: "2027-01-03" }),
    ];
    const dezembro = faixaDoMes(lista, "2026-12");
    const janeiro = faixaDoMes(lista, "2027-01");
    expect(janeiro.saldoAnterior).toBe(dezembro.saldoNoFim);
    expect(janeiro.saldoNoFim).toBe(650);
  });

  it("saldo no fim do mes = saldo anterior + sobra, sempre", () => {
    const lista = [
      m({ id: "a", tipo: "receita", valor: 33.33, data: "2026-09-01" }),
      m({ id: "b", valor: 12.1, data: "2026-09-02" }),
      m({ id: "c", valor: 0.2, data: "2026-10-02" }),
      m({ id: "d", tipo: "receita", valor: 0.1, data: "2026-10-03" }),
    ];
    for (const mes of ["2026-08", "2026-09", "2026-10", "2026-11"]) {
      const f = faixaDoMes(lista, mes);
      expect(f.saldoNoFim).toBeCloseTo(f.saldoAnterior + f.sobra, 10);
    }
  });

  it("mes sem lancamentos mostra zeros e carrega o saldo anterior", () => {
    const lista = [m({ id: "r", tipo: "receita", valor: 80, data: "2026-01-10" })];
    expect(faixaDoMes(lista, "2026-06")).toEqual({
      mes: "2026-06",
      saldoAnterior: 80,
      receitas: 0,
      despesas: 0,
      sobra: 0,
      saldoNoFim: 80,
    });
  });

  it("lista vazia nao da erro: tudo zero", () => {
    expect(faixaDoMes([], "2026-11")).toEqual({
      mes: "2026-11",
      saldoAnterior: 0,
      receitas: 0,
      despesas: 0,
      sobra: 0,
      saldoNoFim: 0,
    });
  });

  it("sobra negativa e saldo negativo aparecem com o sinal certo", () => {
    const faixa = faixaDoMes([m({ id: "d", valor: 40, data: "2026-11-02" })], "2026-11");
    expect(faixa.sobra).toBe(-40);
    expect(faixa.saldoNoFim).toBe(-40);
  });

  it("parcela futura conta so no mes da propria data (RN12)", () => {
    const lista = [
      m({ id: "p1", valor: 100, data: "2026-11-10", parcela: { atual: 1, total: 3 } }),
      m({ id: "p2", valor: 100, data: "2026-12-10", parcela: { atual: 2, total: 3 } }),
      m({ id: "p3", valor: 100, data: "2027-01-10", parcela: { atual: 3, total: 3 } }),
    ];
    expect(faixaDoMes(lista, "2026-11").despesas).toBe(100);
    expect(faixaDoMes(lista, "2026-12").despesas).toBe(100);
    expect(faixaDoMes(lista, "2026-12").saldoAnterior).toBe(-100);
    expect(faixaDoMes(lista, "2027-01").saldoAnterior).toBe(-200);
    expect(faixaDoMes(lista, "2026-10").despesas).toBe(0);
  });

  it("nao altera a lista recebida", () => {
    const lista = [m({ id: "a" })];
    const copia = JSON.stringify(lista);
    faixaDoMes(lista, "2026-11");
    expect(JSON.stringify(lista)).toBe(copia);
  });
});
