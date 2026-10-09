import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { SESSION_COOKIE } from './lib/customer/constants';

const intlMiddleware = createMiddleware(routing);

const LOCALE_SEG = routing.locales.join('|');
// The customer portal is served at /konto (de) and /account (all other locales),
// each optionally behind a /<locale> prefix.
const ACCOUNT_RE = new RegExp(`^(?:/(${LOCALE_SEG}))?/(?:konto|account)(?:/([^/]+))?`);
const PUBLIC_SUBPATHS = new Set([
  'login',
  'registrieren',
  'register',
  'aktivieren',
  'activate',
  'passwort-vergessen',
  'forgot-password',
  'passwort-zuruecksetzen',
  'reset-password',
]);

/** Fixed, unlocalised links in the backend's JHipster mails → localised (default-locale) pages. */
const MAIL_LINK_REDIRECTS: Record<string, string> = {
  '/account/activate': '/konto/aktivieren/',
  '/account/reset/finish': '/konto/passwort-zuruecksetzen/',
};

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasSession = req.cookies.has(SESSION_COOKIE);

  const mailTarget = MAIL_LINK_REDIRECTS[pathname.replace(/\/$/, '')];
  if (mailTarget) {
    const url = req.nextUrl.clone();
    url.pathname = mailTarget;
    return NextResponse.redirect(url);
  }

  // Admin area: German only, outside next-intl. Role check happens in the admin layout.
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    const isLogin = pathname.replace(/\/$/, '') === '/admin/login';
    if (!isLogin && !hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = '/admin/login/';
      url.search = '';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const match = pathname.match(ACCOUNT_RE);
  if (match) {
    const localePrefix = match[1];
    const sub = match[2] ?? '';
    if (!PUBLIC_SUBPATHS.has(sub) && !hasSession) {
      const url = req.nextUrl.clone();
      url.pathname = localePrefix ? `/${localePrefix}/account/login/` : '/konto/login/';
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
