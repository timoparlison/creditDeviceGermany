'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '../ui/Section';

const reasons = [
  {
    id: 'reachable',
    title: 'Erreichbar',
    description: 'Unser engagiertes Team steht Ihnen jederzeit zur Verfügung. Persönlicher Support, der wirklich hilft – keine anonymen Call-Center, sondern echte Experten.',
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/05/DSC01727.webp',
  },
  {
    id: 'innovative',
    title: 'Innovativ',
    description: 'Wir entwickeln unsere Lösungen kontinuierlich weiter und setzen auf modernste Technologien. Innovation ist Teil unserer DNA.',
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/06/DSC01263-1024x710.webp',
  },
  {
    id: 'committed',
    title: 'Engagiert',
    description: 'Ihr Erfolg ist unser Antrieb. Wir gehen die Extrameile, um Ihre Ziele zu erreichen und Ihre Erwartungen zu übertreffen.',
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/02/Foto-van-Marcel-en-Olav-scaled.webp',
  },
  {
    id: 'flexible',
    title: 'Flexibel',
    description: 'Unsere Lösungen passen sich Ihren Bedürfnissen an, nicht umgekehrt. Skalierbar von KMU bis Großunternehmen.',
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/04/Roos_homepage-902x1024.webp',
  },
];

export function WhyUs() {
  const [activeReason, setActiveReason] = useState(reasons[0].id);
  const activeData = reasons.find((r) => r.id === activeReason) || reasons[0];

  return (
    <Section background="white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Warum CreditDevice?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Wir sind mehr als nur ein Softwareanbieter – wir sind Ihr Partner für erfolgreiches Credit Management
        </p>
      </div>

      {/* Tab navigation */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => setActiveReason(reason.id)}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              activeReason === reason.id
                ? 'bg-navy text-white'
                : 'bg-gray-100 text-navy hover:bg-gray-200'
            }`}
          >
            {reason.title}
          </button>
        ))}
      </div>

      {/* Content card */}
      <div className="relative max-w-4xl mx-auto">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/9]">
          <Image
            src={activeData.image}
            alt={activeData.title}
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">{activeData.title}</h3>
            <p className="text-lg text-gray-200 max-w-2xl">{activeData.description}</p>
          </div>
        </div>
      </div>

      {/* Alternative: Grid of smaller cards on mobile */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
        {reasons.map((reason) => (
          <button
            key={reason.id}
            onClick={() => setActiveReason(reason.id)}
            className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-300 ${
              activeReason === reason.id
                ? 'ring-4 ring-primary ring-offset-2'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Image
              src={reason.image}
              alt={reason.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="text-white font-semibold text-sm">{reason.title}</span>
            </div>
          </button>
        ))}
      </div>
    </Section>
  );
}
