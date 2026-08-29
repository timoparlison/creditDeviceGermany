import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AuthCard } from '@/components/customer/AuthCard';
import { ForgotPasswordForm } from '@/components/customer/ForgotPasswordForm';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('forgotPassword.title'), robots: { index: false, follow: false } };
}

export default async function ForgotPasswordPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });

  return (
    <AuthCard title={t('forgotPassword.title')} subtitle={t('forgotPassword.subtitle')}>
      <ForgotPasswordForm />
    </AuthCard>
  );
}
