'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { AlertCircle, ArrowRight, Loader2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SearchForm } from '@/components/auskunft/SearchForm';
import type { Company, CustomerQueryResult } from '@/lib/gcc/types';

function ResultsInner() {
  const params = useSearchParams();
  const t = useTranslations('AuskunftResults');
  const name = params.get('name') ?? '';
  const countryCode = params.get('countryCode') ?? 'de';

  const [data, setData] = useState<CustomerQueryResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(null);
    setData(null);

    const url = `/api/gcc/search?name=${encodeURIComponent(name)}&countries=${countryCode}&page=1&size=20`;
    fetch(url)
      .then(async (r) => {
        const body = await r.json();
        if (!r.ok) throw new Error(body?.error ?? `HTTP ${r.status}`);
        return body as CustomerQueryResult;
      })
      .then((d) => !cancelled && setData(d))
      .catch((e) => !cancelled && setError(e instanceof Error ? e.message : 'Unbekannter Fehler'))
      .finally(() => !cancelled && setLoading(false));

    return () => { cancelled = true; };
  }, [name, countryCode]);

  return (
    <>
      <section className="bg-navy text-white py-10">
        <Container>
          <h1 className="text-2xl md:text-3xl font-bold mb-5">{t('heading')}</h1>
          <div className="bg-white rounded-xl p-4 shadow-lg">
            <SearchForm initialName={name} initialCountry={countryCode} variant="light" />
          </div>
        </Container>
      </section>

      <section className="py-10 bg-gray-50 min-h-[50vh]">
        <Container>
          {loading && (
            <div className="flex items-center gap-3 text-gray-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('loading')}</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 text-red-700 bg-red-50 border border-red-200 p-4 rounded-md">
              <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">{t('errorTitle')}</p>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}

          {data && (data.companies?.length ?? 0) === 0 && (
            <div className="bg-white rounded-xl p-8 text-center border border-gray-100">
              <p className="text-gray-700">
                {t('noResults')} <strong>«{name}»</strong> {t('noResultsIn')}
              </p>
            </div>
          )}

          {data && (data.companies?.length ?? 0) > 0 && (
            <ResultsTable companies={data.companies!} total={data.totalSize ?? 0} />
          )}
        </Container>
      </section>
    </>
  );
}

function ResultsTable({ companies, total }: { companies: Company[]; total: number }) {
  const t = useTranslations('AuskunftResults');
  return (
    <>
      <p className="text-sm text-gray-600 mb-4">{total} {t('hits')}</p>
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-700">
              <tr>
                <th className="p-3 text-left w-14"></th>
                <th className="p-3 text-left font-semibold">{t('colName')}</th>
                <th className="p-3 text-left font-semibold">{t('colAddress')}</th>
                <th className="p-3 text-left font-semibold">{t('colRegNo')}</th>
                <th className="p-3 text-left font-semibold">{t('colVatNo')}</th>
                <th className="p-3 text-left font-semibold">{t('colStatus')}</th>
                <th className="p-3 text-left font-semibold">{t('colType')}</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-3">
                    <Link
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      href={`/auskunft/unternehmen/${encodeURIComponent(c.id)}` as any}
                      className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
                      aria-label={`Details zu ${c.name}`}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </td>
                  <td className="p-3 font-medium text-navy">{c.name}</td>
                  <td className="p-3 text-gray-700">{c.address?.simpleValue ?? '–'}</td>
                  <td className="p-3 text-gray-700">{c.regNo ?? '–'}</td>
                  <td className="p-3 text-gray-700">{(c.vatNo ?? []).join(', ') || '–'}</td>
                  <td className="p-3">
                    <StatusBadge status={c.status} />
                  </td>
                  <td className="p-3 text-gray-700">{c.type ?? '–'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const active = status?.toLowerCase() === 'active';
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'}`}>
      {status ?? '–'}
    </span>
  );
}

export default function ResultsPage() {
  const t = useTranslations('AuskunftResults');
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-600">{t('loading2')}</div>}>
      <ResultsInner />
    </Suspense>
  );
}
