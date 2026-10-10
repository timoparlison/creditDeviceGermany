import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Building2, CheckCircle2, Clock, ShieldCheck, XCircle } from 'lucide-react';
import { Link, getPathname } from '@/i18n/navigation';
import { getAccount, getAccountOverview, getCustomerAccount, getPrices } from '@/lib/customer/client';
import { getSessionToken } from '@/lib/customer/session';
import { countryName } from '@/lib/customer/countries';
import { formatDate } from '@/lib/customer/format';
import { AccountOverviewPanel } from '@/components/customer/AccountOverviewPanel';
import { ApplicationForm } from '@/components/customer/ApplicationForm';
import { ChangePasswordForm } from '@/components/customer/ChangePasswordForm';
import { Card } from '@/components/customer/ui';
import type { CustomerAccount } from '@/lib/customer/types';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('nav.myAccount'), robots: { index: false, follow: false } };
}

export default async function AccountHomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return (
    <div className="space-y-6">
      <AccountState locale={locale} />
      <Card title={t('password.title')}>
        <ChangePasswordForm />
      </Card>
    </div>
  );
}

async function AccountState({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: 'Account' });

  const token = await getSessionToken();
  if (!token) redirect(getPathname({ href: '/konto/login', locale }));

  const [user, account] = await Promise.all([getAccount(token), getCustomerAccount(token)]);

  // No application yet: step 2 of the onboarding.
  if (!account) {
    return (
      <Card title={t('application.title')}>
        <p className="text-gray-600 mb-6">{t('application.intro')}</p>
        <ApplicationForm
          initial={{
            firstname: user.firstName ?? '',
            lastname: user.lastName ?? '',
            email: user.email,
          }}
        />
      </Card>
    );
  }

  if (account.status === 'PENDING') {
    return (
      <div className="space-y-6">
        <StatusBanner tone="info" icon={<Clock className="w-6 h-6" />} title={t('status.pendingTitle')}>
          {t('status.pendingBody', { date: formatDate(account.appliedAt, locale) })}
        </StatusBanner>
        <MasterData account={account} locale={locale} t={t} />
      </div>
    );
  }

  if (account.status === 'REJECTED') {
    return (
      <div className="space-y-6">
        <StatusBanner tone="error" icon={<XCircle className="w-6 h-6" />} title={t('status.rejectedTitle')}>
          <p>{t('status.rejectedBody')}</p>
          {account.rejectionReason && (
            <p className="mt-2">
              <span className="font-medium">{t('status.reason')}:</span> {account.rejectionReason}
            </p>
          )}
        </StatusBanner>
        <Card title={t('application.reapplyTitle')}>
          <ApplicationForm initial={{ ...account, vatId: account.vatId ?? '' }} />
        </Card>
      </div>
    );
  }

  const [overview, prices] = await Promise.all([getAccountOverview(token), getPrices(token)]);

  return (
    <div className="space-y-6">
      <StatusBanner tone="success" icon={<CheckCircle2 className="w-6 h-6" />} title={t('status.approvedTitle')}>
        {t('status.approvedBody', { number: account.customerNumber ?? '–' })}
        <div className="flex flex-wrap gap-3 mt-3">
          <Link href="/konto/bestellen" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-white font-semibold hover:bg-primary-dark">
            <Building2 className="w-4 h-4" />
            {t('status.orderFull')}
          </Link>
          <Link href={{ pathname: '/konto/bestellen', query: { product: 'PEP' } }} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-green-300 bg-white text-navy font-semibold hover:bg-green-50">
            <ShieldCheck className="w-4 h-4" />
            {t('status.orderPep')}
          </Link>
        </div>
      </StatusBanner>
      <AccountOverviewPanel overview={overview} prices={prices} locale={locale} />
      <MasterData account={account} locale={locale} t={t} />
    </div>
  );
}

type T = Awaited<ReturnType<typeof getTranslations<'Account'>>>;

function MasterData({ account, locale, t }: { account: CustomerAccount; locale: string; t: T }) {
  return (
    <Card title={t('status.masterDataTitle')}>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Fact label={t('application.company')}>{account.company}</Fact>
        <Fact label={t('status.contact')}>
          {account.firstname} {account.lastname}
          <br />
          {account.email}
        </Fact>
        <Fact label={t('status.address')}>
          {account.street}
          <br />
          {account.zip} {account.city}
          <br />
          {countryName(account.country, locale)}
        </Fact>
        <Fact label={t('application.vatId')}>{account.vatId || '–'}</Fact>
        <Fact label={t('application.legitimate')}>{account.legitimate}</Fact>
      </dl>
    </Card>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-navy mt-1">{children}</dd>
    </div>
  );
}

const TONES = {
  info: 'bg-blue-50 border-blue-200 text-blue-900',
  success: 'bg-green-50 border-green-200 text-green-900',
  error: 'bg-red-50 border-red-200 text-red-900',
} as const;

function StatusBanner({
  tone,
  icon,
  title,
  children,
}: {
  tone: keyof typeof TONES;
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`rounded-xl border p-5 flex gap-4 ${TONES[tone]}`}>
      <div className="shrink-0">{icon}</div>
      <div>
        <h2 className="font-semibold mb-1">{title}</h2>
        <div className="text-sm">{children}</div>
      </div>
    </div>
  );
}
