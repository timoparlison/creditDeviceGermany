import { Hero, ProductCards, AllInOne, WhyUs, FAQ, CustomerLogos, CTABanner } from '@/components/sections';
import { JsonLd, faqSchema } from '@/components/seo/JsonLd';
import { getTranslations } from 'next-intl/server';

type Props = { params: Promise<{ locale: string }> };

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Home' });

  const faqItems = [
    { question: t('faq.q1'), answer: t('faq.a1') },
    { question: t('faq.q2'), answer: t('faq.a2') },
    { question: t('faq.q3'), answer: t('faq.a3') },
    { question: t('faq.q4'), answer: t('faq.a4') },
    { question: t('faq.q5'), answer: t('faq.a5') },
    { question: t('faq.q6'), answer: t('faq.a6') },
  ];

  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <Hero
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        primaryCta={{ text: t('hero.primaryCta'), href: '/kontakt' }}
        secondaryCta={{ text: t('hero.secondaryCta'), href: '/bonitaetsinformationen' }}
        image={locale === 'de' ? '/de/credTitelBildNachTeamsCall.png' : '/en/credTitelBildNachTeamsCall.png'}
        imageAlt={t('hero.imageAlt')}
      />
      <CustomerLogos />
      <ProductCards />
      <AllInOne />
      <WhyUs />
      <FAQ
        title={t('faq.title')}
        subtitle={t('faq.subtitle')}
        items={faqItems}
      />
      <CTABanner />
    </>
  );
}
