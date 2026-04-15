'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { Download, Loader2, ShieldCheck } from 'lucide-react';
import {
  PRODUCT_CATALOG,
  formatPrice,
  priceFor,
  type ProductDefinition,
  type ProductId,
} from '@/lib/gcc/products';
import type { Company, CreditInformationOrderDto, Orderer } from '@/lib/gcc/types';

type Props = {
  company: Company;
  productIds: ProductId[];
};

type OrdererForm = Orderer & { reasonCode: number };

const DEFAULT_FORM: OrdererForm = {
  legitimate: 'Geschäftsbeziehung',
  firstname: '',
  lastname: '',
  email: '',
  company: '',
  street: '',
  city: '',
  zip: '',
  country: 'DE',
  payment: 'card',
  vatId: '',
  adult: true,
  reasonCode: 1,
};

const REASON_CODES = [
  { code: 1, label: 'Kreditentscheidung' },
  { code: 2, label: 'Geschäftsanbahnung' },
  { code: 3, label: 'Forderungseinzug' },
  { code: 4, label: 'Risikomanagement' },
];

export function OrderFlow({ company, productIds }: Props) {
  const products = useMemo<ProductDefinition[]>(
    () =>
      productIds
        .map((id) => PRODUCT_CATALOG.find((p) => p.id === id))
        .filter((p): p is ProductDefinition => Boolean(p && p.available)),
    [productIds],
  );

  const totals = useMemo(() => {
    let net = 0;
    let gross = 0;
    let currency = 'EUR';
    for (const def of products) {
      const price = priceFor(company.pricing, def.apiName);
      if (price) {
        net += price.net ?? 0;
        gross += price.gross ?? 0;
        currency = price.currency ?? currency;
      }
    }
    return { net, gross, currency };
  }, [products, company]);

  const [step, setStep] = useState<'form' | 'payment' | 'submitting' | 'done' | 'error'>('form');
  const [form, setForm] = useState<OrdererForm>(DEFAULT_FORM);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof OrdererForm>(key: K, value: OrdererForm[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
  };

  const onContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('submitting');
    try {
      const keyRes = await fetch('/api/gcc/stripe-key').then((r) => r.json());
      if (!keyRes?.stripeKey) throw new Error('Stripe-Key fehlt');
      setStripePromise(loadStripe(keyRes.stripeKey));

      const firstProduct = products[0];
      const piRes = await fetch('/api/gcc/payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          objectId: company.id,
          productName: firstProduct.apiName,
          id: '',
          vatId: form.vatId || null,
        }),
      });
      if (!piRes.ok) {
        const err = await piRes.json().catch(() => ({}));
        throw new Error(err?.error ?? `HTTP ${piRes.status}`);
      }
      const pi = await piRes.json();
      setClientSecret(pi.client_secret);
      setPaymentIntentId(pi.id);
      setStep('payment');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unbekannter Fehler');
      setStep('form');
    }
  };

  if (step === 'done') {
    return <OrderDone creditSafeObjectId={company.id} />;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {step === 'form' || step === 'submitting' ? (
          <form onSubmit={onContinue} className="bg-white rounded-xl shadow border border-gray-100 p-6 space-y-4">
            <h2 className="text-xl font-bold text-navy mb-2">Besteller-Angaben</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Vorname" required>
                <input type="text" required value={form.firstname} onChange={(e) => update('firstname', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Nachname" required>
                <input type="text" required value={form.lastname} onChange={(e) => update('lastname', e.target.value)} className={inputCls} />
              </Field>
            </div>

            <Field label="E-Mail" required>
              <input type="email" required value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} />
            </Field>

            <Field label="Firma" required>
              <input type="text" required value={form.company} onChange={(e) => update('company', e.target.value)} className={inputCls} />
            </Field>

            <Field label="Straße & Nr." required>
              <input type="text" required value={form.street} onChange={(e) => update('street', e.target.value)} className={inputCls} />
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Field label="PLZ" required>
                <input type="text" required value={form.zip} onChange={(e) => update('zip', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Stadt" required>
                <input type="text" required value={form.city} onChange={(e) => update('city', e.target.value)} className={inputCls} />
              </Field>
              <Field label="Land" required>
                <input type="text" required value={form.country} onChange={(e) => update('country', e.target.value.toUpperCase())} className={inputCls} maxLength={2} />
              </Field>
            </div>

            <Field label="USt-IdNr. (optional, für Reverse Charge)">
              <input type="text" value={form.vatId ?? ''} onChange={(e) => update('vatId', e.target.value)} className={inputCls} />
            </Field>

            <Field label="Bestellgrund" required>
              <select value={form.reasonCode} onChange={(e) => update('reasonCode', Number(e.target.value))} className={inputCls}>
                {REASON_CODES.map((r) => (
                  <option key={r.code} value={r.code}>{r.label}</option>
                ))}
              </select>
            </Field>

            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                required
                checked={form.adult}
                onChange={(e) => update('adult', e.target.checked)}
                className="mt-1"
              />
              <span>Ich bestätige, dass ich volljährig bin und die Auskunft zu geschäftlichen Zwecken bestelle.</span>
            </label>

            {error && <p className="text-red-600 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={step === 'submitting'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
            >
              {step === 'submitting' && <Loader2 className="w-4 h-4 animate-spin" />}
              Weiter zur Zahlung
            </button>
          </form>
        ) : null}

        {step === 'payment' && clientSecret && stripePromise && (
          <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
            <h2 className="text-xl font-bold text-navy mb-4">Zahlung</h2>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: 'stripe', variables: { colorPrimary: '#F08013' } },
              }}
            >
              <PaymentStep
                company={company}
                products={products}
                form={form}
                paymentIntentId={paymentIntentId}
                onDone={() => setStep('done')}
                onError={(msg) => {
                  setError(msg);
                  setStep('error');
                }}
              />
            </Elements>
          </div>
        )}

        {step === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6">
            <p className="text-red-700 font-semibold">Fehler</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setStep('form');
              }}
              className="mt-3 text-sm text-primary underline"
            >
              Erneut versuchen
            </button>
          </div>
        )}
      </div>

      <OrderSummary company={company} products={products} totals={totals} />
    </div>
  );
}

function OrderSummary({
  company,
  products,
  totals,
}: {
  company: Company;
  products: ProductDefinition[];
  totals: { net: number; gross: number; currency: string };
}) {
  return (
    <aside className="bg-white rounded-xl shadow border border-gray-100 p-6 h-fit sticky top-24">
      <h3 className="text-lg font-bold text-navy mb-4">Zusammenfassung</h3>
      <div className="mb-4 pb-4 border-b">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Unternehmen</p>
        <p className="font-semibold text-navy">{company.name}</p>
        {company.address?.simpleValue && (
          <p className="text-sm text-gray-600">{company.address.simpleValue}</p>
        )}
      </div>
      <div className="space-y-2 mb-4 pb-4 border-b">
        {products.map((def) => {
          const price = priceFor(company.pricing, def.apiName);
          return (
            <div key={def.id} className="flex justify-between text-sm">
              <span className="text-gray-700">{def.label}</span>
              <span className="font-medium text-navy">{formatPrice(price?.gross, price?.currency)}</span>
            </div>
          );
        })}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Netto</span>
          <span className="text-gray-800">{formatPrice(totals.net, totals.currency)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-navy">Brutto</span>
          <span className="text-xl font-bold text-navy">{formatPrice(totals.gross, totals.currency)}</span>
        </div>
      </div>
    </aside>
  );
}

function PaymentStep({
  company,
  products,
  form,
  paymentIntentId,
  onDone,
  onError,
}: {
  company: Company;
  products: ProductDefinition[];
  form: OrdererForm;
  paymentIntentId: string | null;
  onDone: () => void;
  onError: (msg: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const onPay = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    const { error: submitError } = await elements.submit();
    if (submitError) {
      onError(submitError.message ?? 'Eingaben prüfen');
      setProcessing(false);
      return;
    }
    const { error: payError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
      confirmParams: {
        return_url: `${window.location.origin}/auskunft/bestaetigung`,
      },
    });
    if (payError) {
      onError(payError.message ?? 'Zahlung fehlgeschlagen');
      setProcessing(false);
      return;
    }

    const dto: CreditInformationOrderDto = {
      creditSafeObjectId: company.id,
      userId: 1,
      isoLanguageCode: 'de',
      reportType: products[0].apiName,
      orderer: {
        legitimate: form.legitimate,
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        company: form.company,
        street: form.street,
        city: form.city,
        zip: form.zip,
        country: form.country,
        payment: paymentIntentId ?? form.payment,
        vatId: form.vatId || undefined,
        adult: form.adult,
      },
      reasonCode: { germanCodes: form.reasonCode },
    };

    const orderRes = await fetch('/api/gcc/credit-information', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    });
    if (!orderRes.ok) {
      const err = await orderRes.json().catch(() => ({}));
      onError(err?.error ?? 'Bestellung konnte nicht erfasst werden.');
      setProcessing(false);
      return;
    }
    onDone();
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
        Jetzt kostenpflichtig bestellen
      </button>
    </div>
  );
}

function OrderDone({ creditSafeObjectId }: { creditSafeObjectId: string }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  const onDownload = async () => {
    setDownloading(true);
    setDownloadError(null);
    try {
      const res = await fetch(
        `/api/gcc/credit-information/download?creditSafeObjectId=${encodeURIComponent(creditSafeObjectId)}`,
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `creditinformation${creditSafeObjectId}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      setDownloadError(e instanceof Error ? e.message : 'Download fehlgeschlagen');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
      <ShieldCheck className="w-12 h-12 text-green-600 mx-auto mb-3" />
      <h2 className="text-2xl font-bold text-navy mb-2">Bestellung erfolgreich</h2>
      <p className="text-gray-700 mb-6">
        Vielen Dank für Ihre Bestellung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
      </p>
      <button
        type="button"
        onClick={onDownload}
        disabled={downloading}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
      >
        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        PDF herunterladen
      </button>
      {downloadError && <p className="text-red-600 text-sm mt-3">{downloadError}</p>}
    </div>
  );
}

const inputCls =
  'w-full px-3 py-2 rounded-md border border-gray-300 text-navy focus:outline-none focus:ring-2 focus:ring-primary';

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
