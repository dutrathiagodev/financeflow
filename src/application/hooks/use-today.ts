"use client";

import { useSyncExternalStore } from "react";
import { hoje } from "@/domain/shared/dates";

const semAssinatura = () => () => {};

/**
 * Data de hoje ("AAAA-MM-DD") no fuso do aparelho. No servidor devolve "" (o servidor pode estar
 * em outro fuso e o Next nao deixa ler a hora durante a pre-renderizacao); no navegador troca para
 * o dia real sem erro de hidratacao.
 */
export function useToday(): string {
  return useSyncExternalStore(semAssinatura, () => hoje(), () => "");
}
