export type RawMarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  market_cap_rank: number | null;
  current_price: number | null;
  price_change_percentage_24h_in_currency?: number | null;
  price_change_percentage_7d_in_currency?: number | null;
  market_cap: number | null;
  total_volume: number | null;
  high_24h: number | null;
  low_24h: number | null;
  sparkline_in_7d?: { price: number[] };
};

export type RawMarketChart = {
  prices: [number, number][];
};
