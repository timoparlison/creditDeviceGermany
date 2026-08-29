// httpOnly session cookie helpers for the registered-customer area.
// The cookie holds the raw JHipster JWT (`id_token`). It is never exposed to
// client-side JS; the browser talks to the BFF routes under /api/customer/**.

import { cookies } from 'next/headers';
import { SESSION_COOKIE } from './constants';

export { SESSION_COOKIE };

const DEFAULT_MAX_AGE = 60 * 60 * 24; // 24h — matches JHipster's default token validity
const REMEMBER_ME_MAX_AGE = 60 * 60 * 24 * 30; // 30d

export type SessionCookieOptions = {
  httpOnly: true;
  secure: boolean;
  sameSite: 'lax';
  path: '/';
  maxAge: number;
};

export function sessionCookieOptions(rememberMe = false): SessionCookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: rememberMe ? REMEMBER_ME_MAX_AGE : DEFAULT_MAX_AGE,
  };
}

/** Read the JWT from the request cookies (server components / route handlers). */
export async function getSessionToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value ?? null;
}
