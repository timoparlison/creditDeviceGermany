'use client';

import { useMemo, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import {
  ChevronDown,
  Download,
  ExternalLink,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { countryOptions } from '@/lib/countries';
import type {
  PepCheckOrderDto,
  PepSearch,
  PepSearchType,
  PsCheckResponse,
  PsCheckResult,
} from '@/lib/gcc/types';

/* ------------------------------------------------------------------ *
 * Formular-State                                                    *
 * ------------------------------------------------------------------ */

type SearchForm = {
  name: string;
  searchType: PepSearchType;
  countries: string[];
  citizenships: string[];
  catSanctions: boolean;
  catPeps: boolean;
  extraCategories: string;
  entityTypes: string;
  customerReference: string;
};

type OrdererForm = {
  legitimate: string;
  firstname: string;
  lastname: string;
  company: string;
  email: string;
  street: string;
  city: string;
  zip: string;
  vatId: string;
  customerNumber: string;
  orderNumber: string;
  adult: boolean;
};

const DEFAULT_SEARCH: SearchForm = {
  name: '',
  searchType: 'general_search',
  countries: [],
  citizenships: [],
  catSanctions: true,
  catPeps: true,
  extraCategories: '',
  entityTypes: '',
  customerReference: '',
};

const DEFAULT_ORDERER: OrdererForm = {
  legitimate: 'berechtigtes Interesse',
  firstname: '',
  lastname: '',
  company: '',
  email: '',
  street: '',
  city: '',
  zip: '',
  vatId: '',
  customerNumber: '',
  orderNumber: '',
  adult: true,
};

const SEARCH_TYPES: PepSearchType[] = [
  'broad_search',
  'general_search',
  'focused_search',
  'exact_search',
];

// Stripe verwendet 'nb' für Norwegisch, alle anderen App-Locales passen direkt.
const toStripeLocale = (locale: string) => (locale === 'no' ? 'nb' : locale);

const inputCls =
  'w-full px-3 py-2 rounded-md border border-gray-300 text-navy focus:outline-none focus:ring-2 focus:ring-primary';

type Step = 'search' | 'orderer' | 'preparing' | 'payment' | 'done' | 'error';

/* ------------------------------------------------------------------ *
 * Hauptkomponente                                                   *
 * ------------------------------------------------------------------ */

export function PepCheckFlow() {
  const t = useTranslations('PepCheck');
  const locale = useLocale();

  const [step, setStep] = useState<Step>('search');
  const [search, setSearch] = useState<SearchForm>(DEFAULT_SEARCH);
  const [orderer, setOrderer] = useState<OrdererForm>(DEFAULT_ORDERER);
  const [error, setError] = useState<string | null>(null);

  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [amount, setAmount] = useState<{ value: number; currency: string } | null>(null);
  const [result, setResult] = useState<PsCheckResponse | null>(null);

  const countries = useMemo(() => countryOptions(locale), [locale]);

  const updateSearch = <K extends keyof SearchForm>(key: K, value: SearchForm[K]) =>
    setSearch((s) => ({ ...s, [key]: value }));
  const updateOrderer = <K extends keyof OrdererForm>(key: K, value: OrdererForm[K]) =>
    setOrderer((o) => ({ ...o, [key]: value }));

  const buildSearchPayload = (): PepSearch => {
    const categories: string[] = [];
    if (search.catSanctions) categories.push('Sanctions');
    if (search.catPeps) categories.push('PEPs');
    for (const c of splitList(search.extraCategories)) categories.push(c);
    return {
      name: search.name.trim(),
      search_type: search.searchType,
      countries: search.countries.map((c) => c.toUpperCase()),
      citizenships: search.citizenships.map((c) => c.toUpperCase()),
      categories,
      entity_types: splitList(search.entityTypes),
      customer_reference: search.customerReference.trim(),
    };
  };

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.name.trim().length < 2) {
      setError(t('errNameRequired'));
      return;
    }
    setError(null);
    setStep('orderer');
  };

  const onOrdererSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('preparing');
    try {
      const keyRes = await fetch('/api/gcc/stripe-key').then((r) => r.json());
      if (!keyRes?.stripeKey) throw new Error(t('errStripeKey'));
      const promise = loadStripe(keyRes.stripeKey);
      setStripePromise(promise);

      const piRes = await fetch('/api/gcc/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objectId: search.name.trim(),
          productName: 'PEP',
          id: '',
          vatId: orderer.vatId.trim() || null,
          idempotencyKey:
            typeof crypto !== 'undefined' && 'randomUUID' in crypto
              ? crypto.randomUUID()
              : undefined,
        }),
      });
      if (!piRes.ok) {
        const err = await piRes.json().catch(() => ({}));
        throw new Error(err?.error ?? `HTTP ${piRes.status}`);
      }
      const pi = (await piRes.json()) as { id: string; client_secret: string };

      const stripe = await promise;
      if (stripe) {
        const { paymentIntent } = await stripe.retrievePaymentIntent(pi.client_secret);
        if (paymentIntent?.amount != null) {
          setAmount({ value: paymentIntent.amount, currency: paymentIntent.currency });
        }
      }

      setClientSecret(pi.client_secret);
      setPaymentIntentId(pi.id);
      setStep('payment');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errGeneric'));
      setStep('orderer');
    }
  };

  const restartPayment = () => {
    setError(null);
    setClientSecret(null);
    setPaymentIntentId(null);
    setAmount(null);
    setStep('orderer');
  };

  if (step === 'done' && result) {
    return <PepResultView result={result} email={orderer.email} search={search} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {step === 'search' && (
          <form
            onSubmit={onSearchSubmit}
            className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-navy mb-2">{t('searchTitle')}</h2>

            <Field label={t('nameLabel')} required>
              <input
                type="text"
                required
                value={search.name}
                onChange={(e) => updateSearch('name', e.target.value)}
                placeholder={t('namePlaceholder')}
                className={inputCls}
              />
              <span className="mt-1 block text-xs text-gray-500">{t('nameHint')}</span>
            </Field>

            <Field label={t('searchType')} required>
              <select
                value={search.searchType}
                onChange={(e) => updateSearch('searchType', e.target.value as PepSearchType)}
                className={inputCls}
              >
                {SEARCH_TYPES.map((st) => (
                  <option key={st} value={st}>
                    {t(`st_${st}`)}
                  </option>
                ))}
              </select>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t('countries')}>
                <MultiCountrySelect
                  options={countries}
                  value={search.countries}
                  onChange={(v) => updateSearch('countries', v)}
                />
              </Field>
              <Field label={t('citizenships')}>
                <MultiCountrySelect
                  options={countries}
                  value={search.citizenships}
                  onChange={(v) => updateSearch('citizenships', v)}
                />
              </Field>
            </div>
            <p className="text-xs text-gray-500 -mt-2">{t('multiHint')}</p>

            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-gray-700 mb-1">{t('categories')}</legend>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={search.catSanctions}
                  onChange={(e) => updateSearch('catSanctions', e.target.checked)}
                />
                {t('catSanctions')}
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={search.catPeps}
                  onChange={(e) => updateSearch('catPeps', e.target.checked)}
                />
                {t('catPeps')}
              </label>
            </fieldset>

            <Field label={t('extraCategories')}>
              <input
                type="text"
                value={search.extraCategories}
                onChange={(e) => updateSearch('extraCategories', e.target.value)}
                className={inputCls}
              />
            </Field>

            <Field label={t('entityTypes')}>
              <input
                type="text"
                value={search.entityTypes}
                onChange={(e) => updateSearch('entityTypes', e.target.value)}
                placeholder={t('entityTypesPlaceholder')}
                className={inputCls}
              />
            </Field>

            <Field label={t('customerReference')}>
              <input
                type="text"
                value={search.customerReference}
                onChange={(e) => updateSearch('customerReference', e.target.value)}
                className={inputCls}
              />
            </Field>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
            >
              {t('continueToOrderer')}
            </button>
          </form>
        )}

        {(step === 'orderer' || step === 'preparing') && (
          <form
            onSubmit={onOrdererSubmit}
            className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-4"
          >
            <h2 className="text-xl font-bold text-navy mb-2">{t('ordererTitle')}</h2>

            <Field label={t('legitimate')} required>
              <input
                type="text"
                required
                value={orderer.legitimate}
                onChange={(e) => updateOrderer('legitimate', e.target.value)}
                className={inputCls}
              />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t('firstName')} required>
                <input type="text" required value={orderer.firstname} onChange={(e) => updateOrderer('firstname', e.target.value)} className={inputCls} />
              </Field>
              <Field label={t('lastName')} required>
                <input type="text" required value={orderer.lastname} onChange={(e) => updateOrderer('lastname', e.target.value)} className={inputCls} />
              </Field>
            </div>

            <Field label={t('email')} required>
              <input type="email" required value={orderer.email} onChange={(e) => updateOrderer('email', e.target.value)} className={inputCls} />
            </Field>

            <Field label={t('company')} required>
              <input type="text" required value={orderer.company} onChange={(e) => updateOrderer('company', e.target.value)} className={inputCls} />
            </Field>

            <Field label={t('street')} required>
              <input type="text" required value={orderer.street} onChange={(e) => updateOrderer('street', e.target.value)} className={inputCls} />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t('zip')} required>
                <input type="text" required value={orderer.zip} onChange={(e) => updateOrderer('zip', e.target.value)} className={inputCls} />
              </Field>
              <Field label={t('city')} required>
                <input type="text" required value={orderer.city} onChange={(e) => updateOrderer('city', e.target.value)} className={inputCls} />
              </Field>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label={t('vatId')}>
                <input type="text" value={orderer.vatId} onChange={(e) => updateOrderer('vatId', e.target.value)} className={inputCls} />
              </Field>
              <Field label={t('customerNumber')}>
                <input type="text" value={orderer.customerNumber} onChange={(e) => updateOrderer('customerNumber', e.target.value)} className={inputCls} />
              </Field>
            </div>

            <Field label={t('orderNumber')}>
              <input
                type="text"
                maxLength={20}
                value={orderer.orderNumber}
                onChange={(e) => updateOrderer('orderNumber', e.target.value)}
                className={inputCls}
              />
            </Field>

            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                required
                checked={orderer.adult}
                onChange={(e) => updateOrderer('adult', e.target.checked)}
                className="mt-1"
              />
              <span>{t('adultConfirmation')}</span>
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setError(null); setStep('search'); }}
                className="px-4 py-3 text-sm text-primary underline"
              >
                {t('back')}
              </button>
              <button
                type="submit"
                disabled={step === 'preparing'}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
              >
                {step === 'preparing' && <Loader2 className="w-4 h-4 animate-spin" />}
                {step === 'preparing' ? t('preparing') : t('continueToPayment')}
              </button>
            </div>
          </form>
        )}

        {step === 'payment' && clientSecret && stripePromise && (
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">{t('paymentTitle')}</h2>
            {amount && (
              <p className="mb-4 text-sm text-gray-700">
                {t('amountLabel')}:{' '}
                <strong className="text-navy">{formatMoney(amount.value, amount.currency, locale)}</strong>
              </p>
            )}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                locale: toStripeLocale(locale) as any,
                appearance: { theme: 'stripe', variables: { colorPrimary: '#F08013' } },
              }}
            >
              <PaymentStep
                clientSecret={clientSecret}
                paymentIntentId={paymentIntentId}
                buildSearchPayload={buildSearchPayload}
                orderer={orderer}
                onDone={(data) => { setResult(data); setStep('done'); }}
                onPaymentError={(msg) => { setError(msg); setStep('error'); }}
              />
            </Elements>
          </div>
        )}

        {step === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-700 font-semibold">{t('errorTitle')}</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={restartPayment}
              className="mt-3 text-sm text-primary underline"
            >
              {t('retry')}
            </button>
          </div>
        )}
      </div>

      <PepSummary
        search={search}
        countries={countries}
        amount={amount}
        locale={locale}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Zahlung + Bestellung                                              *
 * ------------------------------------------------------------------ */

function PaymentStep({
  clientSecret,
  paymentIntentId,
  buildSearchPayload,
  orderer,
  onDone,
  onPaymentError,
}: {
  clientSecret: string;
  paymentIntentId: string | null;
  buildSearchPayload: () => PepSearch;
  orderer: OrdererForm;
  onDone: (data: PsCheckResponse) => void;
  onPaymentError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const t = useTranslations('PepCheck');
  const locale = useLocale();
  const [processing, setProcessing] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'paying' | 'ordering'>('idle');

  const localePrefix = locale === 'de' ? '' : `/${locale}`;

  const waitForSucceeded = async (): Promise<boolean> => {
    if (!stripe) return false;
    for (let i = 0; i < 5; i++) {
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      if (paymentIntent?.status === 'succeeded') return true;
      if (paymentIntent?.status === 'requires_payment_method') return false;
      await new Promise((r) => setTimeout(r, 1200));
    }
    return false;
  };

  const submitOrder = async () => {
    const dto: PepCheckOrderDto = {
      search: buildSearchPayload(),
      orderer: {
        legitimate: orderer.legitimate,
        firstname: orderer.firstname,
        lastname: orderer.lastname,
        company: orderer.company,
        email: orderer.email,
        street: orderer.street,
        city: orderer.city,
        zip: orderer.zip,
        payment: 'card',
        adult: orderer.adult,
        other: null,
        orderNumber: orderer.orderNumber.slice(0, 20),
        vatId: orderer.vatId.trim(),
        customerNumber: orderer.customerNumber.trim(),
      },
      paymentIntentId: paymentIntentId ?? '',
    };

    const res = await fetch('/api/gcc/pep-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });

    if (res.ok) {
      onDone((await res.json()) as PsCheckResponse);
      return;
    }

    if (res.status === 402) {
      onPaymentError(t('errPayment'));
      return;
    }
    if (res.status === 429) {
      const secondsHeader = res.headers.get('X-Rate-Limit-Retry-After-Seconds');
      const body = await res.json().catch(() => ({}) as { retryAfterSeconds?: number });
      const seconds = secondsHeader ?? body?.retryAfterSeconds ?? '?';
      onPaymentError(t('errRateLimit', { seconds: String(seconds) }));
      return;
    }
    onPaymentError(t('errProvider'));
  };

  const onPay = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    setPhase('paying');

    const { error: submitError } = await elements.submit();
    if (submitError) {
      onPaymentError(submitError.message ?? t('errorTitle'));
      setProcessing(false);
      return;
    }

    const { error: payError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}${localePrefix}/pep-check`,
      },
    });
    if (payError) {
      onPaymentError(payError.message ?? t('errorTitle'));
      setProcessing(false);
      return;
    }

    const ok = await waitForSucceeded();
    if (!ok) {
      onPaymentError(t('errPayment'));
      setProcessing(false);
      return;
    }

    setPhase('ordering');
    try {
      await submitOrder();
    } catch {
      onPaymentError(t('errProvider'));
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <PaymentElement />
      <button
        type="button"
        onClick={onPay}
        disabled={processing || !stripe}
        className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
      >
        {processing && <Loader2 className="w-4 h-4 animate-spin" />}
        {phase === 'ordering' ? t('processing') : t('payNow')}
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Zusammenfassung (Sidebar)                                         *
 * ------------------------------------------------------------------ */

function PepSummary({
  search,
  countries,
  amount,
  locale,
}: {
  search: SearchForm;
  countries: { code: string; name: string }[];
  amount: { value: number; currency: string } | null;
  locale: string;
}) {
  const t = useTranslations('PepCheck');
  const names = (codes: string[]) =>
    codes
      .map((c) => countries.find((o) => o.code === c.toLowerCase())?.name ?? c.toUpperCase())
      .join(', ') || '–';

  return (
    <aside className="bg-white rounded-xl shadow border border-gray-100 p-6 h-fit sticky top-24">
      <h3 className="text-lg font-bold text-navy mb-4">{t('summaryTitle')}</h3>
      <dl className="space-y-3 text-sm">
        <div>
          <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('summaryName')}</dt>
          <dd className="font-semibold text-navy">{search.name.trim() || '–'}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('summarySearchType')}</dt>
          <dd className="text-navy">{t(`st_${search.searchType}`)}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('summaryCountries')}</dt>
          <dd className="text-navy">{names(search.countries)}</dd>
        </div>
        <div>
          <dt className="text-xs text-gray-500 uppercase tracking-wide">{t('categories')}</dt>
          <dd className="text-navy">
            {[
              search.catSanctions && t('catSanctions'),
              search.catPeps && t('catPeps'),
              ...splitList(search.extraCategories),
            ]
              .filter(Boolean)
              .join(', ') || '–'}
          </dd>
        </div>
      </dl>
      <div className="mt-4 pt-4 border-t">
        <div className="flex items-baseline justify-between">
          <span className="font-semibold text-navy">{t('amountLabel')}</span>
          <span className="text-xl font-bold text-navy">
            {amount ? formatMoney(amount.value, amount.currency, locale) : '–'}
          </span>
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ *
 * Ergebnis                                                          *
 * ------------------------------------------------------------------ */

function PepResultView({
  result,
  email,
  search,
}: {
  result: PsCheckResponse;
  email: string;
  search: SearchForm;
}) {
  const t = useTranslations('PepCheck');
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const hits = result.results?.results ?? [];
  const total = result.results?.totalResults ?? hits.length;

  const onDownload = async () => {
    if (!result.orderUUID) return;
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch(
        `/api/gcc/pep-check/download?firstLinkOrderUUID=${encodeURIComponent(result.orderUUID)}`,
      );
      if (res.status === 404) throw new Error(t('reportPending'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `pep-check-${result.orderUUID}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setDownloadError(e instanceof Error ? e.message : t('reportPending'));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="w-8 h-8 text-green-600 flex-shrink-0" />
          <div>
            <h2 className="text-xl font-bold text-navy">{t('doneTitle')}</h2>
            <p className="text-gray-700 text-sm mt-1">
              {result.message || t('totalResults', { count: String(total) })}
            </p>
            <p className="text-gray-600 text-sm mt-1">{t('doneBody', { email })}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <p className="font-semibold text-navy">
            {t('totalResults', { count: String(total) })}
            <span className="ml-2 font-normal text-gray-500">· {search.name.trim()}</span>
          </p>
          <button
            type="button"
            onClick={onDownload}
            disabled={downloading || !result.orderUUID}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
          >
            {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            {downloading ? t('downloading') : t('reportPdf')}
          </button>
        </div>
        {downloadError && <p className="text-red-600 text-sm mb-4">{downloadError}</p>}

        {hits.length === 0 ? (
          <p className="text-gray-600 text-sm">{t('noHits')}</p>
        ) : (
          <ul className="space-y-3">
            {hits.map((hit, i) => (
              <PepResultCard key={hit.recordUUID ?? i} hit={hit} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function PepResultCard({ hit }: { hit: PsCheckResult }) {
  const t = useTranslations('PepCheck');
  const [open, setOpen] = useState(false);

  const citizenshipText = (hit.citizenships ?? [])
    .map((c) => c?.country || c?.countryCode)
    .filter(Boolean)
    .join(', ');
  const addressText = (hit.addresses ?? [])
    .map((a) =>
      [a?.city, a?.country || (a?.countryCode ?? '')].filter(Boolean).join(', '),
    )
    .filter(Boolean);
  const aliasText = (hit.nameAliases ?? [])
    .map((a) => a?.fullName || [a?.firstName, a?.lastName].filter(Boolean).join(' '))
    .filter(Boolean);

  return (
    <li className="rounded-lg border border-gray-200">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-navy">{hit.name || '–'}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {hit.entityType && <>{t('hit_entityType')}: {hit.entityType} · </>}
              {hit.source && <>{t('hit_source')}: {hit.source}</>}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1 text-sm text-primary shrink-0"
          >
            {open ? t('showLess') : t('showMore')}
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {(hit.lists ?? []).map((l) => (
            <span
              key={l}
              className="inline-block rounded-full bg-navy/5 text-navy px-2.5 py-0.5 text-xs font-medium"
            >
              {l}
            </span>
          ))}
        </div>
        {(hit.dobs ?? []).length > 0 && (
          <p className="text-xs text-gray-600 mt-2">
            {t('hit_dob')}: {(hit.dobs ?? []).join(', ')}
          </p>
        )}
      </div>

      {open && (
        <dl className="border-t divide-y text-sm">
          <DetailRow label={t('hit_pob')} value={(hit.pobs ?? []).join(', ')} />
          <DetailRow label={t('hit_citizenships')} value={citizenshipText} />
          <DetailRow label={t('hit_aliases')} value={aliasText.join(' · ')} />
          <DetailRow label={t('hit_addresses')} value={addressText.join(' · ')} />
          <DetailRow
            label={t('hit_relationships')}
            value={(hit.relationships ?? [])
              .map((r) => Object.values(r).filter((v) => typeof v === 'string').join(' '))
              .filter(Boolean)
              .join(' · ')}
          />
          {(hit.additional_info ?? []).map((info, idx) => (
            <DetailRow
              key={idx}
              label={info?.label ?? t('hit_additionalInfo')}
              value={(info?.values ?? []).join(', ')}
            />
          ))}
          {(hit.title || hit.snippet) && (
            <DetailRow label={t('hit_additionalInfo')} value={[hit.title, hit.snippet].filter(Boolean).join(' – ')} />
          )}
          <DetailRow label={t('hit_lastUpdated')} value={hit.lastUpdated ?? ''} />
          {hit.url && (
            <div className="px-4 py-3">
              <a
                href={hit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-primary"
              >
                <ExternalLink className="w-4 h-4" />
                {t('hit_sourceLink')}
              </a>
            </div>
          )}
        </dl>
      )}
    </li>
  );
}

function DetailRow({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-3 gap-3 px-4 py-3">
      <dt className="font-semibold text-gray-600">{label}</dt>
      <dd className="col-span-2 text-navy break-words">{value}</dd>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * kleine Helfer                                                     *
 * ------------------------------------------------------------------ */

function MultiCountrySelect({
  options,
  value,
  onChange,
}: {
  options: { code: string; name: string }[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <select
      multiple
      size={5}
      value={value}
      onChange={(e) =>
        onChange(Array.from(e.target.selectedOptions, (o) => o.value))
      }
      className="w-full px-3 py-2 rounded-md border border-gray-300 text-navy focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {options.map((o) => (
        <option key={o.code} value={o.code.toUpperCase()}>
          {o.name}
        </option>
      ))}
    </select>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      {children}
    </label>
  );
}

function splitList(raw: string): string[] {
  return raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
}

function formatMoney(amountMinor: number, currency: string, locale: string): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: (currency || 'eur').toUpperCase(),
    }).format(amountMinor / 100);
  } catch {
    return `${(amountMinor / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}
