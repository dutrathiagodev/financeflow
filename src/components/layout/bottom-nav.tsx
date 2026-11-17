import { layoutText } from "@/content/navigation";
import { NavLinks } from "./nav-links";

/** Barra de abas fixa embaixo, só no celular e tablet. */
export function BottomNav() {
  return (
    <nav
      aria-label={layoutText.bottomNavLabel}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-regua-forte bg-painel px-1 pt-1 pb-[calc(6px+env(safe-area-inset-bottom))] lg:hidden"
    >
      <NavLinks variant="bottom" />
    </nav>
  );
}
