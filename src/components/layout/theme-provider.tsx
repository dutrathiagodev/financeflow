"use client";

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { useEffect, type ReactNode } from "react";
import { ATRIBUTO_DO_TEMA, CHAVE_DO_TEMA, TEMAS } from "@/lib/theme";

/**
 * O storage e dado externo e nao confiavel: se alguem gravar outra coisa em `financeflow:tema`,
 * volta para "seguir o sistema" em vez de ficar com um tema que nao existe.
 */
function GuardaDoTema() {
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    const valido = theme === undefined || theme === "system" || (TEMAS as readonly string[]).includes(theme);
    if (!valido) setTheme("system");
  }, [theme, setTheme]);
  return null;
}

/**
 * Tema claro/escuro. A biblioteca injeta o script inline que aplica data-tema no <html> antes
 * da hidratacao (sem piscar), guarda a escolha em `financeflow:tema` e, na primeira visita,
 * segue prefers-color-scheme, como a plataforma exemplo.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute={ATRIBUTO_DO_TEMA}
      storageKey={CHAVE_DO_TEMA}
      themes={[...TEMAS]}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <GuardaDoTema />
      {children}
    </NextThemesProvider>
  );
}
