function roundTo(value: number, decimals: number) {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}

/** Arredonda um valor em dólar para centavos. */
export function roundUsd(value: number) {
  return roundTo(value, 2);
}

/** Arredonda uma quantidade de moeda para 8 casas (satoshi). */
export function roundQuantity(value: number) {
  return roundTo(value, 8);
}

export function isPositiveNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}
