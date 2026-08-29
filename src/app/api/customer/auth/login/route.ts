import { NextRequest, NextResponse } from 'next/server';
import { authenticate, CustomerBackendError, getAccount } from '@/lib/customer/client';
import { errorResponse } from '@/lib/customer/route-helpers';
import { SESSION_COOKIE, sessionCookieOptions } from '@/lib/customer/session';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  let payload: { username?: string; password?: string; rememberMe?: boolean };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ message: 'Ungültige Anfrage.', status: 400 }, { status: 400 });
  }

  const username = payload.username?.trim();
  const password = payload.password;
  if (!username || !password) {
    return NextResponse.json(
      { message: 'Benutzername und Passwort sind erforderlich.', status: 400 },
      { status: 400 },
    );
  }

  try {
    const { id_token } = await authenticate({
      username,
      password,
      rememberMe: Boolean(payload.rememberMe),
    });
    const account = await getAccount(id_token);

    const res = NextResponse.json({ account });
    res.cookies.set(SESSION_COOKIE, id_token, sessionCookieOptions(Boolean(payload.rememberMe)));
    return res;
  } catch (e) {
    // JHipster returns 401 "User <login> was not activated" for unconfirmed accounts.
    if (
      e instanceof CustomerBackendError &&
      e.status === 401 &&
      /not activated/i.test(e.message)
    ) {
      return NextResponse.json(
        { message: e.message, code: 'NOT_ACTIVATED', status: 403 },
        { status: 403 },
      );
    }
    return errorResponse(e);
  }
}
