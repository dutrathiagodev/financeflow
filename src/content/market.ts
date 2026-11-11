import type { Coin, MarketRow, PriceCard, TickerItem } from "@/types/market";

const btc: Coin = { symbol: "BTC", name: "Bitcoin", color: "#f7931a", glyph: "₿" };
const eth: Coin = { symbol: "ETH", name: "Ethereum", color: "#627eea", glyph: "Ξ" };
const usdt: Coin = { symbol: "USDT", name: "Tether", color: "#26a17b", glyph: "₮" };
const sol: Coin = { symbol: "SOL", name: "Solana", color: "#14f195", glyph: "S" };
const ltc: Coin = { symbol: "LTC", name: "Litecoin", color: "#d6342a", glyph: "Ł" };
const trx: Coin = { symbol: "TRX", name: "Tron", color: "#ef0027", glyph: "T" };

export const dashboardHeader = {
  breadcrumb: ["Visão geral", "Dashboard"],
  searchPlaceholder: "Buscar...",
  lastUpdateLabel: "Última atualização:",
  lastUpdateValue: "2 min atrás",
  title: "Cotações de cripto ao vivo",
};

export const ticker: TickerItem[] = [
  { pair: "BTC/USDT", price: "104.347,43", coin: btc },
  { pair: "SOL/USDT", price: "$176,34", coin: sol },
  { pair: "LTC/USDT", price: "$98,12", coin: ltc },
  { pair: "TRX/USDT", price: "$0,27", coin: trx },
  { pair: "ETH/USDT", price: "$2.687,10", coin: eth },
];

export const priceCards: PriceCard[] = [
  {
    pair: "BTC/USDT",
    name: "Bitcoin",
    price: "$109.687,6",
    change: 1.09,
    coin: btc,
    series: [10, 28, 52, 18, 30, 24, 8, 36, 74, 100, 54, 40, 78, 90],
    markers: [5, 9, 11],
    markerLabel: "+ 0,04%",
  },
  {
    pair: "ETH/USDT",
    name: "Ethereum",
    price: "$2.687,4",
    change: -2.01,
    coin: eth,
    series: [30, 60, 25, 70, 85, 40, 10, 45, 62, 30, 20, 50, 38, 55],
    markers: [4, 8],
    markerLabel: "- 0,12%",
  },
];

export const marketFilters = ["Todos", "Ganhos", "Perdas"];

export const marketOverview = {
  eyebrow: "Atualizações ao vivo",
  title: "Visão do mercado",
  columns: { rank: "Nº", coin: "Moeda", price: "Preço", change7d: "7D%", change24h: "24H%" },
};

export const marketRows: MarketRow[] = [
  { rank: 1, name: "Bitcoin", symbol: "BTC", price: "$102.648,00", change7d: 5.24, change24h: -2.13, coin: btc },
  { rank: 2, name: "Tether", symbol: "USDT", price: "$1,01", change7d: 0.18, change24h: 0.25, coin: usdt },
  { rank: 3, name: "Ethereum", symbol: "ETH", price: "$3.529,42", change7d: 3.92, change24h: -1.78, coin: eth },
  { rank: 4, name: "Solana", symbol: "SOL", price: "$141,75", change7d: -3.44, change24h: 7.85, coin: sol },
];
