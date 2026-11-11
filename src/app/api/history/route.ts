import { NextResponse } from "next/server";
import { getCoinHistory } from "@/lib/coingecko";

const ALLOWED_DAYS = new Set([1, 7, 30, 90, 365]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id") ?? "";
  const days = Number(searchParams.get("days"));

  if (!/^[a-z0-9-]{1,64}$/.test(id) || !ALLOWED_DAYS.has(days)) {
    return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
  }

  const points = await getCoinHistory(id, days);
  return NextResponse.json({ points });
}
