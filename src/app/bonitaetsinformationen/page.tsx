import { Metadata } from 'next';
import { Hero, Features, FAQ } from '@/components/sections';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Globe, TrendingUp, Zap, BarChart3, Database, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Bonitätsinformationen',
  description: 'Zuverlässige Bonitätsinformationen aus über 200 Ländern. Treffen Sie fundierte Geschäftsentscheidungen mit intelligenten Einblicken und minimieren Sie Ihre Risiken.',
};

const features = [
  {
    title: 'International',
    description: 'Zugang zu Bonitätsdaten aus über 200 Ländern weltweit. Egal wo Ihre Geschäftspartner sitzen.',
    icon: Globe,
  },
  {
    title: 'Risikoanalyse',
    description: 'Umfassende Risikoanalysen helfen Ihnen, fundierte Entscheidungen zu treffen.',
    icon: TrendingUp,
  },
  {
    title: 'Salesforce Integration',
    description: 'Nahtlose Integration in Salesforce für effiziente Arbeitsabläufe.',
    icon: Zap,
  },
  {
    title: 'Webservice / API',
    description: 'Leistungsstarke REST-API für die Integration in Ihre bestehenden Systeme.',
    icon: Database,
  },
  {
    title: 'Marktanalyse',
    description: 'Detaillierte Marktanalysen für strategische Geschäftsentscheidungen.',
    icon: BarChart3,
  },
  {
    title: 'Infoscore',
    description: 'Zugang zu führenden Auskunfteien und Scores für zuverlässige Bewertungen.',
    icon: Shield,
  },
];

const faqItems = [
  {
    question: 'Aus welchen Ländern sind Bonitätsinformationen verfügbar?',
    answer: 'Wir bieten Zugang zu Bonitätsinformationen aus über 200 Ländern weltweit. Dazu gehören alle europäischen Länder, Nord- und Südamerika, Asien und viele weitere Regionen.',
  },
  {
    question: 'Wie aktuell sind die Bonitätsinformationen?',
    answer: 'Unsere Daten werden regelmäßig aktualisiert. Je nach Land und Quelle erhalten Sie tagesaktuelle Informationen oder Daten mit einer Aktualisierung innerhalb weniger Tage.',
  },
  {
    question: 'Kann ich die Bonitätsinformationen in mein CRM integrieren?',
    answer: 'Ja, wir bieten native Integrationen für Salesforce und andere CRM-Systeme sowie eine REST-API für individuelle Integrationen.',
  },
  {
    question: 'Welche Informationen sind in einem Bonitätsbericht enthalten?',
    answer: 'Ein typischer Bericht enthält Firmenstammdaten, Bonitätsscore, Zahlungserfahrungen, Bilanzdaten, Negativmerkmale und eine Risikoeinschätzung.',
  },
];

export default function BonitaetsinformationenPage() {
  return (
    <>
      <Hero
        title="Bonitätsinformationen"
        subtitle="Zuverlässige Daten, intelligente Einblicke und minimale Risiken. Treffen Sie fundierte Geschäftsentscheidungen mit unseren umfassenden Bonitätsinformationen."
        primaryCta={{
          text: 'Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Jetzt testen',
          href: '/kontakt',
        }}
        image="https://206.wpcdnnode.com/creditdevice.com/wp-content/uploads/2024/06/DSC01263-1024x710.webp"
      />

      <Features
        title="Unsere Leistungen"
        subtitle="Profitieren Sie von umfassenden Bonitätsinformationen und intelligenten Analysetools"
        features={features}
        columns={3}
        background="gray"
      />

      <Section background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">
              Minimieren Sie Ihr Ausfallrisiko
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Mit unseren Bonitätsinformationen können Sie das Zahlungsverhalten Ihrer
              Geschäftspartner einschätzen, bevor Sie Verträge abschließen. Reduzieren
              Sie Forderungsausfälle und optimieren Sie Ihr Working Capital.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Echtzeit-Abfragen von über 200 Ländern
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Automatische Monitoring-Funktionen
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Integration in Ihre Geschäftsprozesse
              </li>
              <li className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                Flexible Abrechnungsmodelle
              </li>
            </ul>
            <Button href="/kontakt" variant="primary" size="lg">
              Kostenlose Beratung
            </Button>
          </div>
          <div className="bg-gradient-to-br from-navy to-navy-dark rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Verfügbare Informationen</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span>Firmenstammdaten</span>
                <span className="text-primary font-semibold">200+ Länder</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span>Bonitätsscores</span>
                <span className="text-primary font-semibold">Alle Rechtsformen</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span>Zahlungserfahrungen</span>
                <span className="text-primary font-semibold">Echtzeit</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-white/10 rounded-lg">
                <span>Bilanzdaten</span>
                <span className="text-primary font-semibold">Historisch</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <FAQ
        title="Häufig gestellte Fragen"
        subtitle="Erfahren Sie mehr über unsere Bonitätsinformationen"
        items={faqItems}
      />
    </>
  );
}
