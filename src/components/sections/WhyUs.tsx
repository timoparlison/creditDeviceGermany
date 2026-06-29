'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Section } from '../ui/Section';

const reasonIds = ['reachable', 'innovative', 'committed', 'flexible'] as const;
type ReasonId = typeof reasonIds[number];

const images: Record<ReasonId, { src: string; objectPosition: string }> = {
  reachable:  { src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/05/DSC01727.webp',                    objectPosition: 'top'    },
  innovative: { src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/06/DSC01263-1024x710.webp',           objectPosition: 'top'    },
  committed:  { src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/02/Foto-van-Marcel-en-Olav-scaled.webp', objectPosition: 'center' },
  flexible:   { src: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/04/Roos_homepage-902x1024.webp',     objectPosition: 'top'    },
};

export function WhyUs() {
  const t = useTranslations('WhyUs');
  const [activeId, setActiveId] = useState<ReasonId>('reachable');
  const active = images[activeId];

  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {reasonIds.map((id) => (
          <button
            key={id}
            onClick={() => setActiveId(id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeId === id
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-navy hover:bg-gray-200'
            }`}
          >
            {t(`${id}.title`)}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
          <Image
            src={active.src}
            alt={t(`${activeId}.title`)}
            fill
            className="object-cover"
            style={{ objectPosition: active.objectPosition }}
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{t(`${activeId}.title`)}</h3>
            <p className="text-lg text-gray-200 max-w-2xl">{t(`${activeId}.description`)}</p>
          </div>
        </div>
      </div>

      {/* Grid of smaller cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {reasonIds.map((id) => (
          <button
            key={id}
            onClick={() => setActiveId(id)}
            className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-300 ${
              activeId === id
                ? 'ring-4 ring-primary ring-offset-2'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={images[id].src}
              alt={t(`${id}.title`)}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="text-white font-semibold text-sm">{t(`${id}.title`)}</span>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}
