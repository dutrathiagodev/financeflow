/** Cotação mínima de um ativo, suficiente para negociar. */
export type AssetQuote = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
};

export type Holding = {
  assetId: string;
  symbol: string;
  name: string;
  image: string;
  quantity: number;
  /** Custo total pago, em USD (base do preço médio e do lucro). */
  cost: number;
};

export type TransactionType = "buy" | "sell" | "deposit" | "withdraw";

export type Transaction = {
  id: string;
  type: TransactionType;
  time: number;
  usd: number;
  assetId?: string;
  symbol?: string;
  quantity?: number;
  price?: number;
};

export type Account = {
  cash: number;
  holdings: Holding[];
  transactions: Transaction[];
};

export type AccountError =
  | "invalid-amount"
  | "invalid-price"
  | "insufficient-funds"
  | "insufficient-holding";

/** Dados não determinísticos injetados de fora para manter o domínio puro. */
export type OperationMeta = {
  id: string;
  time: number;
};
