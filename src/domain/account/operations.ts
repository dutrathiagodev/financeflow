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
