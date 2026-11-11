"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { NavBadgeView } from "@/components/ui/nav-badge";
import { layoutText, navGroups } from "@/content/navigation";
import { isActivePath } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type NavListProps = {
  /** Mostra só os ícones. */
  collapsed?: boolean;
  onNavigate?: () => void;
};

export function NavList({ collapsed = false, onNavigate }: NavListProps) {
  const pathname = usePathname();

  return (
    <nav aria-label={layoutText.mainNav} className="flex flex-col gap-5">
      {navGroups.map((group) => (
        <div key={group.title}>
          {!collapsed && <p className="mb-2 text-sm text-ink-faint">{group.title}</p>}
          <ul className="flex flex-col gap-1">
            {group.items.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    aria-current={active ? "page" : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-control border px-3 py-2.5 text-base transition-colors",
                      collapsed && "justify-center",
                      active
                        ? "border-line-strong bg-linear-to-r from-white/10 to-white/[0.02] text-ink"
                        : "border-transparent text-ink-muted hover:text-ink",
                    )}
                  >
                    <Icon name={item.icon} className="size-5" />
                    {!collapsed && item.label}
                    {!collapsed && active && <span className="ml-auto h-3.5 w-0.5 rounded-full bg-ink" />}
                    {!collapsed && item.badge && <NavBadgeView badge={item.badge} />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
