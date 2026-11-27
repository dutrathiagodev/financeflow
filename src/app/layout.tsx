import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { site } from "@/content/brand";
import { urlDoSite } from "@/lib/site-url";
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
      // O script do tema escreve data-tema no <html> antes da hidratacao; o aviso seria falso.
      suppressHydrationWarning
      className={`${bricolage.variable} ${hanken.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
