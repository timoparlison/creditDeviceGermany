// Shared formatting helpers for the customer area.
// Backend sends money as decimal strings ("150.00", "-22.69") and timestamps as
// ISO-8601 UTC strings.

const localeTag = (locale: string) => (locale === 'no' ? 'nb' : locale);

export function formatMoney(
  amount: string | number,
  currency = 'EUR',
  locale = 'de',
): string {
  const value = typeof amount === 'number' ? amount : Number(amount);
  if (!Number.isFinite(value)) return String(amount);
  return new Intl.NumberFormat(localeTag(locale), {
    style: 'currency',
    currency: currency || 'EUR',
  }).format(value);
}

export function formatDate(iso: string, locale = 'de'): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'medium',
  }).format(d);
}

export function formatDateTime(iso: string, locale = 'de'): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}
