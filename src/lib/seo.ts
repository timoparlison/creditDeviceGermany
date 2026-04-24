export const SITE_URL = 'https://creditdevice.de';

export const ORGANIZATION = {
  name: 'CreditDevice GmbH',
  legalName: 'CreditDevice GmbH',
  url: SITE_URL,
  logo: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2020/07/creditdevice-logo-orange.svg',
  email: 'info@creditdevice.de',
  telephone: '+49 40 890692912',
  address: {
    streetAddress: 'Winsbergring 10',
    postalCode: '22525',
    addressLocality: 'Hamburg',
    addressCountry: 'DE',
  },
  vatID: 'DE313990199',
  areaServed: 'DE',
} as const;
