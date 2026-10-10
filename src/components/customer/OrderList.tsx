'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ChevronDown, ChevronRight, Download, Loader2 } from 'lucide-react';
import { apiGet } from '@/lib/customer/api';
import { formatDateTime, formatMoney } from '@/lib/customer/format';
import type { CustomerOrderDetail, CustomerOrderView, OrderFilter, Product } from '@/lib/customer/types';
import type { PsCheckResponse } from '@/lib/gcc/types';
import { PepResultCard } from '@/components/pep/PepCheckFlow';
import { orderPdfUrl } from './PortalOrder';
import { Card, FormError, inputCls } from './ui';

const PAGE_SIZE = 20;

type Filter = Required<Pick<OrderFilter, 'from' | 'to' | 'customerReference'>> & { product: '' | Product };
const EMPTY_FILTER: Filter = { product: '', from: '', to: '', customerReference: '' };

export function OrderList() {
  const t = useTranslations('Account');
  const locale = useLocale();

  const [draft, setDraft] = useState<Filter>(EMPTY_FILTER);
  const [filter, setFilter] = useState<Filter>(EMPTY_FILTER);
  const [page, setPage] = useState(0);
  const [orders, setOrders] = useState<CustomerOrderView[] | null>(null);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    const q = new URLSearchParams({ page: String(page), size: String(PAGE_SIZE) });
    for (const [k, v] of Object.entries(filter)) if (v) q.set(k, v.trim());
    try {
      const res = await fetch(`/api/customer/portal/orders/?${q}`, { headers: { Accept: 'application/json' } });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(res.status === 400 && body?.code === 'error.invalidRequest' ? t('orders.errRange') : t('common.loadError'));
      }
      setOrders((await res.json()) as CustomerOrderView[]);
      setTotal(Number(res.headers.get('x-total-count') ?? 0));
    } catch (e) {
      setError(e instanceof Error ? e.message : t('common.loadError'));
    } finally {
      setLoading(false);
    }
  }, [filter, page, t]);

  useEffect(() => {
    void load();
  }, [load]);

  const onFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    setFilter(draft);
  };

  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const money = (v: number) => formatMoney(v, 'EUR', locale);

  return (
    <div className="space-y-6">
      <Card>
        <form onSubmit={onFilter} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[160px_160px_160px_1fr_auto] gap-3 items-end">
          <FilterField label={t('orders.product')}>
            <select
              value={draft.product}
              onChange={(e) => setDraft({ ...draft, product: e.target.value as Filter['product'] })}
              className={inputCls}
            >
              <option value="">{t('orders.all')}</option>
              <option value="FULL">{t('products.FULL')}</option>
              <option value="PEP">{t('products.PEP')}</option>
            </select>
          </FilterField>
          <FilterField label={t('orders.from')}>
            <input type="date" value={draft.from} onChange={(e) => setDraft({ ...draft, from: e.target.value })} className={inputCls} />
          </FilterField>
          <FilterField label={t('orders.to')}>
            <input type="date" value={draft.to} onChange={(e) => setDraft({ ...draft, to: e.target.value })} className={inputCls} />
          </FilterField>
          <FilterField label={t('orders.reference')}>
            <input
              type="text"
              maxLength={20}
              value={draft.customerReference}
              onChange={(e) => setDraft({ ...draft, customerReference: e.target.value })}
              className={inputCls}
            />
          </FilterField>
          <button type="submit" className="px-5 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark">
            {t('orders.apply')}
          </button>
        </form>
      </Card>

      <Card>
        <FormError message={error} />
        {loading && !orders ? (
          <p className="text-sm text-gray-500">{t('common.loading')}</p>
        ) : orders && orders.length === 0 ? (
          <p className="text-sm text-gray-600">{t('orders.empty')}</p>
        ) : (
          orders && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-2 pr-2" />
                    <th className="py-2 pr-4 font-medium">{t('orders.date')}</th>
                    <th className="py-2 pr-4 font-medium">{t('orders.orderId')}</th>
                    <th className="py-2 pr-4 font-medium">{t('orders.product')}</th>
                    <th className="py-2 pr-4 font-medium">{t('orders.object')}</th>
                    <th className="py-2 pr-4 font-medium">{t('orders.reference')}</th>
                    <th className="py-2 pr-4 font-medium text-right">{t('prices.net')}</th>
                    <th className="py-2 pr-4 font-medium text-right">{t('prices.gross')}</th>
                    <th className="py-2 pr-4 font-medium">{t('orders.status')}</th>
                    <th className="py-2 font-medium">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <Fragment key={o.orderId}>
                      <tr className="border-b last:border-0 align-top">
                        <td className="py-2 pr-2">
                          <button
                            type="button"
                            onClick={() => setOpen(open === o.orderId ? null : o.orderId)}
                            aria-expanded={open === o.orderId}
                            aria-label={t('orders.details')}
                            className="text-gray-500 hover:text-primary"
                          >
                            {open === o.orderId ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        </td>
                        <td className="py-2 pr-4 whitespace-nowrap">{formatDateTime(o.orderedAt, locale)}</td>
                        <td className="py-2 pr-4 font-mono text-xs">{o.orderId}</td>
                        <td className="py-2 pr-4">
                          {t(`products.${o.product}`)}
                          {o.channel === 'API' && <span className="ml-1 text-xs text-gray-400">(API)</span>}
                        </td>
                        <td className="py-2 pr-4 text-gray-600 break-all">{o.objectRef ?? '–'}</td>
                        <td className="py-2 pr-4 text-gray-600">{o.customerReference ?? '–'}</td>
                        <td className="py-2 pr-4 text-right">{money(o.net)}</td>
                        <td className="py-2 pr-4 text-right font-medium">{money(o.gross)}</td>
                        <td className="py-2 pr-4">
                          <span
                            className={`inline-block px-2 py-0.5 rounded text-xs ${
                              o.invoiced ? 'bg-gray-100 text-gray-600' : 'bg-blue-50 text-blue-700'
                            }`}
                          >
                            {o.invoiced ? t('orders.invoiced') : t('orders.open')}
                          </span>
                        </td>
                        <td className="py-2">
                          <a href={orderPdfUrl(o.orderId)} target="_blank" rel="noopener" className="text-primary hover:text-primary-dark" aria-label={t('order.pdf')}>
                            <Download className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                      {open === o.orderId && (
                        <tr className="border-b bg-gray-50">
                          <td colSpan={10} className="p-4">
                            <OrderDetail orderId={o.orderId} />
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}

        {pages > 1 && (
          <div className="flex items-center justify-between mt-4 text-sm">
            <button type="button" disabled={page === 0 || loading} onClick={() => setPage(page - 1)} className="text-primary disabled:text-gray-300">
              ← {t('orders.prev')}
            </button>
            <span className="text-gray-500">{t('orders.page', { page: page + 1, total: pages })}</span>
            <button type="button" disabled={page + 1 >= pages || loading} onClick={() => setPage(page + 1)} className="text-primary disabled:text-gray-300">
              {t('orders.next')} →
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}

function FilterField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium text-gray-600 mb-1">{label}</span>
      {children}
    </label>
  );
}

/** Lazily loaded order detail: price breakdown and, for PEP, the hits. */
function OrderDetail({ orderId }: { orderId: string }) {
  const t = useTranslations('Account');
  const tp = useTranslations('PepCheck');
  const locale = useLocale();
  const [detail, setDetail] = useState<CustomerOrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void apiGet<CustomerOrderDetail>(`/api/customer/portal/orders/${encodeURIComponent(orderId)}`).then((res) =>
      res.ok ? setDetail(res.data) : setError(t('common.loadError')),
    );
  }, [orderId, t]);

  if (error) return <FormError message={error} />;
  if (!detail) return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;

  const m = (v: number) => formatMoney(v, detail.price.currency, locale);
  const pep = detail.psCheckResponse as PsCheckResponse | undefined;
  const hits = pep?.results?.results ?? [];

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-sm">
        <Fact label={t('prices.listNet')} value={m(detail.price.listNet)} />
        <Fact label={t('prices.discount')} value={detail.price.discountPercent > 0 ? `${detail.price.discountPercent} %` : '–'} />
        <Fact label={t('prices.net')} value={m(detail.price.net)} />
        <Fact label={t('order.vat')} value={m(detail.price.vat)} />
        <Fact label={t('prices.gross')} value={m(detail.price.gross)} />
      </dl>
      {pep && (
        <div>
          <p className="font-medium text-navy mb-2">{tp('totalResults', { count: String(pep.results?.totalResults ?? hits.length) })}</p>
          {hits.length === 0 ? (
            <p className="text-sm text-gray-600">{tp('noHits')}</p>
          ) : (
            <ul className="space-y-3">
              {hits.map((hit, i) => (
                <PepResultCard key={hit.recordUUID ?? i} hit={hit} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-gray-500">{label}</dt>
      <dd className="text-navy">{value}</dd>
    </div>
  );
}
