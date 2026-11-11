export function parseFavorites(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const ids = raw.filter((item): item is string => typeof item === "string" && item.length > 0);
  return [...new Set(ids)];
}

/** Adiciona o id se ausente, remove se presente. Não altera a lista original. */
export function toggleFavorite(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
}
