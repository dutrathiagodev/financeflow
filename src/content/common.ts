export const commonText = {
  unavailable: "Não foi possível carregar as cotações agora. Tente novamente em instantes.",
  simulationNotice: "Simulação: nenhum dinheiro real é usado. Os dados ficam salvos só neste navegador.",
  favoriteLabel: (name: string, active: boolean) =>
    active ? `Remover ${name} dos favoritos` : `Favoritar ${name}`,
};
