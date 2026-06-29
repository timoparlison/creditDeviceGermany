'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Section } from '../ui/Section';
import { Handshake, Layers, Phone, ArrowRight } from 'lucide-react';

const tabDefs = [
  { id: 'partner', key: 'tab1' as const, icon: Handshake, image: 'alles-in-one.svg' },
  { id: 'integrated', key: 'tab2' as const, icon: Layers, image: 'alles-in-one.svg' },
  { id: 'contact', key: 'tab3' as const, icon: Phone, image: 'alles-in-one.svg' },
];

export function AllInOne() {
  const locale = useLocale();
  const t = useTranslations('AllInOne');
  const imgPrefix = locale === 'de' ? '/de' : '/en';
  const [activeTab, setActiveTab] = useState(tabDefs[0].id);
  const activeTabData = tabDefs.find((tab) => tab.id === activeTab) || tabDefs[0];

  return (
    <Section background="gray">
      <div className="text-center mb-12">
        <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
          {t('tagline')}
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          {t('title')}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Tab buttons */}
        <div className="space-y-4">
          {tabDefs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-6 rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'bg-navy text-white shadow-lg'
                    : 'bg-white hover:bg-gray-50 text-navy shadow-sm border border-gray-100'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isActive ? 'bg-primary' : 'bg-primary/10'
                    }`}
                  >
                    <IconComponent
                      className={`w-6 h-6 ${isActive ? 'text-white' : 'text-primary'}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-2 flex items-center justify-between">
                      {t(`${tab.key}.title`)}
                      <ArrowRight
                        className={`w-5 h-5 transition-transform ${
                          isActive ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'
                        }`}
                      />
                    </h3>
                    <p
                      className={`text-sm leading-relaxed ${
                        isActive ? 'text-gray-300' : 'text-gray-500'
                      }`}
                    >
                      {t(`${tab.key}.description`)}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Dashboard preview */}
        <div className="lg:sticky lg:top-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-navy/20 rounded-3xl blur-2xl" />
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
              <Image
                src={`${imgPrefix}/${activeTabData.image}`}
                alt={t(`${activeTabData.key}.title`)}
                width={700}
                height={400}
                className="w-full h-auto"
                unoptimized
              />
            </div>

            {/* Stats overlay */}
            <div className="relative mt-4 w-full lg:absolute lg:mt-0 lg:-bottom-12 lg:left-[27%] lg:w-[68%]">
              <div className="bg-navy rounded-xl p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-white text-center">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">2.500+</div>
                    <div className="text-xs text-gray-300">{t('activeClients')}</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">1.2M+</div>
                    <div className="text-xs text-gray-300">{t('dossiers')}</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">200+</div>
                    <div className="text-xs text-gray-300">{t('countries')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
