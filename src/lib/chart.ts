/** Reduz a série a `points` pontos e normaliza para a faixa 0-100. */
export function toChartSeries(values: number[], points = 28) {
  if (values.length < 2) return { series: [0, 0], markers: [] as number[] };
  const step = (values.length - 1) / (points - 1);
  const sampled = Array.from({ length: points }, (_, i) => values[Math.round(i * step)]);
  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const range = max - min || 1;
  const series = sampled.map((v) => ((v - min) / range) * 100);
  const markers = [series.indexOf(100), series.length - 1];
  return { series, markers };
}
