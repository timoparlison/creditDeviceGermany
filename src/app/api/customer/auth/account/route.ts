import { NextResponse } from 'next/server';
import { getAccount } from '@/lib/customer/client';
import { errorResponse, requireToken } from '@/lib/customer/route-helpers';
import { SESSION_COOKIE } from '@/lib/customer/session';

export const runtime = 'edge';

/** Session probe used by the client auth context. 401 => not logged in. */
export async function GET() {
  const token = await requireToken();
  if (token instanceof NextResponse) return token;

  try {
    const account = await getAccount(token);
    return NextResponse.json({ account });
  } catch (e) {
    const res = errorResponse(e);
    // Stale/invalid token: clear the cookie so the client returns to a clean state.
    if (res.status === 401) {
      res.cookies.set(SESSION_COOKIE, '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 0,
      });
    }
    return res;
  }
}
