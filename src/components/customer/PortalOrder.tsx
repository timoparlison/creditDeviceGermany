'use client';

import { useEffect, useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Building2, CheckCircle2, Download, Loader2, Search, ShieldCheck } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { countryOptions } from '@/lib/countries';
import { apiGet, apiPost } from '@/lib/customer/api';
import { formatMoney } from '@/lib/customer/format';
import type { CustomerError, OrderResponse, PriceQuote, Product } from '@/lib/customer/types';
import type { Company, CustomerQueryResult, PepSearchType, PsCheckResponse } from '@/lib/gcc/types';
import { MultiCountrySelect, PepResultCard, SEARCH_TYPES, splitList } from '@/components/pep/PepCheckFlow';
import { Card, FormError, inputCls } from './ui';

/** PDF of an own order, streamed through the portal proxy (trailing slash: site uses trailingSlash). */
export const orderPdfUrl = (orderId: string) =>
  `/api/customer/portal/orders/${encodeURIComponent(orderId)}/pdf/`;

type Tab = Product;

export function PortalOrder({ initialTab = 'FULL' }: { initialTab?: Tab }) {
  const t = useTranslations('Account');
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="space-y-6">
      <div className="inline-flex rounded-lg bg-white border border-gray-200 p-1" role="tablist">
        {(['FULL', 'PEP'] as const).map((p) => (
          <button
            key={p}
            type="button"
            role="tab"
            aria-selected={tab === p}
            onClick={() => setTab(p)}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              tab === p ? 'bg-primary text-white' : 'text-navy hover:bg-gray-50'
            }`}
          >
            {p === 'FULL' ? <Building2 className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
            {t(`products.${p}`)}
          </button>
        ))}
      </div>
      {tab === 'FULL' ? <FullReportOrder /> : <PepOrder />}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Shared                                                            *
 * ------------------------------------------------------------------ */

function useOrderErrorMessage() {
  const t = useTranslations('Account');
  return (error: CustomerError) => {
    switch (error.code) {
      case 'error.creditLimitExceeded':
        return t('order.errLimit');
      case 'error.customerNotApproved':
        return t('order.errNotApproved');
      case 'error.productFulfillment':
        return t('order.errProvider');
      default:
        return error.status === 402 ? t('order.errLimit') : error.status === 502 ? t('order.errProvider') : t('order.errGeneric');
    }
  };
}

function PriceBox({ quote }: { quote: PriceQuote | null }) {
  const t = useTranslations('Account');
  const locale = useLocale();
  if (!quote) return <p className="text-sm text-gray-500">{t('common.loading')}</p>;
  const m = (v: number) => formatMoney(v, quote.price.currency, locale);
  return (
    <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-sm space-y-1">
      {quote.price.discountPercent > 0 && (
        <Row label={t('prices.listNet')} value={m(quote.price.listNet)} muted />
      )}
      {quote.price.discountPercent > 0 && (
        <Row label={t('prices.discount')} value={`− ${quote.price.discountPercent} %`} muted />
      )}
      <Row label={t('prices.net')} value={m(quote.price.net)} />
      <Row label={t('order.vat')} value={m(quote.price.vat)} muted />
      <Row label={t('prices.gross')} value={m(quote.price.gross)} strong />
      {!quote.withinCreditLimit && (
        <p className="text-red-700 pt-2">{t('order.errLimit')}</p>
      )}
    </div>
  );
}

function Row({ label, value, muted, strong }: { label: string; value: string; muted?: boolean; strong?: boolean }) {
  return (
    <div className={`flex justify-between gap-4 ${muted ? 'text-gray-500' : 'text-navy'} ${strong ? 'font-semibold text-base pt-1 border-t border-gray-200' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function ReferenceField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const t = useTranslations('Account');
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">{t('order.reference')}</span>
      <input
        type="text"
        maxLength={20}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
      <span className="block text-xs text-gray-500 mt-1">{t('order.referenceHint')}</span>
    </label>
  );
}

function OrderSuccess({ order, onAgain }: { order: OrderResponse; onAgain: () => void }) {
  const t = useTranslations('Account');
  const locale = useLocale();
  return (
    <div className="rounded-xl border border-green-200 bg-green-50 p-5 flex gap-4">
      <CheckCircle2 className="w-6 h-6 text-green-600 shrink-0" />
      <div className="space-y-2 text-sm text-green-900">
        <p className="font-semibold">{t('order.successTitle', { orderId: order.orderId })}</p>
        <p>{t('order.successBody', { gross: formatMoney(order.price.gross, order.price.currency, locale) })}</p>
        <div className="flex flex-wrap gap-3 pt-1">
          <a
            href={orderPdfUrl(order.orderId)}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark"
          >
            <Download className="w-4 h-4" />
            {t('order.pdf')}
          </a>
          <Link href="/konto/bestellungen" className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 bg-white text-navy hover:bg-gray-50">
            {t('order.toOrders')}
          </Link>
          <button type="button" onClick={onAgain} className="inline-flex items-center px-4 py-2 rounded-md text-primary hover:underline">
            {t('order.again')}
          </button>
        </div>
      </div>
    </div>
  );
}

function OrderButton({ loading, disabled, children }: { loading: boolean; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={loading || disabled}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ *
 * Full credit report                                                *
 * ------------------------------------------------------------------ */

function FullReportOrder() {
  const t = useTranslations('Account');
  const locale = useLocale();
  const errorMessage = useOrderErrorMessage();
  const countries = useMemo(() => countryOptions(locale), [locale]);

  const [name, setName] = useState('');
  const [country, setCountry] = useState('de');
  const [searching, setSearching] = useState(false);
  const [results, setResults] = useState<Company[] | null>(null);
  const [selected, setSelected] = useState<Company | null>(null);
  const [quote, setQuote] = useState<PriceQuote | null>(null);
  const [reference, setReference] = useState('');
  const [language, setLanguage] = useState(locale === 'de' ? 'de' : 'en');
  const [ordering, setOrdering] = useState(false);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError(t('order.errMinChars'));
      return;
    }
    setError(null);
    setSearching(true);
    setSelected(null);
    try {
      const params = new URLSearchParams({ name: name.trim(), countries: country, page: '1', size: '20' });
      const res = await fetch(`/api/gcc/search/?${params}`);
      if (!res.ok) throw new Error();
      const data = (await res.json()) as CustomerQueryResult;
      setResults(data.companies ?? []);
    } catch {
      setError(t('order.errSearch'));
      setResults(null);
    } finally {
      setSearching(false);
    }
  };

  const onSelect = async (company: Company) => {
    setSelected(company);
    setQuote(null);
    setError(null);
    const res = await apiGet<PriceQuote[]>(
      `/api/customer/portal/prices?creditSafeObjectId=${encodeURIComponent(company.id)}`,
    );
    if (res.ok) {
      setQuote(res.data.find((q) => q.product === 'FULL') ?? null);
    } else {
      setError(errorMessage(res.error));
    }
  };

  const onOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setOrdering(true);
    setError(null);
    const res = await apiPost<OrderResponse>('/api/customer/portal/orders/full', {
      creditSafeObjectId: selected.id,
      isoLanguageCode: language,
      customerReference: reference.trim() || undefined,
    });
    setOrdering(false);
    if (res.ok) setOrder(res.data);
    else setError(errorMessage(res.error));
  };

  const reset = () => {
    setOrder(null);
    setSelected(null);
    setQuote(null);
    setReference('');
  };

  if (order) return <OrderSuccess order={order} onAgain={reset} />;

  return (
    <div className="space-y-6">
      <Card title={t('order.searchTitle')}>
        <form onSubmit={onSearch} className="grid grid-cols-1 md:grid-cols-[1fr_220px_auto] gap-3">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t('order.companyName')}
            aria-label={t('order.companyName')}
            className={inputCls}
          />
          <select value={country} onChange={(e) => setCountry(e.target.value)} aria-label={t('application.country')} className={inputCls}>
            {countries.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={searching}
            className="inline-flex items-center justify-center gap-2 px-5 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark disabled:opacity-60"
          >
            {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            {t('order.search')}
          </button>
        </form>
        {!selected && <div className="mt-3"><FormError message={error} /></div>}

        {results && !selected && (
          <div className="mt-5">
            {results.length === 0 ? (
              <p className="text-sm text-gray-600">{t('order.noResults')}</p>
            ) : (
              <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
                {results.map((c) => (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => onSelect(c)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 flex justify-between gap-4"
                    >
                      <span>
                        <span className="block font-medium text-navy">{c.name}</span>
                        <span className="block text-xs text-gray-500">
                          {c.address?.simpleValue ?? [c.address?.street, c.address?.postCode, c.address?.city].filter(Boolean).join(', ')}
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 shrink-0 text-right">
                        {c.regNo && <span className="block">{c.regNo}</span>}
                        {c.status && <span className="block">{c.status}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </Card>

      {selected && (
        <Card
          title={selected.name}
          actions={
            <button type="button" onClick={() => setSelected(null)} className="text-sm text-primary hover:underline">
              {t('order.changeCompany')}
            </button>
          }
        >
          <form onSubmit={onOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                {selected.address?.simpleValue ?? [selected.address?.street, selected.address?.postCode, selected.address?.city].filter(Boolean).join(', ')}
              </p>
              <label className="block">
                <span className="block text-sm font-medium text-gray-700 mb-1">{t('order.language')}</span>
                <select value={language} onChange={(e) => setLanguage(e.target.value)} className={inputCls}>
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                </select>
              </label>
              <ReferenceField value={reference} onChange={setReference} />
            </div>
            <div className="space-y-4">
              <PriceBox quote={quote} />
              <FormError message={error} />
              <OrderButton loading={ordering} disabled={!quote || !quote.withinCreditLimit}>
                {t('order.submitFull')}
              </OrderButton>
              <p className="text-xs text-gray-500">{t('order.onAccountHint')}</p>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * PEP / sanctions check                                             *
 * ------------------------------------------------------------------ */

function PepOrder() {
  const t = useTranslations('Account');
  const tp = useTranslations('PepCheck');
  const locale = useLocale();
  const errorMessage = useOrderErrorMessage();
  const countries = useMemo(() => countryOptions(locale), [locale]);

  const [name, setName] = useState('');
  const [searchType, setSearchType] = useState<PepSearchType>('general_search');
  const [countryFilter, setCountryFilter] = useState<string[]>([]);
  const [citizenships, setCitizenships] = useState<string[]>([]);
  const [catSanctions, setCatSanctions] = useState(true);
  const [catPeps, setCatPeps] = useState(true);
  const [extraCategories, setExtraCategories] = useState('');
  const [reference, setReference] = useState('');
  const [quote, setQuote] = useState<PriceQuote | null>(null);
  const [ordering, setOrdering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<(OrderResponse & { psCheckResponse: PsCheckResponse }) | null>(null);

  useEffect(() => {
    void apiGet<PriceQuote[]>('/api/customer/portal/prices').then((res) => {
      if (res.ok) setQuote(res.data.find((q) => q.product === 'PEP') ?? null);
    });
  }, []);

  const onOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError(tp('errNameRequired'));
      return;
    }
    const categories: string[] = [];
    if (catSanctions) categories.push('Sanctions');
    if (catPeps) categories.push('PEPs');
    categories.push(...splitList(extraCategories));

    setOrdering(true);
    setError(null);
    const res = await apiPost<OrderResponse & { psCheckResponse: PsCheckResponse }>('/api/customer/portal/orders/pep', {
      search: {
        name: name.trim(),
        search_type: searchType,
        countries: countryFilter,
        citizenships,
        categories,
        entity_types: [],
        customer_reference: reference.trim(),
      },
      customerReference: reference.trim() || undefined,
    });
    setOrdering(false);
    if (res.ok) setResult(res.data);
    else setError(errorMessage(res.error));
  };

  if (result) {
    const hits = result.psCheckResponse.results?.results ?? [];
    return (
      <div className="space-y-6">
        <OrderSuccess order={result} onAgain={() => setResult(null)} />
        <Card title={tp('totalResults', { count: String(result.psCheckResponse.results?.totalResults ?? hits.length) })}>
          {hits.length === 0 ? (
            <p className="text-sm text-gray-600">{tp('noHits')}</p>
          ) : (
            <ul className="space-y-3">
              {hits.map((hit, i) => (
                <PepResultCard key={hit.recordUUID ?? i} hit={hit} />
              ))}
            </ul>
          )}
        </Card>
      </div>
    );
  }

  return (
    <Card title={tp('searchTitle')}>
      <form onSubmit={onOrder} className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
        <div className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">
              {tp('nameLabel')}
              <span className="text-red-500 ml-0.5">*</span>
            </span>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">{tp('searchType')}</span>
            <select value={searchType} onChange={(e) => setSearchType(e.target.value as PepSearchType)} className={inputCls}>
              {SEARCH_TYPES.map((st) => (
                <option key={st} value={st}>
                  {tp(`st_${st}`)}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">{tp('countries')}</span>
              <MultiCountrySelect options={countries} value={countryFilter} onChange={setCountryFilter} />
            </label>
            <label className="block">
              <span className="block text-sm font-medium text-gray-700 mb-1">{tp('citizenships')}</span>
              <MultiCountrySelect options={countries} value={citizenships} onChange={setCitizenships} />
            </label>
          </div>
          <p className="text-xs text-gray-500 -mt-2">{tp('multiHint')}</p>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-gray-700 mb-1">{tp('categories')}</legend>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={catSanctions} onChange={(e) => setCatSanctions(e.target.checked)} />
              {tp('catSanctions')}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={catPeps} onChange={(e) => setCatPeps(e.target.checked)} />
              {tp('catPeps')}
            </label>
          </fieldset>
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">{tp('extraCategories')}</span>
            <input type="text" value={extraCategories} onChange={(e) => setExtraCategories(e.target.value)} className={inputCls} />
          </label>
          <ReferenceField value={reference} onChange={setReference} />
        </div>
        <div className="space-y-4">
          <PriceBox quote={quote} />
          <FormError message={error} />
          <OrderButton loading={ordering} disabled={!!quote && !quote.withinCreditLimit}>
            {t('order.submitPep')}
          </OrderButton>
          <p className="text-xs text-gray-500">{t('order.onAccountHint')}</p>
        </div>
      </form>
    </Card>
  );
}
