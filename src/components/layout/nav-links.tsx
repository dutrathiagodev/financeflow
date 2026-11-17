"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { navItems } from "@/content/navigation";

type NavLinksProps = {
  /** "sidebar": lista vertical no menu lateral. "bottom": 5 colunas na barra inferior. */
  variant: "sidebar" | "bottom";
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Links das abas; o item da rota atual recebe `aria-current="page"`. */
export function NavLinks({ variant }: NavLinksProps) {
  const pathname = usePathname();
  const sidebar = variant === "sidebar";

  return (
    <ul className={sidebar ? "grid gap-0.5" : "grid grid-cols-5 gap-1"}>
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.id}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "rounded-base transition-colors",
                sidebar
                  ? "flex min-h-11 items-center gap-3 px-3 text-[0.95rem] font-medium"
                  : "flex min-h-[52px] flex-col items-center justify-center gap-0.5 text-[0.72rem] font-semibold",
                sidebar &&
                  (active
                    ? "bg-creme font-bold text-[#1f2f24]"
                    : "text-creme/72 hover:bg-creme/7 hover:text-creme"),
                !sidebar && (active ? "bg-primario text-primario-texto" : "text-muted hover:bg-hover"),
                sidebar && "focus-visible:outline-creme",
              )}
            >
              <Icon name={item.icon} />
              {sidebar ? item.label : item.shortLabel}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
