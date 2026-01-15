'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Section } from '../ui/Section';
import { Hand, Zap, Clock, ArrowRight } from 'lucide-react';

const tabs = [
  {
    id: 'reach',
    title: 'Alles in Reichweite',
    icon: Hand,
    description: 'Greifen Sie auf alle wichtigen Credit Management-Funktionen von einer zentralen Plattform aus zu. Keine Datenfragmentierung mehr – alles übersichtlich an einem Ort.',
    features: ['Zentrales Dashboard', 'Einheitliche Datenquelle', '360° Kundenübersicht'],
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/10-6-1536x386.png',
  },
  {
    id: 'efficiency',
    title: 'Digitale Effizienz',
    icon: Zap,
    description: 'Automatisieren Sie repetitive Aufgaben und sparen Sie wertvolle Zeit. Unsere Software übernimmt das Mahnwesen, die Risikoüberwachung und vieles mehr.',
    features: ['Automatisierte Workflows', 'Intelligente Erinnerungen', 'Digitale Kommunikation'],
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/10-6-1536x386.png',
  },
  {
    id: 'faster',
    title: 'Schneller bezahlt werden',
    icon: Clock,
    description: 'Reduzieren Sie Ihre DSO (Days Sales Outstanding) durch proaktives Debitorenmanagement und einfache Zahlungsmöglichkeiten für Ihre Kunden.',
    features: ['Online-Zahlungslinks', 'Proaktive Kommunikation', 'DSO-Optimierung'],
    image: 'https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2025/09/10-6-1536x386.png',
  },
];

export function AllInOne() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const activeTabData = tabs.find((tab) => tab.id === activeTab) || tabs[0];

  return (
    <Section background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Alles in einer Lösung
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Entdecken Sie, wie CreditDevice Ihr Credit Management revolutioniert
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Tab buttons */}
        <div className="space-y-4">
          {tabs.map((tab) => {
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
                      {tab.title}
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
                      {tab.description}
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
                src={activeTabData.image}
                alt={activeTabData.title}
                width={700}
                height={400}
                className="w-full h-auto"
                unoptimized
              />
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[90%]">
              <div className="bg-navy rounded-xl p-4 shadow-xl">
                <div className="grid grid-cols-3 gap-4 text-white text-center">
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">2.500+</div>
                    <div className="text-xs text-gray-300">Aktive Kunden</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">1.2M+</div>
                    <div className="text-xs text-gray-300">Dossiers</div>
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-bold text-primary">200+</div>
                    <div className="text-xs text-gray-300">Länder</div>
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
