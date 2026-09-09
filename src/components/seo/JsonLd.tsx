import { ORGANIZATION, SITE_URL } from '@/lib/seo';

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#organization`,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: ORGANIZATION.url,
    logo: {
      '@type': 'ImageObject',
      url: ORGANIZATION.logo,
    },
    image: ORGANIZATION.logo,
    email: ORGANIZATION.email,
    telephone: ORGANIZATION.telephone,
    vatID: ORGANIZATION.vatID,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ORGANIZATION.address.streetAddress,
      postalCode: ORGANIZATION.address.postalCode,
      addressLocality: ORGANIZATION.address.addressLocality,
      addressCountry: ORGANIZATION.address.addressCountry,
    },
    areaServed: ORGANIZATION.areaServed,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: ORGANIZATION.telephone,
      email: ORGANIZATION.email,
      availableLanguage: ['de', 'en'],
      areaServed: ORGANIZATION.areaServed,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
    sameAs: [
      'https://www.linkedin.com/company/creditdevice/',
      'https://www.youtube.com/@creditdevice',
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: ORGANIZATION.name,
    inLanguage: 'de-DE',
    publisher: { '@id': `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  // trailingSlash ist aktiv — auf die finale Slash-URL zeigen (sonst 308-Redirect)
  const url = (path: string) => `${SITE_URL}${path.endsWith('/') ? path : `${path}/`}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: url(item.path),
    })),
  };
}

export function faqSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    provider: { '@id': `${SITE_URL}/#organization` },
  };
}

// PEP-/Sanctions-Check als Dienstleistung. Der Preis wird serverseitig aus
// Produkt + USt-IdNr. (Reverse Charge) berechnet und ist daher nicht als fixer
// Wert auszeichenbar – das Offer nennt nur Währung, Verfügbarkeit und die
// dynamische Preisbildung.
export function pepCheckServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/pep-check#service`,
    name: 'PEP-/Sanctions-Check',
    serviceType: 'Compliance-Prüfung (PEP- und Sanktionslisten-Screening)',
    description:
      'Online-Prüfung von Personen und Organisationen gegen internationale Sanktionslisten (EU, UN, OFAC, OFSI u. a.) und PEP-Datenbanken. Kurzübersicht sofort im Browser, vollständiger Report als CreditDevice-gebrandetes PDF; Report und Rechnung zusätzlich per E-Mail.',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ORGANIZATION.areaServed,
    audience: { '@type': 'BusinessAudience', audienceType: 'B2B' },
    url: `${SITE_URL}/pep-check/`,
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/pep-check/`,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      description:
        'Preis pro Prüfung, dynamisch berechnet aus Produkt und USt-IdNr. (Reverse Charge bei gültiger EU-USt-IdNr. außerhalb Deutschlands). Anzeige im Checkout vor der Zahlung. Zahlung per Kreditkarte oder SEPA über Stripe. Keine Grundgebühr, kein Vertrag.',
    },
  };
}

// Produkt-Schema mit Preisen pro Preiszone, damit Suchmaschinen und
// KI-Systeme die Kosten einer Bonitätsauskunft maschinell auslesen können.
export function creditReportProductSchema(
  zones: Array<{ name: string; net: string; gross: string }>,
) {
  // schema.org verlangt Dezimalpunkt statt Komma
  const price = (value: string) => value.replace(',', '.');

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/bonitaetsinformationen#product`,
    name: 'Bonitätsauskunft (Online-Firmenauskunft)',
    description:
      'Online-Firmenauskunft aus über 200 Ländern: Bonitätsscore, Kreditlimit, Firmenstammdaten, Geschäftsführer & Gesellschafter, Konzernstrukturen, Bilanzdaten und Negativmerkmale. Pay-per-Use, ohne Grundgebühr oder Mindestabnahme.',
    brand: { '@id': `${SITE_URL}/#organization` },
    offers: zones.map((zone) => ({
      '@type': 'Offer',
      name: `Bonitätsauskunft – Preiszone ${zone.name}`,
      url: `${SITE_URL}/auskunft/`,
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: price(zone.net),
        priceCurrency: 'EUR',
        valueAddedTaxIncluded: false,
      },
      description: `${zone.net} € netto / ${zone.gross} € brutto pro abgerufener Auskunft (Preiszone ${zone.name})`,
    })),
  };
}
