import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
  Eye, Languages, FileBarChart2, ListChecks, Network, MessageSquareWarning,
} from 'lucide-react';
import {
  JsonLd, breadcrumbSchema, faqSchema, softwareApplicationSchema,
} from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  return {
    title: t('creditManagementSoftware.title'),
    description: t('creditManagementSoftware.description'),
    alternates: { canonical: '/credit-management-software' },
    openGraph: {
      title: t('creditManagementSoftware.title'),
      description: t('creditManagementSoftware.description'),
      url: `${SITE_URL}/credit-management-software`,
      type: 'website',
    },
  };
}

export default async function CreditManagementSoftwarePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CreditManagementSoftware' });

  const features = [
    { title: t('features.transparency.title'), description: t('features.transparency.description'), icon: Eye },
    { title: t('features.earlyPayment.title'), description: t('features.earlyPayment.description'), icon: Languages },
    { title: t('features.reports.title'), description: t('features.reports.description'), icon: FileBarChart2 },
    { title: t('features.actionLists.title'), description: t('features.actionLists.description'), icon: ListChecks },
    { title: t('features.groupLevel.title'), description: t('features.groupLevel.description'), icon: Network },
    { title: t('features.complaints.title'), description: t('features.complaints.description'), icon: MessageSquareWarning },
  ];

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
  ];

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: 'CreditDevice Credit Management Software',
            description: t('hero.subtitle'),
            url: `${SITE_URL}/credit-management-software`,
          }),
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: t('breadcrumb'), path: '/credit-management-software' },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] mb-5">{t('hero.title')}</h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">{t('hero.subtitle')}</p>
            <div className="flex flex-wrap gap-4">
              <Button href="/kontakt" variant="primary" size="lg">{t('hero.primaryCta')}</Button>
              <Button href="/kontakt" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-navy">{t('hero.secondaryCta')}</Button>
            </div>
          </div>
        </div>
      </section>

      <Features
        title={t('features.title')}
        subtitle={t('features.subtitle')}
        features={features}
        columns={3}
        background="gray"
      />

      <Section background="white" id="features">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-navy">{t('dashboard.overview')}</span>
                  <span className="text-xs text-gray-500">{t('dashboard.today')}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('dashboard.openItems')}</span>
                    <span className="font-medium text-navy">€ 847.250</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('dashboard.overdue')}</span>
                    <span className="font-medium text-red-500">€ 125.430</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t('dashboard.inCollection')}</span>
                    <span className="font-medium text-orange-500">€ 45.200</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-navy">{t('dashboard.activeWorkflows')}</span>
                  <span className="text-primary text-sm font-medium">23 {t('dashboard.active')}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm text-gray-600">{t('dashboard.paymentReminder')} (12)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm text-gray-600">{t('dashboard.firstReminder')} (7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm text-gray-600">{t('dashboard.collections')} (4)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{t('uniqueness.title')}</h2>
            <p className="text-lg text-gray-600 mb-6">{t('uniqueness.body1')}</p>
            <p className="text-lg text-gray-600 mb-6">{t('uniqueness.body2')}</p>
            <ul className="space-y-3 mb-8">
              {(['bullet1', 'bullet2', 'bullet3'] as const).map((k) => (
                <li key={k} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t(`uniqueness.${k}`)}
                </li>
              ))}
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">{t('uniqueness.cta')}</Button>
          </div>
        </div>
      </Section>

      <FAQ title={t('faq.title')} subtitle={t('faq.subtitle')} items={faqItems} />
    </>
  );
}
