import type { Price } from './types';

export type ProductId = 'full' | 'compact' | 'monitoring';

export type ProductDefinition = {
  id: ProductId;
  apiName: string;
  label: string;
  shortLabel: string;
  description: string;
  available: boolean;
};

export const PRODUCT_CATALOG: ProductDefinition[] = [
  {
    id: 'full',
    apiName: 'full',
    label: 'Vollauskunft',
    shortLabel: 'Vollauskunft',
    description:
      'Umfassender Bonitätsbericht mit Firmenstammdaten, Bilanzzahlen, Zahlungserfahrungen, Score und Risikoeinschätzung.',
    available: true,
  },
  {
    id: 'compact',
    apiName: 'compact',
    label: 'Kompaktauskunft',
    shortLabel: 'Kompakt',
    description: 'Reduzierter Bonitätsbericht mit den wichtigsten Kennzahlen.',
    available: false,
  },
  {
    id: 'monitoring',
    apiName: 'monitoring',
    label: 'Monitoring',
    shortLabel: 'Monitoring',
    description: 'Laufende Überwachung der Bonität eines Unternehmens.',
    available: false,
  },
];

export function productById(id: ProductId): ProductDefinition | undefined {
  return PRODUCT_CATALOG.find((p) => p.id === id);
}

export function priceFor(
  pricing: Price[] | undefined,
  productApiName: string,
): Price | undefined {
  if (!pricing) return undefined;
  return pricing.find(
    (p) => (p.product ?? '').toLowerCase() === productApiName.toLowerCase(),
  );
}

export function formatPrice(value: number | undefined, currency = 'EUR'): string {
  if (value === undefined || value === null) return '–';
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}
