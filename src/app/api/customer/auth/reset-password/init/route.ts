import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordInit } from '@/lib/customer/client';
import { errorResponse } from '@/lib/customer/route-helpers';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültige Anfrage.', status: 400 }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email) {
    return NextResponse.json(
      { message: 'E-Mail-Adresse ist erforderlich.', status: 400 },
      { status: 400 },
    );
  }

  try {
    await resetPasswordInit(email);
  } catch (e) {
    // The backend returns 200 even for unknown addresses; only surface real errors.
    return errorResponse(e);
  }
  // Always report success to avoid leaking which addresses exist.
  return NextResponse.json({ ok: true });
}
