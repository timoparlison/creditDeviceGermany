import { NextRequest, NextResponse } from 'next/server';
import { resetPasswordFinish } from '@/lib/customer/client';
import { errorResponse } from '@/lib/customer/route-helpers';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  let body: { key?: string; newPassword?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültige Anfrage.', status: 400 }, { status: 400 });
  }

  const key = body.key?.trim();
  const newPassword = body.newPassword;
  if (!key || !newPassword) {
    return NextResponse.json(
      { message: 'Schlüssel und neues Passwort sind erforderlich.', status: 400 },
      { status: 400 },
    );
  }

  try {
    await resetPasswordFinish({ key, newPassword });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
