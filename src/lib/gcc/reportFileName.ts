// Same rules as the backend (GccOrder ReportFileName, requirement R-ORD-9):
// Creditdevice_<object name>_<yyyy-MM-dd>.pdf, header-safe ASCII only.

const UMLAUTS: Record<string, string> = { ä: 'ae', ö: 'oe', ü: 'ue', Ä: 'Ae', Ö: 'Oe', Ü: 'Ue', ß: 'ss' };
const MAX_OBJECT_NAME_LENGTH = 60;

function sanitize(name: string): string {
  return name
    .replace(/[äöüÄÖÜß]/g, (c) => UMLAUTS[c])
    .normalize('NFD')
    .replace(/\p{M}+/gu, '')
    .replace(/[^A-Za-z0-9.-]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^[-.]+|[-.]+$/g, '')
    .slice(0, MAX_OBJECT_NAME_LENGTH)
    .replace(/[-.]+$/, '');
}

function isoDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function reportFileName(objectName: string | null | undefined, date: Date = new Date()): string {
  const parts = ['Creditdevice', objectName ? sanitize(objectName) : '', isoDay(date)].filter(Boolean);
  return `${parts.join('_')}.pdf`;
}
