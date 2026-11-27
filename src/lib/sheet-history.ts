/**
 * A gaveta aberta ganha uma entrada no historico para o botao voltar do celular fechar so ela.
 * Quando a gaveta fecha, essa entrada sobra e precisa sair, com `history.back()`. Mas so se o
 * fechamento partiu da propria gaveta (Esc, Fechar, toque no fundo, adicionar).
 *
 * Se a gaveta sumiu porque a tela mudou (a pessoa navegou para outra rota), a rota nova ja foi
 * empilhada depois da entrada da gaveta: `history.back()` desfaria a navegacao e levaria de volta
 * a tela anterior. Nesse caso a entrada sobra no historico, o que e inofensivo.
 */
export function deveRemoverEntradaDaGaveta(estado: {
  /** A entrada da gaveta ainda esta no historico (o botao voltar nao a consumiu). */
  entradaAberta: boolean;
  /** O componente esta saindo da tela (desmontou), em vez de so fechar a gaveta. */
  desmontando: boolean;
  caminhoAoAbrir: string;
  caminhoAgora: string;
}): boolean {
  if (!estado.entradaAberta) return false;
  if (estado.desmontando) return false;
  return estado.caminhoAgora === estado.caminhoAoAbrir;
}
