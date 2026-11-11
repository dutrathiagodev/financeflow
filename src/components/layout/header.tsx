import { Icon } from "@/components/ui/icon";
import { dashboardHeader } from "@/content/market";

export function Header() {
  const [parent, current] = dashboardHeader.breadcrumb;

  return (
    <header className="flex items-center gap-4 px-6 py-5 lg:px-10">
      <Icon name="home" className="size-8 text-ink-muted" />
      <nav aria-label="Breadcrumb" className="flex items-center gap-3 text-lg">
        <span className="text-ink-muted">{parent}</span>
        <span className="text-ink-faint">/</span>
        <span aria-current="page">{current}</span>
      </nav>
      <label className="ml-auto flex w-56 items-center rounded-control border border-line bg-panel-raised px-5 py-3 text-ink-muted">
        <span className="sr-only">Buscar</span>
        <input
          type="search"
          placeholder={dashboardHeader.searchPlaceholder}
          className="w-full bg-transparent text-base placeholder:text-ink-muted focus:outline-none"
        />
      </label>
    </header>
  );
}
