export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  rank: number;
  price: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  high24h: number;
  low24h: number;
  /** Preços dos últimos 7 dias, do mais antigo ao mais recente. */
  sparkline: number[];
};

export type PricePoint = {
  time: number;
  price: number;
};
