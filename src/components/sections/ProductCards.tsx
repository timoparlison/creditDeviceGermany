import Link from 'next/link';
import { Section } from '../ui/Section';
import { ArrowRight, Search, Settings, Shield } from 'lucide-react';

const products = [
  {
    title: 'Bonitätsinformationen',
    description: 'Zuverlässige Daten, intelligente Einblicke und minimale Risiken. Treffen Sie fundierte Geschäftsentscheidungen.',
    icon: Search,
    href: '/bonitaetsinformationen',
    features: ['Internationale Abdeckung', 'Risikoanalyse', 'API-Integration'],
  },
  {
    title: 'Credit Management Software',
    description: 'Sparen Sie Zeit, Geld und Energie – Ihr Schlüssel zu effizientem Debitorenmanagement.',
    icon: Settings,
    href: '/credit-management-software',
    features: ['Zentrales Dossier', 'Automatische Workflows', 'Online-Zahlung'],
  },
  {
    title: 'PolisManager',
    description: 'Die einzige echte Lösung zur Verwaltung Ihrer Kreditversicherung.',
    icon: Shield,
    href: '/polismanager',
    features: ['Kreditlimits', 'Umsatzmeldung', 'Selbstbewertung'],
  },
];

export function ProductCards() {
  return (
    <Section background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
          Unsere Lösungen
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Entdecken Sie unsere umfassenden Lösungen für professionelles Credit Management
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => {
          const IconComponent = product.icon;
          return (
            <Link
              key={product.title}
              href={product.href}
              className="group bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <IconComponent className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">{product.title}</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <ul className="space-y-2 mb-6">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-center text-sm text-gray-500">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
              <span className="inline-flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                Mehr erfahren
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
