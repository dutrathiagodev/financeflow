/** "/" so e ativa na propria raiz; as demais valem tambem para subrotas (/cartoes/novo). */
export function rotaAtiva(href: string, caminho: string | null): boolean {
  if (caminho === null) return false;
  if (href === "/") return caminho === "/";
  return caminho === href || caminho.startsWith(`${href}/`);
}
