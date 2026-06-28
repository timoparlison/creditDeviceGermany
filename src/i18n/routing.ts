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
  },
});
