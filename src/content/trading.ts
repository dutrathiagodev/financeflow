export const simulationNotice = "Simulação: nenhum dinheiro real é usado. Os dados ficam salvos só neste navegador.";

export const walletText = {
  title: "Carteira",
  description: "Seu saldo em dólar e o valor total da conta.",
  cash: "Saldo disponível",
  invested: "Investido em moedas",
  total: "Patrimônio total",
  depositTitle: "Depositar",
  withdrawTitle: "Sacar",
  amountLabel: "Valor (USD)",
  deposit: "Depositar",
  withdraw: "Sacar",
  depositDone: "Depósito realizado.",
  withdrawDone: "Saque realizado.",
  reset: "Zerar conta",
  resetConfirm: "Isso apaga saldo, posições e histórico. Confirmar?",
  resetDone: "Conta reiniciada com saldo inicial.",
};

export const tradeText = {
  title: "Negociar",
  description: "Compre e venda moedas ao preço atual de mercado.",
  coin: "Moeda",
  buy: "Comprar",
  sell: "Vender",
  price: "Preço atual",
  available: "Saldo disponível",
  holding: "Você possui",
  buyAmount: "Valor a investir (USD)",
  sellAmount: "Quantidade a vender",
  estimate: "Você recebe aproximadamente",
  estimateBuy: "Você compra aproximadamente",
  max: "Máx.",
  submitBuy: "Confirmar compra",
  submitSell: "Confirmar venda",
  doneBuy: "Compra realizada.",
  doneSell: "Venda realizada.",
  unavailable: "Não foi possível carregar as cotações agora.",
};

export const transactionsText = {
  title: "Transações",
  description: "Histórico de depósitos, saques, compras e vendas.",
  empty: "Nenhuma transação ainda. Faça um depósito ou uma compra.",
  columns: { date: "Data", type: "Tipo", asset: "Ativo", quantity: "Quantidade", price: "Preço", total: "Total" },
  types: { buy: "Compra", sell: "Venda", deposit: "Depósito", withdraw: "Saque" },
  filters: [
    { id: "all", label: "Todas" },
    { id: "buy", label: "Compras" },
    { id: "sell", label: "Vendas" },
    { id: "cash", label: "Depósitos e saques" },
  ],
};

export const portfolioText = {
  title: "Portfólio",
  description: "Suas posições avaliadas a preço de mercado.",
  empty: "Você ainda não tem posições.",
  goTrade: "Ir para Negociar",
  total: "Valor das posições",
  pnl: "Lucro / prejuízo",
  allocation: "Alocação",
  columns: { asset: "Ativo", quantity: "Quantidade", avg: "Preço médio", price: "Preço atual", value: "Valor", pnl: "Resultado" },
  unavailable: "Não foi possível carregar as cotações agora.",
};
