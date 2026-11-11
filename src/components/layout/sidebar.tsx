"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { NavBadgeView } from "@/components/ui/nav-badge";
import { brand, navGroups, sidebarText, welcome } from "@/content/navigation";
import { useLocalStore } from "@/lib/use-local-store";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useLocalStore<boolean>("ff:sidebar-collapsed", false);
  const [profile] = useLocalStore("ff:profile", { name: "Investidor" });

  return (
    <aside
      className={cn(
        "hidden shrink-0 flex-col overflow-y-auto border-r border-line bg-linear-to-b from-[#1b3023] via-panel to-panel py-6 transition-[width] duration-200 lg:flex",
        collapsed ? "w-20 px-3" : "w-72 px-5",
      )}
    >
      <div className={cn("flex items-center gap-3 border-b border-line pb-5", collapsed && "justify-center")}>
        {!collapsed && (
          <div className="relative aspect-[3.4/1] flex-1 overflow-hidden rounded-2xl bg-brand-dark">
            <Image
              src={brand.logo}
              alt={brand.logoAlt}
              fill
              sizes="200px"
              priority
              className="scale-[1.3] object-cover"
            />
          </div>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? sidebarText.expand : sidebarText.collapse}
          aria-expanded={!collapsed}
          className="grid size-9 place-items-center rounded-control border border-line text-ink-muted hover:text-ink"
        >
          <Icon name="chevronLeft" className={cn("size-4 transition-transform", collapsed && "rotate-180")} />
        </button>
      </div>

      {!collapsed && (
        <div className="border-b border-line py-6">
          <h2 className="text-3xl font-medium leading-tight tracking-tight">
            {welcome.greeting}
            <br />
            de volta, {profile.name}
          </h2>
          <p className="mt-3 text-sm text-ink-faint">{welcome.lastLogin}</p>
        </div>
      )}

      <nav aria-label={sidebarText.mainNav} className="flex flex-col gap-5 pt-5">
        {navGroups.map((group) => (
          <div key={group.title}>
            {!collapsed && <p className="mb-2 text-sm text-ink-faint">{group.title}</p>}
            <ul className="flex flex-col gap-1">
              {group.items.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      title={collapsed ? item.label : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-3 rounded-control px-3 py-2.5 text-base transition-colors",
                        collapsed && "justify-center",
                        active
                          ? "border border-line-strong bg-linear-to-r from-white/10 to-white/[0.02] text-ink"
                          : "border border-transparent text-ink-muted hover:text-ink",
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
    </aside>
  );
}
