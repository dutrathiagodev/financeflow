"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { navGroups, searchText } from "@/content/navigation";

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const current =
    navGroups
      .flatMap((g) => g.items)
      .find((i) => (i.href === "/" ? pathname === "/" : pathname.startsWith(i.href)))?.label ?? "";

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    router.push(q ? `/trends?q=${encodeURIComponent(q)}` : "/trends");
  };

  return (
    <header className="flex items-center gap-4 px-6 py-5 lg:px-10">
      <Icon name="home" className="size-8 text-ink-muted" />
      <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-lg">
        <span className="text-ink-muted">{searchText.home}</span>
        <span className="text-ink-faint">/</span>
        <span aria-current="page">{current}</span>
      </nav>
      <form
        role="search"
        onSubmit={onSubmit}
        className="ml-auto flex w-56 items-center gap-2 rounded-control border border-line bg-panel-raised px-4 py-3 text-ink-muted focus-within:border-line-strong"
      >
        <Icon name="search" className="size-4" />
        <label className="flex-1">
          <span className="sr-only">{searchText.label}</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchText.placeholder}
            className="w-full bg-transparent text-base placeholder:text-ink-muted focus:outline-none"
          />
        </label>
      </form>
    </header>
  );
}
