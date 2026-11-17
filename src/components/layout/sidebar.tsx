import { layoutText } from "@/content/navigation";
import { Brand } from "./brand";
import { NavLinks } from "./nav-links";
import { StorageNotice } from "./storage-notice";

/** Menu lateral fixo (232 px), visível a partir do desktop. */
export function Sidebar() {
  return (
    <aside
      className="sticky top-0 hidden h-screen flex-col overflow-y-auto bg-lateral px-3 pt-6 pb-4 text-creme lg:flex"
    >
      <Brand variant="sidebar" className="px-2.5 pb-[26px]" />
      <nav aria-label={layoutText.mainNavLabel}>
        <NavLinks variant="sidebar" />
      </nav>
      <StorageNotice className="mt-auto border-t border-creme/18 pt-4" />
    </aside>
  );
}
