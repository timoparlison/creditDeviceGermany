import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Section } from '../ui/Section';
import { ArrowRight, Search, FileText, Shield, Check } from 'lucide-react';

export async function ProductCards() {
  const t = await getTranslations('ProductCards');

  const products = [
    {
      title: t('creditInformation.title'),
      description: t('creditInformation.description'),
      href: '/bonitaetsinformationen',
      icon: Search,
      features: [
        t('creditInformation.feature1'),
        t('creditInformation.feature2'),
        t('creditInformation.feature3'),
        t('creditInformation.feature4'),
        t('creditInformation.feature5'),
      ],
    },
    {
      title: t('cms.title'),
      description: t('cms.description'),
      href: '/credit-management-software',
      icon: FileText,
      features: [
        t('cms.feature1'),
        t('cms.feature2'),
        t('cms.feature3'),
        t('cms.feature4'),
      ],
    },
    {
      title: t('policyManager.title'),
      description: t('policyManager.description'),
      href: '/policymanager',
      icon: Shield,
      features: [
        t('policyManager.feature1'),
        t('policyManager.feature2'),
        t('policyManager.feature3'),
        t('policyManager.feature4'),
      ],
    },
  ];

  return (
    <Section background="white">
      <div className="text-center mb-14">
        <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
          {t('tagline')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          {t('title')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const IconComponent = product.icon;
          return (
            <Link
              key={product.title}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              href={product.href as any}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Navy header bar */}
              <div className="bg-navy px-6 py-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                  <IconComponent className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white">{product.title}</h3>
              </div>

              {/* Card content */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-3 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start text-sm text-gray-700">
                      <div className="w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-3 mt-0.5">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                  {t('learnMore')}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
