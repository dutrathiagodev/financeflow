export type Holding = {
  coinId: string;
  symbol: string;
  name: string;
  image: string;
  quantity: number;
  /** Custo total pago em USD (para calcular preço médio e lucro). */
  cost: number;
};

export type TransactionType = "buy" | "sell" | "deposit" | "withdraw";

export type Transaction = {
  id: string;
  type: TransactionType;
  time: number;
  usd: number;
  coinId?: string;
  symbol?: string;
  quantity?: number;
  price?: number;
};

export type Account = {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
};
