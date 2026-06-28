import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import {
  Euro, BellRing, Clock, RefreshCw, Calculator, FileSearch, Layers, FolderArchive,
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
    title: t('policyManager.title'),
    description: t('policyManager.description'),
    alternates: { canonical: '/policymanager' },
    openGraph: {
      title: t('policyManager.title'),
      description: t('policyManager.description'),
      url: `${SITE_URL}/policymanager`,
      type: 'website',
    },
  };
}

export default async function PolicyManagerPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PolicyManager' });

  const features = [
    { title: t('features.subscription.title'), description: t('features.subscription.description'), icon: Euro },
    { title: t('features.reminder.title'), description: t('features.reminder.description'), icon: BellRing },
    { title: t('features.timeSaving.title'), description: t('features.timeSaving.description'), icon: Clock },
    { title: t('features.currentData.title'), description: t('features.currentData.description'), icon: RefreshCw },
    { title: t('features.costAnalysis.title'), description: t('features.costAnalysis.description'), icon: Calculator },
    { title: t('features.creditReports.title'), description: t('features.creditReports.description'), icon: FileSearch },
    { title: t('features.oneLimit.title'), description: t('features.oneLimit.description'), icon: Layers },
    { title: t('features.followUp.title'), description: t('features.followUp.description'), icon: FolderArchive },
  ];

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
  ];

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema({
            name: 'PolicyManager',
            description: t('hero.subtitle'),
            url: `${SITE_URL}/policymanager`,
          }),
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: t('breadcrumb'), path: '/policymanager' },
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
              <Button href="#features" variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-navy">{t('hero.secondaryCta')}</Button>
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
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{t('allInOne.title')}</h2>
            <p className="text-lg text-gray-600 mb-6">{t('allInOne.body1')}</p>
            <p className="text-lg text-gray-600 mb-6">{t('allInOne.body2')}</p>
            <ul className="space-y-3 mb-8">
              {(['bullet1', 'bullet2', 'bullet3', 'bullet4'] as const).map((k) => (
                <li key={k} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                  {t(`allInOne.${k}`)}
                </li>
              ))}
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">{t('allInOne.cta')}</Button>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-navy/10 rounded-2xl p-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-navy text-lg mb-4">{t('dashboard.title')}</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-navy">Mustermann GmbH</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">{t('dashboard.statusActive')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('dashboard.limit')}</span>
                    <span className="font-semibold text-navy">€ 250.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('dashboard.usage')}</span>
                    <span className="font-semibold text-primary">78%</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-navy">Beispiel AG</span>
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">{t('dashboard.statusReview')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('dashboard.limitRequested')}</span>
                    <span className="font-semibold text-navy">€ 500.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('dashboard.status')}</span>
                    <span className="font-semibold text-yellow-600">{t('dashboard.statusInProgress')}</span>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-navy">Test KG</span>
                    <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">{t('dashboard.statusWarning')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('dashboard.limit')}</span>
                    <span className="font-semibold text-navy">€ 100.000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">{t('dashboard.usage')}</span>
                    <span className="font-semibold text-red-500">95%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FAQ title={t('faq.title')} subtitle={t('faq.subtitle')} items={faqItems} />
    </>
  );
}
