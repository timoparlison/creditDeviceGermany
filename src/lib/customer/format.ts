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

/** Backend dates are ISO strings; tolerate Jackson timestamp formats (epoch seconds, [y, m, d, h, min, s]). */
type BackendDate = string | number | number[];

function toDate(value: BackendDate): Date {
  if (typeof value === 'number') return new Date(value * 1000);
  if (Array.isArray(value)) {
    const [y, m = 1, d = 1, h = 0, min = 0, s = 0] = value;
    return new Date(y, m - 1, d, h, min, s);
  }
  return new Date(value);
}

export function formatDate(iso: BackendDate, locale = 'de'): string {
  const d = toDate(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'medium',
  }).format(d);
}

export function formatDateTime(iso: BackendDate, locale = 'de'): string {
  const d = toDate(iso);
  if (Number.isNaN(d.getTime())) return String(iso);
  return new Intl.DateTimeFormat(localeTag(locale), {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(d);
}
