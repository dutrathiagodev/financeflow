"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/icon";
import { layoutText } from "@/content/navigation";

export function HeaderSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const term = query.trim();
    router.push(term ? `/trends?q=${encodeURIComponent(term)}` : "/trends");
  };

  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className="ml-auto flex w-40 items-center gap-2 rounded-control border border-line bg-panel-raised px-4 py-3 text-ink-muted focus-within:border-line-strong sm:w-56"
    >
      <Icon name="search" className="size-4" />
      <label className="flex-1">
        <span className="sr-only">{layoutText.search.label}</span>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={layoutText.search.placeholder}
          className="w-full bg-transparent text-base placeholder:text-ink-muted focus:outline-none"
        />
      </label>
    </form>
  );
}
