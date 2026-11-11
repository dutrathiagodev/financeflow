export type Coin = {
  symbol: string;
  name: string;
  color: string;
  glyph: string;
};

export type TickerItem = {
  pair: string;
  price: string;
  coin: Coin;
};

export type PriceCard = {
  pair: string;
  name: string;
  price: string;
  change: number;
  coin: Coin;
  /** Pontos do gráfico (0 a 100), do mais antigo ao mais recente. */
  series: number[];
  /** Índices da série que recebem marcador. */
  markers: number[];
  markerLabel: string;
};

export type MarketRow = {
  rank: number;
  name: string;
  symbol: string;
  price: string;
  change7d: number;
  change24h: number;
  coin: Coin;
};
