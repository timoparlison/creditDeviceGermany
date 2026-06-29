import { getTranslations } from 'next-intl/server';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { ArrowRight } from 'lucide-react';

export async function CTABanner() {
  const t = await getTranslations('CTABanner');

  return (
    <Section background="navy" className="relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute right-0 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          {t('title')}
        </h2>
        <p className="text-lg md:text-xl text-gray-300 mb-10">
          {t('subtitle')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/kontakt" variant="primary" size="lg">
            {t('primaryCta')}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            href="/bonitaetsinformationen"
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-navy"
          >
            {t('secondaryCta')}
          </Button>
        </div>
      </div>
    </Section>
  );
}
