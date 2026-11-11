"use client";

import { useLocalStore } from "@/lib/use-local-store";

export function useFavorites() {
  const [ids, setIds] = useLocalStore<string[]>("ff:favorites", []);

  const toggle = (id: string) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return { ids, toggle, has: (id: string) => ids.includes(id) };
}
