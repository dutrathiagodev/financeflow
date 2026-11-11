/** Rótulo relativo para pontos horários: "Agora", "há 5 h", "há 2 d 3 h". */
export function hoursAgoLabel(hoursAgo: number): string {
  if (hoursAgo <= 0) return "Agora";
  if (hoursAgo < 24) return `há ${hoursAgo} h`;
  return `há ${Math.floor(hoursAgo / 24)} d ${hoursAgo % 24} h`;
}

/** Rótulo de data para o histórico, mais detalhado quanto menor o período. */
export function timeLabel(time: number, days: number): string {
  const date = new Date(time);
  if (days <= 1) return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return date.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    ...(days <= 7 ? { hour: "2-digit", minute: "2-digit" } : {}),
  });
}
