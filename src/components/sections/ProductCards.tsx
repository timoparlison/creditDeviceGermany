import Link from 'next/link';
import { Section } from '../ui/Section';
import { ArrowRight, Search, FileText, Shield, Check } from 'lucide-react';

const products = [
  {
    title: 'Bonitätsinformationen',
    description: 'Zuverlässige Daten, intelligente Einblicke und minimale Risiken. Treffen Sie fundierte Geschäftsentscheidungen.',
    href: '/bonitaetsinformationen',
    icon: Search,
    features: ['Internationale Abdeckung (200+ Länder)', 'Echtzeit-Risikoanalyse', 'API-Integration', 'Monitoring & Alerts'],
  },
  {
    title: 'Credit Management Software',
    description: 'Sparen Sie Zeit, Geld und Energie – Ihr Schlüssel zu effizientem Debitorenmanagement.',
    href: '/credit-management-software',
    icon: FileText,
    features: ['Zentrales Kundendossier', 'Automatische Workflows', 'Online-Zahlungsoptionen', 'Umfassende Berichterstellung'],
  },
  {
    title: 'PolisManager',
    description: 'Die einzige echte Lösung zur Verwaltung Ihrer Kreditversicherung.',
    href: '/polismanager',
    icon: Shield,
    features: ['Kreditlimit-Verwaltung', 'Automatische Umsatzmeldung', 'Selbstbewertungstool', 'Schadenmanagement'],
  },
];

export function ProductCards() {
  return (
    <Section background="white">
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          CreditDevice Gesamtpaket
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Drei leistungsstarke Lösungen für Ihr professionelles Credit Management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => {
          const IconComponent = product.icon;
          return (
            <Link
              key={product.title}
              href={product.href}
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
                  Mehr erfahren
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
