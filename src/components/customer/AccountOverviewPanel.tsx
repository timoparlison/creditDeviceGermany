import { getTranslations } from 'next-intl/server';
import { formatMoney } from '@/lib/customer/format';
import type { AccountOverview, PriceQuote } from '@/lib/customer/types';
import { Card } from './ui';

/** Credit-limit usage of the current month plus the customer's own price list (server component). */
export async function AccountOverviewPanel({
  overview,
  prices,
  locale,
}: {
  overview: AccountOverview;
  prices: PriceQuote[];
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: 'Account' });
  const money = (v: number) => formatMoney(v, 'EUR', locale);

  const limit = overview.creditLimitGross;
  const usedPct = limit > 0 ? Math.min(100, (overview.usedGross / limit) * 100) : 100;
  const barColor = usedPct >= 100 ? 'bg-red-500' : usedPct >= 80 ? 'bg-amber-500' : 'bg-primary';
  const [year, month] = overview.period.split('-').map(Number);
  const periodLabel = new Intl.DateTimeFormat(locale === 'no' ? 'nb' : locale, {
    month: 'long',
    year: 'numeric',
  }).format(new Date(year, month - 1, 1));

  return (
    <div className="space-y-6">
      <Card title={t('overview.title', { period: periodLabel })}>
        <dl className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
          <Fact label={t('overview.limit')} value={money(limit)} />
          <Fact label={t('overview.used')} value={money(overview.usedGross)} />
          <Fact label={t('overview.available')} value={money(overview.availableGross)} strong />
          <Fact label={t('overview.orders')} value={String(overview.ordersInPeriod)} />
        </dl>
        <div
          className="h-3 rounded-full bg-gray-100 overflow-hidden"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(usedPct)}
        >
          <div className={`h-full ${barColor}`} style={{ width: `${usedPct}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-3">
          {t('overview.hint', { tolerance: money(overview.toleranceGross) })}
        </p>
      </Card>

      <Card title={t('prices.title')}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-2 pr-4 font-medium">{t('prices.product')}</th>
                <th className="py-2 pr-4 font-medium">{t('prices.zone')}</th>
                <th className="py-2 pr-4 font-medium text-right">{t('prices.listNet')}</th>
                <th className="py-2 pr-4 font-medium text-right">{t('prices.discount')}</th>
                <th className="py-2 pr-4 font-medium text-right">{t('prices.net')}</th>
                <th className="py-2 font-medium text-right">{t('prices.gross')}</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((q) => (
                <tr key={`${q.product}-${q.priceZone}`} className="border-b last:border-0">
                  <td className="py-2 pr-4 text-navy">{t(`products.${q.product}`)}</td>
                  <td className="py-2 pr-4 text-gray-600">{t(`zones.${q.priceZone}`)}</td>
                  <td className="py-2 pr-4 text-right text-gray-600">{money(q.price.listNet)}</td>
                  <td className="py-2 pr-4 text-right text-gray-600">
                    {q.price.discountPercent > 0 ? `${q.price.discountPercent} %` : '–'}
                  </td>
                  <td className="py-2 pr-4 text-right text-navy">{money(q.price.net)}</td>
                  <td className="py-2 text-right font-medium text-navy">{money(q.price.gross)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 mt-3">{t('prices.hint')}</p>
      </Card>
    </div>
  );
}

function Fact({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className={`mt-1 text-navy ${strong ? 'text-xl font-bold' : 'text-lg font-semibold'}`}>{value}</dd>
    </div>
  );
}
