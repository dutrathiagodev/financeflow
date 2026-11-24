"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { tema } from "@/content/theme";

const semAssinatura = () => () => {};

/**
 * Alterna entre claro e escuro. Lua no claro e sol no escuro, trocados por CSS
 * (sem depender do JavaScript para escolher o icone). O estado anunciado (aria-pressed)
 * so existe depois de montar, quando o tema real ja e conhecido.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const montado = useSyncExternalStore(semAssinatura, () => true, () => false);
  const escuro = resolvedTheme === "dark";

  return (
    <IconButton
      aria-label={tema.alternar}
      aria-pressed={montado ? escuro : undefined}
      onClick={() => setTheme(escuro ? "light" : "dark")}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="size-[18px] fill-none stroke-current dark:hidden"
        strokeWidth="1.9"
        strokeLinecap="square"
      >
        <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="hidden size-[18px] fill-none stroke-current dark:block"
        strokeWidth="1.9"
        strokeLinecap="square"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </IconButton>
  );
}
