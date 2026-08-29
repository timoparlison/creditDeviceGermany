'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe, type Stripe } from '@stripe/stripe-js';
import { Loader2 } from 'lucide-react';
import { apiPost } from '@/lib/customer/api';
import type { DepositResponse } from '@/lib/customer/types';
import { FormError, FormSuccess, SubmitButton, TextField } from './ui';

const MIN_DEPOSIT = 10;
const toStripeLocale = (locale: string) => (locale === 'no' ? 'nb' : locale);

export function DepositForm({ onCredited }: { onCredited: () => void }) {
  const t = useTranslations('Account');
  const locale = useLocale();

  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripePromise, setStripePromise] = useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const startPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const value = Number(amount.replace(',', '.'));
    if (!Number.isFinite(value) || value < MIN_DEPOSIT) {
      setError(t('balance.minError'));
      return;
    }

    setLoading(true);
    try {
      const keyRes = await fetch('/api/gcc/stripe-key').then((r) => r.json());
      if (!keyRes?.stripeKey) throw new Error('stripe key missing');

      const deposit = await apiPost<DepositResponse>('/api/customer/credit/deposit', {
        amount: value,
      });
      if (!deposit.ok) {
        setError(deposit.error.message);
        setLoading(false);
        return;
      }

      setStripePromise(loadStripe(keyRes.stripeKey));
      setClientSecret(deposit.data.clientSecret);
    } catch {
      setError(t('balance.paymentInitError'));
    } finally {
      setLoading(false);
    }
  };

  if (clientSecret && stripePromise) {
    return (
      <Elements
        stripe={stripePromise}
        options={{ clientSecret, locale: toStripeLocale(locale) as 'auto' }}
      >
        <ConfirmStep onCredited={onCredited} />
      </Elements>
    );
  }

  return (
    <form onSubmit={startPayment} className="space-y-4">
      <FormError message={error} />
      <TextField
        label={t('balance.amountLabel')}
        name="amount"
        type="tel"
        value={amount}
        onChange={setAmount}
        required
        disabled={loading}
        hint={t('balance.amountHint')}
      />
      <SubmitButton loading={loading}>{t('balance.startPayment')}</SubmitButton>
    </form>
  );
}

function ConfirmStep({ onCredited }: { onCredited: () => void }) {
  const t = useTranslations('Account');
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const pay = async () => {
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (stripeError) {
      setError(stripeError.message ?? t('balance.paymentError'));
      setProcessing(false);
      return;
    }

    setDone(true);
    setProcessing(false);
    onCredited();
  };

  if (done) {
    return <FormSuccess message={t('balance.success')} />;
  }

  return (
    <div className="space-y-4">
      <FormError message={error} />
      <PaymentElement />
      <button
        type="button"
        onClick={pay}
        disabled={processing || !stripe}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
      >
        {processing && <Loader2 className="w-4 h-4 animate-spin" />}
        {t('balance.pay')}
      </button>
    </div>
  );
}
