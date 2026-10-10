import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Download } from 'lucide-react';
import { getInvoices } from '@/lib/customer/client';
import { formatDate, formatMoney } from '@/lib/customer/format';
import { requireApprovedAccount } from '@/lib/customer/guards';
import { Card } from '@/components/customer/ui';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('invoices.title'), robots: { index: false, follow: false } };
}

const invoicePdfUrl = (id: number) => `/api/customer/portal/invoices/${id}/pdf/`;

export default async function InvoicesPage({ params }: Props) {
  const { locale } = await params;
  const { token } = await requireApprovedAccount(locale);
  const t = await getTranslations({ locale, namespace: 'Account' });
  const invoices = await getInvoices(token);
  const money = (v: number) => formatMoney(v, 'EUR', locale);
  const period = (p: string) => {
    const [y, m] = p.split('-').map(Number);
    return new Intl.DateTimeFormat(locale === 'no' ? 'nb' : locale, { month: 'long', year: 'numeric' }).format(
      new Date(y, m - 1, 1),
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-navy">{t('invoices.title')}</h2>
      <Card>
        <p className="text-sm text-gray-600 mb-4">{t('invoices.intro')}</p>
        {invoices.length === 0 ? (
          <p className="text-sm text-gray-600">{t('invoices.empty')}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-2 pr-4 font-medium">{t('invoices.number')}</th>
                  <th className="py-2 pr-4 font-medium">{t('invoices.period')}</th>
                  <th className="py-2 pr-4 font-medium">{t('invoices.date')}</th>
                  <th className="py-2 pr-4 font-medium text-right">{t('prices.net')}</th>
                  <th className="py-2 pr-4 font-medium text-right">{t('order.vat')}</th>
                  <th className="py-2 pr-4 font-medium text-right">{t('prices.gross')}</th>
                  <th className="py-2 font-medium">PDF</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <tr key={inv.id} className="border-b last:border-0">
                    <td className="py-2 pr-4 font-mono text-xs">{inv.invoiceNumber}</td>
                    <td className="py-2 pr-4">{period(inv.billingPeriod)}</td>
                    <td className="py-2 pr-4">{formatDate(inv.invoiceDate, locale)}</td>
                    <td className="py-2 pr-4 text-right">{money(inv.net)}</td>
                    <td className="py-2 pr-4 text-right">{money(inv.vat)}</td>
                    <td className="py-2 pr-4 text-right font-medium">{money(inv.gross)}</td>
                    <td className="py-2">
                      <a href={invoicePdfUrl(inv.id)} target="_blank" rel="noopener" className="text-primary hover:text-primary-dark" aria-label="PDF">
                        <Download className="w-4 h-4" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
