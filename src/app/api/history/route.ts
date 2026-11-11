import { NextResponse } from "next/server";
import { getHistory } from "@/infrastructure/composition";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const result = await getHistory(searchParams.get("id") ?? "", Number(searchParams.get("days")));

  if (result.ok) return NextResponse.json({ points: result.value });

  const status = result.error === "invalid-request" ? 400 : 502;
  return NextResponse.json({ error: result.error }, { status });
}
