import { Metadata } from 'next';
import { Features, FAQ } from '@/components/sections';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { SearchForm } from '@/components/auskunft/SearchForm';
import { Globe, TrendingUp, Zap, BarChart3, Database, Shield } from 'lucide-react';
import { JsonLd, breadcrumbSchema, faqSchema } from '@/components/seo/JsonLd';
import { SITE_URL } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Bonitätsinformationen aus über 200 Ländern',
  description:
    'Zuverlässige Bonitätsinformationen und Wirtschaftsauskünfte aus über 200 Ländern. Fundierte Geschäftsentscheidungen mit tagesaktuellen Daten — minimieren Sie Ihr Debitorenrisiko.',
  alternates: { canonical: '/bonitaetsinformationen' },
  openGraph: {
    title: 'Bonitätsinformationen aus über 200 Ländern',
    description:
      'Zuverlässige Bonitätsinformationen und Wirtschaftsauskünfte aus über 200 Ländern.',
    url: `${SITE_URL}/bonitaetsinformationen`,
    type: 'website',
  },
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
      <JsonLd
        data={[
          faqSchema(faqItems),
          breadcrumbSchema([
            { name: 'Startseite', path: '/' },
            { name: 'Bonitätsinformationen', path: '/bonitaetsinformationen' },
          ]),
        ]}
      />
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              Internationale Kreditinformationen
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-5">
              Frisch recherchierte <br />
              <span className="text-primary">Firmenauskünfte</span> weltweit
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Wir liefern Ihnen innerhalb kürzester Zeit weltweite Kreditauskünfte
              – um die Bonität Ihrer Interessenten und Kunden
              zuverlässig zu überprüfen. Ohne Vertrag mit Laufzeit oder Mindestabnahme.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 max-w-4xl">
            <SearchForm variant="light" />
          </div>
        </Container>
      </section>

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
              Risiko minimieren, Geschäft steigern
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Eine clevere Möglichkeit, Ihre Geschäfte mit Hilfe frisch recherchierter
              Firmenauskünfte von sehr hoher Informationsqualität zu steigern – und Ihr
              Risiko zu minimieren. Ideale Ergänzung zu unserer Credit Management Software.
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
