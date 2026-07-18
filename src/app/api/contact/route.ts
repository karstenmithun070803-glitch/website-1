import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json(
      { error: "name, email, and message are required" },
      { status: 400 },
    );
  }

  console.log("[contact]", {
    name: body.name,
    email: body.email,
    message: body.message,
    timestamp: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
