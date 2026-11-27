import { novoId } from "../shared/id";
import { ok, type Result } from "../shared/result";
import type { ErrosDoFormulario, Movimentacao, RascunhoMovimentacao } from "./types";
import { validarMovimentacao } from "./validation";

/** Da mais recente para a mais antiga; em empate de data, a adicionada por ultimo fica em cima. */
export function ordenarPorData(lista: readonly Movimentacao[]): Movimentacao[] {
  return lista
    .map((m, indice) => ({ m, indice }))
    .sort((a, b) => (a.m.data === b.m.data ? a.indice - b.indice : a.m.data < b.m.data ? 1 : -1))
    .map(({ m }) => m);
}

/** RF01: valida o rascunho e devolve a lista nova com a movimentacao no lugar certo. */
export function adicionarMovimentacao(
  lista: readonly Movimentacao[],
  rascunho: RascunhoMovimentacao,
  gerarId: () => string = novoId,
): Result<Movimentacao[], ErrosDoFormulario> {
  const validada = validarMovimentacao(rascunho);
  if (!validada.ok) return validada;
  return ok(ordenarPorData([{ id: gerarId(), ...validada.valor }, ...lista]));
}

/** RF04: devolve a lista sem a movimentacao de id informado. Id que nao existe nao muda nada. */
export function excluirMovimentacao(lista: readonly Movimentacao[], id: string): Movimentacao[] {
  return lista.filter((m) => m.id !== id);
}

/** Onde a movimentacao estava na lista, para o "Desfazer" devolve-la ao mesmo lugar. */
export type PosicaoOriginal = {
  indice: number;
  /** Quem vinha logo depois (mais antiga ou de mesma data); null se era a ultima. */
  proximoId: string | null;
  /** Quem vinha logo antes; null se era a primeira. */
  anteriorId: string | null;
};

/** Posicao de uma movimentacao na lista, ou null se o id nao existe. Chame antes de excluir. */
export function posicaoDe(lista: readonly Movimentacao[], id: string): PosicaoOriginal | null {
  const indice = lista.findIndex((m) => m.id === id);
  if (indice === -1) return null;
  return { indice, proximoId: lista[indice + 1]?.id ?? null, anteriorId: lista[indice - 1]?.id ?? null };
}

/**
 * RF04 (Desfazer): coloca de volta a movimentacao excluida, na posicao em que estava.
 * Os vizinhos de antes mandam mais que o indice: se algo foi adicionado nesse meio tempo, a
 * movimentacao volta logo antes de quem vinha depois dela (ou logo depois de quem vinha antes),
 * e nao antes de itens mais novos de mesma data. Se nenhum vizinho existe mais, usa o indice
 * limitado ao tamanho atual. Por fim a ordem por data e refeita, entao nada cai fora do lugar.
 */
export function restaurarMovimentacao(
  lista: readonly Movimentacao[],
  movimentacao: Movimentacao,
  original: PosicaoOriginal,
): Movimentacao[] {
  if (lista.some((m) => m.id === movimentacao.id)) return [...lista];
  const antesDoProximo = lista.findIndex((m) => m.id === original.proximoId);
  const depoisDoAnterior = lista.findIndex((m) => m.id === original.anteriorId);
  const porIndice = Math.min(Math.max(original.indice, 0), lista.length);
  const posicao =
    antesDoProximo !== -1 ? antesDoProximo : depoisDoAnterior !== -1 ? depoisDoAnterior + 1 : porIndice;
  return ordenarPorData([...lista.slice(0, posicao), movimentacao, ...lista.slice(posicao)]);
}
