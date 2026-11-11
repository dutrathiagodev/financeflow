import type { NavGroup, NavItem } from "@/types/navigation";

/** "/" só é ativo na raiz; os demais ativam também em subrotas. */
export function isActivePath(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function findNavItem(groups: NavGroup[], pathname: string): NavItem | undefined {
  return groups.flatMap((group) => group.items).find((item) => isActivePath(pathname, item.href));
}
