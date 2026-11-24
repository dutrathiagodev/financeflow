import { ehDataIso } from "../shared/dates";
import { lerValor } from "../shared/money";
import { falha, ok, type Result } from "../shared/result";
import { categoriaValida } from "./categories";
import type { ErrosDoFormulario, Movimentacao, RascunhoMovimentacao } from "./types";

export type NovaMovimentacao = Omit<Movimentacao, "id">;

/**
 * RN02: descricao obrigatoria, valor maior que zero e data escolhida.
 * Alem disso a categoria precisa pertencer ao tipo (RN03).
 * Funcao pura: devolve a movimentacao limpa ou um codigo de erro por campo.
 */
export function validarMovimentacao(
  rascunho: RascunhoMovimentacao,
): Result<NovaMovimentacao, ErrosDoFormulario> {
  const erros: ErrosDoFormulario = {};

  const descricao = rascunho.descricao.trim();
  if (descricao === "") erros.descricao = "descricao-vazia";

  const valor = lerValor(rascunho.valor);
  if (valor === null || valor <= 0) erros.valor = "valor-invalido";

  if (!categoriaValida(rascunho.tipo, rascunho.categoria)) erros.categoria = "categoria-invalida";

  if (rascunho.data.trim() === "") erros.data = "data-ausente";
  else if (!ehDataIso(rascunho.data)) erros.data = "data-invalida";

  if (Object.keys(erros).length > 0 || valor === null) return falha(erros);

  return ok({
    descricao,
    valor,
    tipo: rascunho.tipo,
    categoria: rascunho.categoria,
    data: rascunho.data,
  });
}
