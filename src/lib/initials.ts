/** Até duas iniciais em maiúsculas: "ana maria silva" -> "AM". Nome vazio vira "?". */
export function initialsOf(name: string): string {
  const letters = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase());
  return letters.length > 0 ? letters.join("") : "?";
}
