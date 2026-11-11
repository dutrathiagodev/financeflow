"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { layoutText, navGroups } from "@/content/navigation";
import { findNavItem } from "@/lib/navigation";
import { HeaderSearch } from "./header-search";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const current = findNavItem(navGroups, usePathname())?.label ?? "";

  return (
    <header className="flex items-center gap-4 px-6 py-5 lg:px-10">
      <MobileNav />
      <Icon name="home" className="hidden size-8 text-ink-muted sm:block" />
      <nav aria-label={layoutText.breadcrumbLabel} className="flex items-center gap-3 text-lg">
        <span className="hidden text-ink-muted sm:inline">{layoutText.home}</span>
        <span className="hidden text-ink-faint sm:inline">/</span>
        <span aria-current="page">{current}</span>
      </nav>
      <HeaderSearch />
    </header>
  );
}
