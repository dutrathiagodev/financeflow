import { roundQuantity, roundUsd } from "@/domain/money";

export type OrderSide = "buy" | "sell";

/**
 * Estimativa exibida antes de confirmar.
 * Compra: informa-se dólares e recebe-se quantidade. Venda: informa-se quantidade e recebe-se dólares.
 */
export function estimateOrder(side: OrderSide, amount: number, price: number): number {
  if (!(amount > 0) || !(price > 0)) return 0;
  return side === "buy" ? roundQuantity(amount / price) : roundUsd(amount * price);
}
