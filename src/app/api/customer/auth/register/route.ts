import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/lib/customer/client';
import { errorResponse } from '@/lib/customer/route-helpers';
import type { CustomerRegistrationRequest } from '@/lib/customer/types';

export const runtime = 'edge';

const REQUIRED: (keyof CustomerRegistrationRequest)[] = [
  'login',
  'password',
  'firstName',
  'lastName',
  'email',
  'company',
  'street',
  'city',
  'zip',
];

export async function POST(req: NextRequest) {
  let body: Partial<CustomerRegistrationRequest>;
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

  try {
    await register({
      login: body.login!.trim(),
      password: body.password!,
      firstName: body.firstName!.trim(),
      lastName: body.lastName!.trim(),
      email: body.email!.trim(),
      company: body.company!.trim(),
      street: body.street!.trim(),
      city: body.city!.trim(),
      zip: body.zip!.trim(),
      country: body.country?.trim() || undefined,
      vatId: body.vatId?.trim() || undefined,
      langKey: body.langKey?.trim() || 'de',
    });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    return errorResponse(e);
  }
}
