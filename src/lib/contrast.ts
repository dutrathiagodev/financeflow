// Calculo de contraste WCAG 2.x entre duas cores hex (#rrggbb).
// Usado para conferir os tokens do design system contra a tabela do PRD (secao 7).

function canal(valor: number): number {
  const c = valor / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminancia(hex: string): number {
  const n = Number.parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return 0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
}

export function razaoDeContraste(a: string, b: string): number {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}
