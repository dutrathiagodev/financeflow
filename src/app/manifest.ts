import type { MetadataRoute } from "next";
import { site } from "@/content/brand";

// Manifesto do app: nome, cores e icones ao instalar na tela inicial.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.titulo,
    short_name: site.nomeCurto,
    description: site.descricao,
    lang: site.idioma,
    start_url: "/",
    display: "standalone",
    background_color: site.corDoTemaClaro,
    theme_color: site.corDoTemaClaro,
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
