"use client";

import { useSidebarState } from "@/application/hooks/use-sidebar-state";
import { BrandLogo } from "@/components/ui/brand-logo";
import { Icon } from "@/components/ui/icon";
import { layoutText } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { NavList } from "./nav-list";
import { WelcomeCard } from "./welcome-card";

export function Sidebar() {
  const { collapsed, toggle } = useSidebarState();

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col overflow-y-auto border-r border-line bg-linear-to-b from-[#1b3023] via-panel to-panel py-6 transition-[width] duration-200 lg:flex",
        collapsed ? "w-20 px-3" : "w-72 px-5",
      )}
    >
      <div className={cn("flex items-center gap-3 border-b border-line pb-5", collapsed && "justify-center")}>
        {!collapsed && <BrandLogo className="flex-1" />}
        <button
          type="button"
          onClick={toggle}
          aria-label={collapsed ? layoutText.expand : layoutText.collapse}
          aria-expanded={!collapsed}
          className="grid size-9 place-items-center rounded-control border border-line text-ink-muted transition-colors hover:text-ink"
        >
          <Icon name="chevronLeft" className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {!collapsed && <WelcomeCard />}

      <div className="pt-5">
        <NavList collapsed={collapsed} />
      </div>
    </aside>
  );
}
