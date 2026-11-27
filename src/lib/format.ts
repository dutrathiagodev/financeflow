// Formatacao para a tela (apresentacao). Nao arredonda: o arredondamento a centavos e do dominio.

const reais = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** "R$ 566,80" (com espaco sem quebra, para o valor nao partir em duas linhas). */
export function formatarReais(valor: number): string {
  return reais.format(valor);
}

/** "2026-11-27" -> "27/11/2026". Troca de lugar o texto, sem Date, para o fuso nao mudar o dia. */
export function formatarData(dataIso: string): string {
  const [ano, mes, dia] = dataIso.split("-");
  return `${dia}/${mes}/${ano}`;
}

/** "+ R$ 450,00" / "− R$ 311,70": sinal explicito, para nao depender so da cor (RF05). */
export function formatarComSinal(valor: number, tipo: "receita" | "despesa"): string {
  return `${tipo === "receita" ? "+" : "−"} ${reais.format(Math.abs(valor))}`;
}
