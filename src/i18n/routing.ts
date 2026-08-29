import { defineRouting } from 'next-intl/routing';

export const locales = ['de', 'en', 'es', 'fr', 'it', 'nl', 'sv', 'no', 'da', 'fi'] as const;
export type Locale = typeof locales[number];

const nonDe = locales.filter((l) => l !== 'de');

const localizedPath = (dePath: string, enPath: string) =>
  Object.fromEntries([['de', dePath], ...nonDe.map((l) => [l, enPath])]);

export const routing = defineRouting({
  locales,
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/bonitaetsinformationen': localizedPath('/bonitaetsinformationen', '/credit-information'),
    '/credit-management-software': '/credit-management-software',
    '/policymanager': localizedPath('/policymanager', '/policy-manager'),
    '/auskunft': localizedPath('/auskunft', '/credit-inquiry'),
    '/kontakt': localizedPath('/kontakt', '/contact'),
    '/ueber-uns': localizedPath('/ueber-uns', '/about'),
    '/datenschutz': localizedPath('/datenschutz', '/privacy-policy'),
    '/impressum': localizedPath('/impressum', '/legal-notice'),
    '/konto': localizedPath('/konto', '/account'),
    '/konto/login': localizedPath('/konto/login', '/account/login'),
    '/konto/aktivieren': localizedPath('/konto/aktivieren', '/account/activate'),
    '/konto/registrieren': localizedPath('/konto/registrieren', '/account/register'),
    '/konto/passwort-vergessen': localizedPath(
      '/konto/passwort-vergessen',
      '/account/forgot-password',
    ),
    '/konto/passwort-zuruecksetzen': localizedPath(
      '/konto/passwort-zuruecksetzen',
      '/account/reset-password',
    ),
    '/konto/guthaben': localizedPath('/konto/guthaben', '/account/balance'),
  },
});

/**
 * Internal route prefixes (as used in <Link href>) that require an authenticated
 * customer session. The auth pages below are intentionally excluded.
 */
export const PROTECTED_PREFIX = '/konto';
export const PUBLIC_ACCOUNT_ROUTES = [
  '/konto/login',
  '/konto/registrieren',
  '/konto/aktivieren',
  '/konto/passwort-vergessen',
  '/konto/passwort-zuruecksetzen',
];
