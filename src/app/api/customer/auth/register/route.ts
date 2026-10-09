import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/customer/client';
import { errorResponse } from '@/lib/customer/route-helpers';
import type { RegistrationRequest } from '@/lib/customer/types';

export const runtime = 'edge';

const REQUIRED = ['email', 'password', 'firstName', 'lastName'] as const;

/**
 * JHipster registration. The login name is the e-mail address (the backend also accepts
 * the e-mail at login). Company data follows later with the customer-account application.
 */
export async function POST(req: NextRequest) {
  let body: Partial<RegistrationRequest>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültige Anfrage.', status: 400 }, { status: 400 });
  }

  const missing = REQUIRED.filter((k) => !String(body[k] ?? '').trim());
  if (missing.length > 0) {
    return NextResponse.json(
      {
        message: 'Pflichtfelder fehlen.',
        fieldErrors: missing.map((field) => ({ field, message: 'Pflichtfeld' })),
        status: 400,
      },
      { status: 400 },
    );
  }

  const email = body.email!.trim().toLowerCase();
  try {
    await register({
      login: email,
      email,
      password: body.password!,
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      langKey: body.langKey?.trim() || 'de',
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    return errorResponse(e);
  }
}
