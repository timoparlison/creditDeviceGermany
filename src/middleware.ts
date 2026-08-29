import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { SESSION_COOKIE } from './lib/customer/constants';

const intlMiddleware = createMiddleware(routing);

const LOCALE_SEG = routing.locales.join('|');
// The customer area is served at /konto (de) and /account (all other locales),
// each optionally behind a /<locale> prefix.
const ACCOUNT_RE = new RegExp(`^(?:/(${LOCALE_SEG}))?/(?:konto|account)(?:/([^/]+))?`);
const PUBLIC_SUBPATHS = new Set([
  'login',
  'registrieren',
  'register',
  'passwort-vergessen',
  'forgot-password',
  'passwort-zuruecksetzen',
  'reset-password',
]);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const match = pathname.match(ACCOUNT_RE);

  if (match) {
    const localePrefix = match[1];
    const sub = match[2] ?? '';
    const isPublic = PUBLIC_SUBPATHS.has(sub);
    const hasSession = req.cookies.has(SESSION_COOKIE);

    if (!isPublic && !hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = localePrefix ? `/${localePrefix}/account/login` : '/konto/login';
      url.search = '';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
