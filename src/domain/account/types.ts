export type TipoMovimentacao = "receita" | "despesa";

export type Movimentacao = {
  id: string;
  descricao: string;
  /** Em reais, sempre maior que zero; o sinal vem do tipo. */
  valor: number;
  tipo: TipoMovimentacao;
  categoria: string;
  /** "AAAA-MM-DD" */
  data: string;
  /** Presente so em compras parceladas (RN12). O divisor de parcelas entra no card FF-0032. */
  parcela?: { atual: number; total: number };
};

/** O que a pessoa digitou no formulario, ainda sem validar. */
export type RascunhoMovimentacao = {
  descricao: string;
  valor: string;
  tipo: TipoMovimentacao;
  categoria: string;
  data: string;
};

export type CampoDoFormulario = "descricao" | "valor" | "categoria" | "data";

/** Codigos de erro da RN02. O texto mostrado fica em src/content. */
export type CodigoDeErro =
  | "descricao-vazia"
  | "valor-invalido"
  | "categoria-invalida"
  | "data-ausente"
  | "data-invalida";

export type ErrosDoFormulario = Partial<Record<CampoDoFormulario, CodigoDeErro>>;
