import type { AlertError } from "@/domain/alerts/price-alert";

export const settingsText = {
  title: "Configurações",
  description: "Personalize o FinanceFlow. Tudo fica salvo neste navegador.",
  summary: { cash: "Saldo", positions: "Posições", favorites: "Favoritos", alerts: "Alertas" },
  profile: {
    title: "Perfil",
    description: "Como o FinanceFlow chama você.",
    nameLabel: "Seu nome",
    save: "Salvar",
    saved: "Nome atualizado.",
    empty: "Informe um nome.",
  },
  preferences: {
    title: "Preferências",
    description: "Ajuste a aparência e o comportamento do painel.",
    sidebarCollapsed: "Menu lateral recolhido",
    sidebarCollapsedHint: "Mostra só os ícones do menu no computador.",
    tickerAnimated: "Faixa de cotações animada",
    tickerAnimatedHint: "A faixa do topo do Dashboard rola sozinha.",
    tableRows: "Moedas na tabela do Dashboard",
    tableRowsLabel: "Quantidade de moedas",
    initialCash: "Saldo ao zerar a conta simulada",
    initialCashHint: "Valor que a conta recebe ao ser zerada.",
  },
  alerts: {
    title: "Alertas de preço",
    description: "Seja avisado no Dashboard quando uma moeda atingir o preço que você definiu.",
    coin: "Moeda",
    direction: "Avisar quando o preço estiver",
    directionLabel: "Direção do alerta",
    target: "Preço-alvo (USD)",
    add: "Criar alerta",
    added: "Alerta criado.",
    empty: "Nenhum alerta criado.",
    remove: (name: string) => `Remover alerta de ${name}`,
    triggered: "Disparado",
    waiting: "Aguardando",
    current: "Agora",
    above: "acima de",
    below: "abaixo de",
  },
  data: {
    title: "Seus dados",
    description: "Exporte, restaure ou apague o que está salvo neste navegador.",
    export: "Exportar backup (JSON)",
    exportFileName: "financeflow-backup.json",
    import: "Importar backup",
    imported: "Backup restaurado.",
    importInvalid: "Arquivo inválido. Use um backup exportado pelo FinanceFlow.",
    clearFavorites: "Limpar favoritos",
    favoritesCleared: "Favoritos removidos.",
    resetAccount: "Zerar conta simulada",
    accountReset: "Conta reiniciada.",
    resetConfirm: "Isso apaga saldo, posições e histórico. Confirmar?",
    about: "Cotações fornecidas pela CoinGecko. As operações são uma simulação educativa.",
  },
};

export const alertErrors: Record<AlertError, string> = {
  "missing-asset": "Escolha uma moeda.",
  "invalid-target": "Informe um preço-alvo maior que zero.",
  duplicate: "Esse alerta já existe.",
  "limit-reached": "Limite de alertas atingido. Remova algum para criar outro.",
};

export const alertDirections = [
  { id: "above", label: "Acima do alvo" },
  { id: "below", label: "Abaixo do alvo" },
] as const;
