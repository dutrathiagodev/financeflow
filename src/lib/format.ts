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

const mes = new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" });

/** "2026-11" -> "Novembro de 2026". UTC para o fuso do aparelho nao puxar o mes para tras. */
export function formatarMes(mesIso: string): string {
  const [ano, numero] = mesIso.split("-").map(Number);
  const texto = mes.format(Date.UTC(ano, numero - 1, 1));
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

/** "+ R$ 450,00" / "− R$ 311,70": sinal explicito, para nao depender so da cor (RF05). */
export function formatarComSinal(valor: number, tipo: "receita" | "despesa"): string {
  return `${tipo === "receita" ? "+" : "−"} ${reais.format(Math.abs(valor))}`;
}
