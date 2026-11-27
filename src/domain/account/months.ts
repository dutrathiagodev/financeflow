import { arredondar, somar } from "../shared/money";
import type { Movimentacao } from "./types";

/** "AAAA-MM", o mes de uma data (RN11: a data define o mes). */
export type Mes = string;

/** RF15 e RF17: os cinco valores da faixa do mes. */
export type FaixaDoMes = {
  mes: Mes;
  /** Soma das sobras de todos os meses anteriores (RN11). */
  saldoAnterior: number;
  receitas: number;
  despesas: number;
  /** Receitas - despesas do mes (RN11). */
  sobra: number;
  /** Saldo anterior + sobra. */
  saldoNoFim: number;
};

/** O mes ("AAAA-MM") de uma data "AAAA-MM-DD". */
export function mesDaData(dataIso: string): Mes {
  return dataIso.slice(0, 7);
}

/**
 * Mes seguinte ou anterior, virando o ano quando precisa ("2026-12" +1 = "2027-01").
 * `passo` pode ser negativo.
 */
export function deslocarMes(mes: Mes, passo: number): Mes {
  const [ano, numero] = mes.split("-").map(Number);
  const indice = ano * 12 + (numero - 1) + passo;
  const novoAno = Math.floor(indice / 12);
  const novoMes = (indice % 12) + 1;
  return `${String(novoAno).padStart(4, "0")}-${String(novoMes).padStart(2, "0")}`;
}

const sinal = (m: Movimentacao) => (m.tipo === "receita" ? m.valor : -m.valor);

/**
 * RF15, RF17 e RN11: receitas, despesas e sobra do mes, e o saldo anterior (soma das sobras dos
 * meses anteriores) ja acumulado. Mes sem lancamentos devolve zeros no que for do proprio mes.
 *
 * RN12: uma parcela futura conta no mes da propria data, nunca antes. Por isso aqui nao ha
 * filtro de "hoje": a data da movimentacao ja decide em que mes ela cai.
 * Recebe a lista inteira, nunca a filtrada.
 */
export function faixaDoMes(movimentacoes: readonly Movimentacao[], mes: Mes): FaixaDoMes {
  const anteriores = movimentacoes.filter((m) => mesDaData(m.data) < mes);
  const doMes = movimentacoes.filter((m) => mesDaData(m.data) === mes);
  const saldoAnterior = somar(...anteriores.map(sinal));
  const receitas = somar(...doMes.filter((m) => m.tipo === "receita").map((m) => m.valor));
  const despesas = somar(...doMes.filter((m) => m.tipo === "despesa").map((m) => m.valor));
  const sobra = somar(receitas, -despesas);
  return {
    mes,
    saldoAnterior,
    receitas,
    despesas,
    sobra,
    saldoNoFim: arredondar(somar(saldoAnterior, sobra)),
  };
}
