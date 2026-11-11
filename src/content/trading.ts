import type { AccountError } from "@/domain/account/types";
import type { TransactionFilter } from "@/domain/account/transactions";

export const accountErrors: Record<AccountError, string> = {
  "invalid-amount": "Informe um valor maior que zero.",
  "invalid-price": "Cotação indisponível para esta moeda.",
  "insufficient-funds": "Saldo insuficiente.",
  "insufficient-holding": "Você não tem essa quantidade.",
};

export const walletText = {
  title: "Carteira",
  description: "Seu saldo em dólar e o valor total da conta.",
  cash: "Saldo disponível",
  invested: "Investido em moedas",
  total: "Patrimônio total",
  amountLabel: "Valor (USD)",
  deposit: { title: "Depositar", action: "Depositar", done: "Depósito realizado." },
  withdraw: { title: "Sacar", action: "Sacar", done: "Saque realizado." },
  reset: "Zerar conta",
  resetConfirm: "Isso apaga saldo, posições e histórico. Confirmar?",
  resetDone: "Conta reiniciada com saldo inicial.",
};

export const tradeText = {
  title: "Negociar",
  description: "Compre e venda moedas ao preço atual de mercado.",
  sideLabel: "Tipo de ordem",
  coin: "Moeda",
  buy: "Comprar",
  sell: "Vender",
  price: "Preço atual",
  available: "Saldo disponível",
  holding: "Você possui",
  buyAmount: "Valor a investir (USD)",
  sellAmount: "Quantidade a vender",
  estimateBuy: "Você compra aproximadamente",
  estimateSell: "Você recebe aproximadamente",
  max: "Máx.",
  submitBuy: "Confirmar compra",
  submitSell: "Confirmar venda",
  doneBuy: "Compra realizada.",
  doneSell: "Venda realizada.",
};

export const transactionsText = {
  title: "Transações",
  description: "Histórico de depósitos, saques, compras e vendas.",
  empty: "Nenhuma transação ainda. Faça um depósito ou uma compra.",
  filterLabel: "Filtrar transações",
  columns: { date: "Data", type: "Tipo", asset: "Ativo", quantity: "Quantidade", price: "Preço", total: "Total" },
  types: { buy: "Compra", sell: "Venda", deposit: "Depósito", withdraw: "Saque" },
};

export const transactionFilters: { id: TransactionFilter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "buy", label: "Compras" },
  { id: "sell", label: "Vendas" },
  { id: "cash", label: "Depósitos e saques" },
];

export const portfolioText = {
  title: "Portfólio",
  description: "Suas posições avaliadas a preço de mercado.",
  empty: "Você ainda não tem posições.",
  goTrade: "Ir para Negociar",
  total: "Valor das posições",
  pnl: "Lucro / prejuízo",
  allocation: "Alocação",
  columns: { asset: "Ativo", quantity: "Quantidade", avg: "Preço médio", price: "Preço atual", value: "Valor", pnl: "Resultado" },
};
