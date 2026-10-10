import { NextRequest, NextResponse } from 'next/server';
import { request } from '@/lib/customer/client';
import { errorResponse, requireToken } from '@/lib/customer/route-helpers';
import type { ChangePasswordRequest } from '@/lib/customer/types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const token = await requireToken();
  if (token instanceof NextResponse) return token;

  let body: Partial<ChangePasswordRequest>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültige Anfrage.', status: 400 }, { status: 400 });
  }
  if (!body.currentPassword || !body.newPassword) {
    return NextResponse.json({ message: 'Passwörter fehlen.', status: 400 }, { status: 400 });
  }

  try {
    await request<void>('/api/account/change-password', {
      token,
      json: { currentPassword: body.currentPassword, newPassword: body.newPassword },
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
