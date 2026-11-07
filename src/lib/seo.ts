export const SITE_URL = 'https://creditdevice.de';

export const ORGANIZATION = {
  name: 'CreditDevice GmbH',
  legalName: 'CreditDevice GmbH',
  url: SITE_URL,
  logo: `${SITE_URL}/creditdevice-logo-orange.svg`,
  email: 'info@creditdevice.de',
  telephone: '+49 40 890692990',
  address: {
    streetAddress: 'Winsbergring 10',
    postalCode: '22525',
    addressLocality: 'Hamburg',
    addressCountry: 'DE',
  },
  vatID: 'DE313990199',
  foundingDate: '2017',
  founder: 'Sven G. Buckenberger',
  areaServed: 'DE',
} as const;

/**
 * Canonical + hreflang set for a page that exists in de and en.
 * Next replaces (not merges) `alternates` from the layout, so every page must
 * pass the full set — otherwise subpages lose their hreflang links.
 */
export function pageAlternates(locale: string, dePath: string, enPath: string) {
  const en = `/en${enPath}`;
  const canonical = locale === 'de' ? dePath : en;
  return {
    canonical,
    url: `${SITE_URL}${canonical}`,
    alternates: {
      canonical,
      languages: {
        de: `${SITE_URL}${dePath}`,
        en: `${SITE_URL}${en}`,
        'x-default': `${SITE_URL}${dePath}`,
      },
      // llms.txt: maschinenlesbare Unternehmensbeschreibung für KI-Systeme
      types: { 'text/plain': `${SITE_URL}/llms.txt` },
    },
  };
}
