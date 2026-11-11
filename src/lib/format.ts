export function formatUsd(value: number) {
  const digits = value >= 1000 ? 2 : value >= 1 ? 2 : 4;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

export function formatCompactUsd(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number) {
  const abs = Math.abs(value).toFixed(2).replace(".", ",");
  return `${value >= 0 ? "+" : "-"} ${abs}%`;
}

export function formatQuantity(value: number) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 8 }).format(value);
}
