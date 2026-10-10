'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { apiPost } from '@/lib/customer/api';
import type { BillingRunResult } from '@/lib/customer/types';
import { FormError, inputCls } from '@/components/customer/ui';

function previousMonth(): string {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function BillingRunForm() {
  const [period, setPeriod] = useState(previousMonth);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BillingRunResult | null>(null);

  const run = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm(`Abrechnungslauf für ${period} starten? Sammelrechnungen werden erzeugt und per E-Mail verschickt.`)) return;
    setBusy(true);
    setError(null);
    setResult(null);
    const res = await apiPost<BillingRunResult>('/api/admin/billing-runs', { period });
    setBusy(false);
    if (res.ok) setResult(res.data);
    else setError(res.error.message);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
      <form onSubmit={run} className="flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="block text-xs font-medium text-gray-600 mb-1">Periode</span>
          <input type="month" required value={period} onChange={(e) => setPeriod(e.target.value)} className={inputCls} />
        </label>
        <button
          type="submit"
          disabled={busy || !/^\d{4}-\d{2}$/.test(period)}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-60"
        >
          {busy && <Loader2 className="w-4 h-4 animate-spin" />}
          Abrechnung starten
        </button>
      </form>
      <FormError message={error} />
      {result && (
        <dl className="grid grid-cols-3 gap-4 text-sm">
          <ResultFact label="Erzeugte Rechnungen" ids={result.createdInvoiceIds} tone="text-green-700" />
          <ResultFact label="Übersprungen (Konten)" ids={result.skippedAccountIds} tone="text-gray-600" />
          <ResultFact label="Fehlgeschlagen (Konten)" ids={result.failedAccountIds} tone="text-red-700" />
        </dl>
      )}
    </div>
  );
}

function ResultFact({ label, ids, tone }: { label: string; ids: number[]; tone: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className={`text-2xl font-bold ${tone}`}>{ids.length}</dd>
      {ids.length > 0 && <dd className="text-xs text-gray-500 break-all">IDs: {ids.join(', ')}</dd>}
    </div>
  );
}
