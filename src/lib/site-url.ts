/**
 * URL base do site, para links absolutos (canonical, Open Graph).
 * Producao: defina NEXT_PUBLIC_SITE_URL (ex.: https://financeflow.vercel.app).
 * Na Vercel usa o dominio de producao do projeto; sem nada, localhost.
 */
export function urlDoSite(env: Record<string, string | undefined> = process.env): URL {
  const explicita = env.NEXT_PUBLIC_SITE_URL;
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL;
  if (explicita) return new URL(explicita);
  if (vercel) return new URL(`https://${vercel}`);
  return new URL("http://localhost:3000");
}
