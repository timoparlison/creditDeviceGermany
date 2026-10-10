'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { ChevronDown, ChevronRight, Loader2 } from 'lucide-react';
import { apiDelete, apiGet, apiPost, apiPut, fieldErrorMap } from '@/lib/customer/api';
import { formatDate, formatDateTime, formatMoney } from '@/lib/customer/format';
import type { CustomerAccount, CustomerAccountStatus, CustomerConditions, CustomerError } from '@/lib/customer/types';
import { FormError, FormSuccess, inputCls } from '@/components/customer/ui';

type StatusFilter = CustomerAccountStatus | 'ALL';

const FILTERS: { value: StatusFilter; label: string }[] = [
  { value: 'PENDING', label: 'Offene Anträge' },
  { value: 'APPROVED', label: 'Freigegeben' },
  { value: 'REJECTED', label: 'Abgelehnt' },
  { value: 'ALL', label: 'Alle' },
];

const STATUS_BADGE: Record<CustomerAccountStatus, { label: string; cls: string }> = {
  PENDING: { label: 'offen', cls: 'bg-amber-100 text-amber-800' },
  APPROVED: { label: 'freigegeben', cls: 'bg-green-100 text-green-800' },
  REJECTED: { label: 'abgelehnt', cls: 'bg-red-100 text-red-800' },
};

const ERROR_TEXT: Record<string, string> = {
  'error.invalidAccountState': 'Aktion im aktuellen Status nicht möglich (wurde das Konto inzwischen bearbeitet?).',
  'error.invalidConditions': 'Ungültige Konditionen: Limit muss > 0 sein, Rabatte 0–100 %.',
  'error.customerAccountNotFound': 'Konto nicht gefunden.',
};
const errorText = (e: CustomerError) =>
  (e.code && ERROR_TEXT[e.code]) || (e.status === 403 ? 'Keine Administratorrechte.' : e.message);

export function AdminAccounts() {
  const [status, setStatus] = useState<StatusFilter>('PENDING');
  const [accounts, setAccounts] = useState<CustomerAccount[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<number | null>(null);

  const load = useCallback(async () => {
    setError(null);
    const q = status === 'ALL' ? '' : `?status=${status}`;
    const res = await apiGet<CustomerAccount[]>(`/api/admin/customer-accounts${q}`);
    if (res.ok) setAccounts(res.data);
    else setError(errorText(res.error));
  }, [status]);

  useEffect(() => {
    setAccounts(null);
    void load();
  }, [load]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-navy">Kundenkonten</h1>
        <div className="inline-flex rounded-lg bg-white border border-gray-200 p-1">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setStatus(f.value)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium ${status === f.value ? 'bg-primary text-white' : 'text-navy hover:bg-gray-50'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <FormError message={error} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        {accounts === null ? (
          <p className="p-6 text-sm text-gray-500">Wird geladen …</p>
        ) : accounts.length === 0 ? (
          <p className="p-6 text-sm text-gray-600">Keine Konten in dieser Ansicht.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 px-3" />
                <th className="py-3 pr-4 font-medium">Antrag</th>
                <th className="py-3 pr-4 font-medium">Firma</th>
                <th className="py-3 pr-4 font-medium">Kontakt</th>
                <th className="py-3 pr-4 font-medium">Land</th>
                <th className="py-3 pr-4 font-medium">Status</th>
                <th className="py-3 pr-4 font-medium">Kundennr.</th>
                <th className="py-3 pr-4 font-medium text-right">Limit</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <Fragment key={a.id}>
                  <tr
                    className="border-b last:border-0 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setOpen(open === a.id ? null : a.id)}
                  >
                    <td className="py-3 px-3 text-gray-400">
                      {open === a.id ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </td>
                    <td className="py-3 pr-4 whitespace-nowrap">{formatDate(a.appliedAt)}</td>
                    <td className="py-3 pr-4 font-medium text-navy">{a.company}</td>
                    <td className="py-3 pr-4">
                      {a.firstname} {a.lastname}
                      <span className="block text-xs text-gray-500">{a.email}</span>
                    </td>
                    <td className="py-3 pr-4">{a.country}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-0.5 rounded text-xs ${STATUS_BADGE[a.status].cls}`}>{STATUS_BADGE[a.status].label}</span>
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs">{a.customerNumber ?? '–'}</td>
                    <td className="py-3 pr-4 text-right">{a.creditLimitGross != null ? formatMoney(a.creditLimitGross) : '–'}</td>
                  </tr>
                  {open === a.id && (
                    <tr className="border-b bg-gray-50">
                      <td colSpan={8} className="p-5">
                        <AccountDetail account={a} onChanged={load} />
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function AccountDetail({ account, onChanged }: { account: CustomerAccount; onChanged: () => Promise<void> }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
        <Fact label="Anschrift">
          {account.street}
          <br />
          {account.zip} {account.city}, {account.country}
        </Fact>
        <Fact label="USt-IdNr.">
          {account.vatId || '–'}
          {account.vatId && !account.vatId.toUpperCase().startsWith('DE') && (
            <span className="block text-xs text-amber-700">Reverse Charge (netto)</span>
          )}
        </Fact>
        <Fact label="Berechtigtes Interesse">{account.legitimate}</Fact>
        <Fact label="Beantragt">{formatDateTime(account.appliedAt)}</Fact>
        {account.decidedAt && <Fact label="Entschieden">{formatDateTime(account.decidedAt)}</Fact>}
        {account.status === 'APPROVED' && (
          <Fact label="Rabatte">
            Firmenauskunft {account.productDiscounts.FULL ?? 0} % · PEP {account.productDiscounts.PEP ?? 0} %
          </Fact>
        )}
        {account.rejectionReason && <Fact label="Ablehnungsgrund">{account.rejectionReason}</Fact>}
      </dl>

      <div className="space-y-6">
        {account.status === 'PENDING' && (
          <>
            <ConditionsForm account={account} mode="approve" onDone={onChanged} />
            <RejectForm account={account} onDone={onChanged} />
          </>
        )}
        {account.status === 'APPROVED' && (
          <>
            <ConditionsForm account={account} mode="update" onDone={onChanged} />
            <RevokeKeys account={account} />
          </>
        )}
      </div>
    </div>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-navy mt-0.5">{children}</dd>
    </div>
  );
}

function ConditionsForm({
  account,
  mode,
  onDone,
}: {
  account: CustomerAccount;
  mode: 'approve' | 'update';
  onDone: () => Promise<void>;
}) {
  const [limit, setLimit] = useState(String(account.creditLimitGross ?? 500));
  const [full, setFull] = useState(String(account.productDiscounts.FULL ?? 0));
  const [pep, setPep] = useState(String(account.productDiscounts.PEP ?? 0));
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const toNumber = (v: string) => Number(v.replace(',', '.'));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const body: CustomerConditions = {
      creditLimitGross: toNumber(limit),
      productDiscounts: { FULL: toNumber(full), PEP: toNumber(pep) },
    };
    if (!(body.creditLimitGross > 0)) {
      setError('Das Limit muss größer als 0 sein.');
      return;
    }
    setBusy(true);
    setError(null);
    setOk(null);
    const res =
      mode === 'approve'
        ? await apiPost<CustomerAccount>(`/api/admin/customer-accounts/${account.id}/approve`, body)
        : await apiPut<CustomerAccount>(`/api/admin/customer-accounts/${account.id}/conditions`, body);
    setBusy(false);
    if (!res.ok) {
      const fe = fieldErrorMap(res.error);
      setError(Object.keys(fe).length ? Object.entries(fe).map(([k, v]) => `${k}: ${v}`).join(', ') : errorText(res.error));
      return;
    }
    setOk(mode === 'approve' ? 'Freigegeben – der Kunde wurde per E-Mail informiert.' : 'Konditionen gespeichert (gelten für künftige Bestellungen).');
    await onDone();
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      <h3 className="font-semibold text-navy">{mode === 'approve' ? 'Freigeben' : 'Konditionen ändern'}</h3>
      <div className="grid grid-cols-3 gap-3">
        <NumberField label="Limit/Monat brutto (€)" value={limit} onChange={setLimit} />
        <NumberField label="Rabatt Auskunft (%)" value={full} onChange={setFull} />
        <NumberField label="Rabatt PEP (%)" value={pep} onChange={setPep} />
      </div>
      <FormError message={error} />
      <FormSuccess message={ok} />
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark disabled:opacity-60"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        {mode === 'approve' ? 'Antrag freigeben' : 'Speichern'}
      </button>
    </form>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      <input type="text" inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} className={inputCls} />
    </label>
  );
}

function RejectForm({ account, onDone }: { account: CustomerAccount; onDone: () => Promise<void> }) {
  const [reason, setReason] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      setError('Bitte einen Grund angeben – er wird dem Kunden angezeigt und per E-Mail geschickt.');
      return;
    }
    if (!window.confirm(`Antrag von ${account.company} wirklich ablehnen?`)) return;
    setBusy(true);
    setError(null);
    const res = await apiPost(`/api/admin/customer-accounts/${account.id}/reject`, { reason: reason.trim() });
    setBusy(false);
    if (!res.ok) {
      setError(errorText(res.error));
      return;
    }
    await onDone();
  };

  return (
    <form onSubmit={submit} className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      <h3 className="font-semibold text-navy">Ablehnen</h3>
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        rows={2}
        placeholder="Grund (für den Kunden sichtbar)"
        className={inputCls}
      />
      <FormError message={error} />
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-red-300 text-red-700 font-semibold hover:bg-red-50 disabled:opacity-60"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Antrag ablehnen
      </button>
    </form>
  );
}

function RevokeKeys({ account }: { account: CustomerAccount }) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const revoke = async () => {
    if (!window.confirm(`Alle API-Keys (Live und Test) von ${account.company} widerrufen?`)) return;
    setBusy(true);
    const res = await apiDelete(`/api/admin/customer-accounts/${account.id}/api-key`);
    setBusy(false);
    setMsg(res.ok ? { ok: true, text: 'API-Keys widerrufen.' } : { ok: false, text: errorText(res.error) });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
      <h3 className="font-semibold text-navy">API-Zugang</h3>
      <p className="text-sm text-gray-600">Widerruft Live- und Test-Key. Der Kunde kann im Portal neue Keys erzeugen.</p>
      {msg && (msg.ok ? <FormSuccess message={msg.text} /> : <FormError message={msg.text} />)}
      <button
        type="button"
        onClick={revoke}
        disabled={busy}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-red-300 text-red-700 font-semibold hover:bg-red-50 disabled:opacity-60"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        API-Keys widerrufen
      </button>
    </div>
  );
}
