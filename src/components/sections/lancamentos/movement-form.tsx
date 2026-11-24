"use client";

import { useId, useState, type FormEvent } from "react";
import { useToday } from "@/application/hooks/use-today";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field, Input, Select } from "@/components/ui/field";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { errosDoFormulario, formulario } from "@/content/lancamentos";
import { categoriaPadrao, categoriasDoTipo } from "@/domain/account/categories";
import type {
  ErrosDoFormulario,
  RascunhoMovimentacao,
  TipoMovimentacao,
} from "@/domain/account/types";

type MovementFormProps = {
  /** Recebe o rascunho; devolve os erros do dominio ou nada quando salvou. */
  onAdicionar: (rascunho: RascunhoMovimentacao) => ErrosDoFormulario | null;
};

const opcoesDeTipo = [
  { value: "despesa", label: formulario.despesa, tone: "despesa" },
  { value: "receita", label: formulario.receita, tone: "receita" },
] as const;

function rascunhoVazio(tipo: TipoMovimentacao, data: string): RascunhoMovimentacao {
  return { descricao: "", valor: "", tipo, categoria: categoriaPadrao(tipo), data };
}

/** Formulario de nova movimentacao (RF01). A validacao e do dominio; aqui so ha estado e eventos. */
export function MovementForm({ onAdicionar }: MovementFormProps) {
  const prefixo = useId();
  const hojeLocal = useToday();
  const [base, setBase] = useState<RascunhoMovimentacao>(() => rascunhoVazio("despesa", ""));
  // A data fica vazia no estado ate a pessoa escolher; enquanto isso vale o dia de hoje.
  const rascunho = { ...base, data: base.data || hojeLocal };
  const [erros, setErros] = useState<ErrosDoFormulario>({});

  function alterar(campo: "descricao" | "valor" | "categoria" | "data", valor: string) {
    setBase((atual) => ({ ...atual, [campo]: valor }));
  }

  // Trocar o tipo reseta a categoria para uma valida (RN03).
  function alterarTipo(tipo: TipoMovimentacao) {
    setErros((atuais) => ({ ...atuais, categoria: undefined }));
    setBase((atual) => ({ ...atual, tipo, categoria: categoriaPadrao(tipo) }));
  }

  function enviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const resultado = onAdicionar(rascunho);
    if (resultado) {
      setErros(resultado);
      return;
    }
    setErros({});
    setBase(rascunhoVazio(rascunho.tipo, ""));
  }

  const idErro = (campo: string) => `${prefixo}-erro-${campo}`;
  const aria = (campo: keyof ErrosDoFormulario) =>
    erros[campo] ? { "aria-invalid": true, "aria-describedby": idErro(campo) } : {};
  const mensagem = (campo: keyof ErrosDoFormulario) => {
    const codigo = erros[campo];
    return codigo ? errosDoFormulario[codigo] : undefined;
  };

  return (
    <Card title={formulario.titulo}>
      <form onSubmit={enviar} noValidate>
        <SegmentedControl
          name="tipo"
          legend={formulario.tipoLegenda}
          options={[...opcoesDeTipo]}
          value={rascunho.tipo}
          onChange={(e) => alterarTipo(e.target.value as TipoMovimentacao)}
          className="mb-4"
        />
        <Field label={formulario.descricao} erro={mensagem("descricao")} erroId={idErro("descricao")}>
          <Input
            name="descricao"
            autoComplete="off"
            placeholder={formulario.descricaoExemplo}
            value={rascunho.descricao}
            onChange={(e) => alterar("descricao", e.target.value)}
            {...aria("descricao")}
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label={formulario.valor} erro={mensagem("valor")} erroId={idErro("valor")}>
            <Input
              name="valor"
              inputMode="decimal"
              autoComplete="off"
              placeholder={formulario.valorExemplo}
              value={rascunho.valor}
              onChange={(e) => alterar("valor", e.target.value)}
              {...aria("valor")}
            />
          </Field>
          <Field label={formulario.data} erro={mensagem("data")} erroId={idErro("data")}>
            <Input
              name="data"
              type="date"
              value={rascunho.data}
              onChange={(e) => alterar("data", e.target.value)}
              {...aria("data")}
            />
          </Field>
        </div>
        <Field label={formulario.categoria} erro={mensagem("categoria")} erroId={idErro("categoria")}>
          <Select
            name="categoria"
            value={rascunho.categoria}
            onChange={(e) => alterar("categoria", e.target.value)}
            {...aria("categoria")}
          >
            {categoriasDoTipo(rascunho.tipo).map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </Select>
        </Field>
        <Button type="submit" block>
          {formulario.enviar}
        </Button>
      </form>
    </Card>
  );
}
