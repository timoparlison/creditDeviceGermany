import type { Metadata } from 'next';
import { getLocale, getTranslations } from 'next-intl/server';
import { Wallet } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { getDashboard } from '@/lib/customer/client';
import { getSessionToken } from '@/lib/customer/session';
import { formatDate, formatDateTime, formatMoney } from '@/lib/customer/format';
import type { CustomerDashboard } from '@/lib/customer/types';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('dashboard.title'), robots: { index: false, follow: false } };
}

export default async function DashboardPage() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'Account' });
  const token = await getSessionToken();

  let data: CustomerDashboard | null = null;
  let failed = false;
  try {
    data = await getDashboard(token!);
  } catch {
    failed = true;
  }

  if (failed || !data) {
    return (
      <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6 text-center">
        <p className="text-gray-700">{t('common.loadError')}</p>
      </div>
    );
  }

  const name = [data.firstName, data.lastName].filter(Boolean).join(' ') || data.company;

  return (
    <div className="space-y-6">
      <p className="text-lg text-navy">{t('dashboard.greeting', { name })}</p>

      {/* Balance */}
      <div className="rounded-xl bg-navy text-white p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{t('dashboard.balanceLabel')}</p>
          <p className="text-3xl font-bold mt-1">
            {formatMoney(data.balance, data.currency, locale)}
          </p>
        </div>
        <Link
          href="/konto/guthaben"
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
        >
          <Wallet className="w-4 h-4" />
          {t('dashboard.topUp')}
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent transactions */}
        <section className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-navy">{t('dashboard.recentTransactions')}</h2>
            <Link href="/konto/guthaben" className="text-sm text-primary hover:underline">
              {t('dashboard.viewAll')}
            </Link>
          </div>
          {data.recentTransactions.length === 0 ? (
            <p className="text-sm text-gray-500">{t('dashboard.noTransactions')}</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {data.recentTransactions.map((tx) => (
                <li key={tx.id} className="py-3 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-navy">
                      {t(`txType.${tx.transactionType}`)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDateTime(tx.createdAt, locale)}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-navy whitespace-nowrap">
                    {formatMoney(tx.amount, data!.currency, locale)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Recent inquiries */}
        <section className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-navy mb-4">{t('dashboard.recentInquiries')}</h2>
          {data.recentInquiries.length === 0 ? (
            <p className="text-sm text-gray-500">{t('dashboard.noInquiries')}</p>
          ) : (
            <ul className="divide-y divide-gray-100">
              {data.recentInquiries.map((inq) => (
                <li key={inq.orderId} className="py-3">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-medium text-navy truncate">{inq.company}</p>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {t(`paymentMethod.${inq.paymentMethod}`)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {t('dashboard.orderNumber')}: {inq.orderNumber}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* Collective invoices preview */}
      {data.recentCollectiveInvoices.length > 0 && (
        <section className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-navy mb-4">{t('dashboard.recentInvoices')}</h2>
          <ul className="divide-y divide-gray-100">
            {data.recentCollectiveInvoices.map((inv) => (
              <li key={inv.id} className="py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-navy">{inv.invoiceNumber}</p>
                  <p className="text-xs text-gray-500">{formatDate(inv.invoiceDate, locale)}</p>
                </div>
                <span className="text-sm font-semibold text-navy">
                  {formatMoney(inv.totalAmount, data!.currency, locale)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
