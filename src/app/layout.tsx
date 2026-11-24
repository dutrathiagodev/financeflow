import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { site } from "@/content/brand";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "600"],
});

// Base para URLs absolutas (canonical, Open Graph). Em producao defina NEXT_PUBLIC_SITE_URL
// (ex.: https://financeflow.vercel.app); na Vercel usamos o dominio do deploy.
function urlDoSite(): URL {
  const explicita = process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (explicita) return new URL(explicita);
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}

export const metadata: Metadata = {
  metadataBase: urlDoSite(),
  // Paginas internas exportam so o nome ("Lançamentos") e viram "Lançamentos · FinanceFlow".
  title: { default: site.titulo, template: site.modeloDeTitulo },
  description: site.descricao,
  applicationName: site.nomeCurto,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nomeCurto,
    title: site.titulo,
    description: site.descricao,
    url: "/",
  },
  twitter: { card: "summary", title: site.titulo, description: site.descricao },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: site.corDoTemaClaro },
    { media: "(prefers-color-scheme: dark)", color: site.corDoTemaEscuro },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.idioma}
      className={`${bricolage.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
