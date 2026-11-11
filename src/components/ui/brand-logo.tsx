import Image from "next/image";
import { brand } from "@/content/navigation";
import { cn } from "@/lib/utils";

/** O arquivo oficial tem margens; a escala recorta até o desenho ocupar o quadro. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative aspect-[3.4/1] overflow-hidden rounded-2xl bg-brand-dark", className)}>
      <Image src={brand.logo} alt={brand.logoAlt} fill sizes="200px" priority className="scale-[1.3] object-cover" />
    </div>
  );
}
