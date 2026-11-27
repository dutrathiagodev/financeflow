import { Logo } from "./logo";
import { SideNav } from "./main-nav";

/** Menu lateral fixo de 232px. Some abaixo de 1024px (a barra inferior assume). */
export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen flex-col bg-lateral px-3 pb-4 pt-6 text-creme lg:flex">
      <div className="mb-8 px-3">
        <Logo variante="escuro" tamanho="md" comSlogan />
      </div>
      <SideNav />
    </aside>
  );
}
