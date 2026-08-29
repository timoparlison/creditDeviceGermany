import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { AuthCard } from '@/components/customer/AuthCard';
import { RegisterForm } from '@/components/customer/RegisterForm';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });
  return { title: t('register.title'), robots: { index: false, follow: false } };
}

export default async function RegisterPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Account' });

  return (
    <AuthCard title={t('register.title')} subtitle={t('register.subtitle')} wide>
      <RegisterForm />
    </AuthCard>
  );
}
