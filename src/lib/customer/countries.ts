// Countries offered in the customer-account application (ISO 3166-1 alpha-2).
// Labels come from Intl.DisplayNames in the user's locale.

export const APPLICATION_COUNTRIES = [
  'DE', 'AT', 'CH', 'LI', 'LU', 'BE', 'NL', 'FR', 'IT', 'ES', 'PT', 'IE', 'GB', 'DK', 'SE', 'NO',
  'FI', 'IS', 'PL', 'CZ', 'SK', 'HU', 'SI', 'HR', 'RO', 'BG', 'GR', 'CY', 'MT', 'EE', 'LV', 'LT',
  'US', 'CA',
] as const;

export function countryName(code: string, locale: string): string {
  try {
    const names = new Intl.DisplayNames([locale === 'no' ? 'nb' : locale], { type: 'region' });
    return names.of(code) ?? code;
  } catch {
    return code;
  }
}

/**
 * Berechtigtes Interesse: stored as German text in the backend (free text field `legitimate`).
 * Option list (prüfen) — keep the values stable, only the labels are translated.
 */
export const LEGITIMATE_INTERESTS = [
  { value: 'Geschäftsanbahnung', key: 'businessInitiation' },
  { value: 'Bestehende Geschäftsbeziehung', key: 'existingRelationship' },
  { value: 'Kreditentscheidung', key: 'creditDecision' },
  { value: 'Forderungsmanagement / Inkasso', key: 'debtCollection' },
  { value: 'Lieferantenprüfung', key: 'supplierCheck' },
] as const;
