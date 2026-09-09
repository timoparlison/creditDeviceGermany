import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { FAQ } from '@/components/sections';
import { PepCheckFlow } from '@/components/pep/PepCheckFlow';
import { Landmark, ShieldCheck, Zap } from 'lucide-react';
import {
  JsonLd,
  breadcrumbSchema,
  faqSchema,
  pepCheckServiceSchema,
} from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const runtime = 'edge';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  const canonical = locale === 'de' ? '/pep-check/' : `/${locale}/pep-check/`;
  return {
    title: t('pepCheck.title'),
    description: t('pepCheck.description'),
    alternates: { canonical },
    openGraph: {
      title: t('pepCheck.title'),
      description: t('pepCheck.description'),
      url: `${SITE_URL}${canonical}`,
      type: 'website',
    },
  };
}

export default async function PepCheckPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PepCheck' });

  const faqItems = ([1, 2, 3, 4, 5] as const).map((n) => ({
    question: t(`faqQ${n}`),
    answer: t(`faqA${n}`),
  }));

  return (
    <>
      <JsonLd
        data={[
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: t('breadcrumb'), path: '/pep-check' },
          ]),
          pepCheckServiceSchema(),
        ]}
      />

      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              {t('pageTagline')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-5">
              {t('pageTitle')}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">{t('pageSubtitle')}</p>
          </div>
        </Container>
      </section>

      <Section background="gray">
        <PepCheckFlow />
      </Section>

      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Benefit icon={<Landmark className="w-6 h-6 text-primary" />} title={t('benefit1Title')} desc={t('benefit1Desc')} />
          <Benefit icon={<Zap className="w-6 h-6 text-primary" />} title={t('benefit2Title')} desc={t('benefit2Desc')} />
          <Benefit icon={<ShieldCheck className="w-6 h-6 text-primary" />} title={t('benefit3Title')} desc={t('benefit3Desc')} />
        </div>
      </Section>

      <FAQ title={t('faqTitle')} subtitle={t('faqSubtitle')} items={faqItems} />
    </>
  );
}

function Benefit({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-4">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-navy mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{desc}</p>
      </div>
    </div>
  );
}
