"use client";

import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Icon } from "@/components/ui/icon";
import { layoutText } from "@/content/navigation";
import { NavList } from "./nav-list";

/** Menu em gaveta para telas menores que `lg`, onde a sidebar fica oculta. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={layoutText.openMenu}
        aria-expanded={open}
        className="grid size-10 place-items-center rounded-control border border-line text-ink-muted transition-colors hover:text-ink"
      >
        <Icon name="menu" className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label={layoutText.mainNav}>
          <div className="flex w-72 max-w-[85vw] flex-col gap-6 overflow-y-auto bg-linear-to-b from-[#1b3023] via-panel to-panel p-5">
            <div className="flex items-center gap-3">
              <BrandLogo className="flex-1" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={layoutText.closeMenu}
                className="grid size-9 place-items-center rounded-control border border-line text-ink-muted hover:text-ink"
              >
                <Icon name="close" className="size-4" />
              </button>
            </div>
            <NavList onNavigate={() => setOpen(false)} />
          </div>
          <button
            type="button"
            aria-label={layoutText.closeMenu}
            onClick={() => setOpen(false)}
            className="flex-1 bg-black/60"
          />
        </div>
      )}
    </div>
  );
}
