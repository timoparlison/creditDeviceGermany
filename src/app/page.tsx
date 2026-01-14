import { Hero, ProductCards, AllInOne, WhyUs, FAQ } from '@/components/sections';

const faqItems = [
  {
    question: 'Was ist Credit Management?',
    answer: 'Credit Management umfasst alle Prozesse zur Steuerung und Überwachung von Kreditrisiken. Dies beinhaltet die Bonitätsprüfung von Kunden, das Debitorenmanagement, das Mahnwesen und die Verwaltung von Kreditversicherungen.',
  },
  {
    question: 'Für welche Unternehmen ist CreditDevice geeignet?',
    answer: 'CreditDevice eignet sich für Unternehmen jeder Größe, die ihre Debitorenrisiken minimieren möchten. Von KMU bis zu Großunternehmen – unsere Lösungen sind skalierbar und passen sich Ihren Anforderungen an.',
  },
  {
    question: 'Kann CreditDevice in bestehende Systeme integriert werden?',
    answer: 'Ja, CreditDevice bietet umfangreiche Integrationsmöglichkeiten. Wir unterstützen Salesforce, verschiedene ERP-Systeme und bieten eine REST-API für individuelle Integrationen.',
  },
  {
    question: 'Wie schnell kann CreditDevice implementiert werden?',
    answer: 'Die Implementierungszeit hängt von Ihren spezifischen Anforderungen ab. Standardimplementierungen können innerhalb weniger Tage abgeschlossen werden. Komplexere Integrationen werden individuell geplant.',
  },
  {
    question: 'Welche Bonitätsinformationen stellt CreditDevice zur Verfügung?',
    answer: 'CreditDevice bietet Zugang zu Bonitätsinformationen aus über 200 Ländern. Sie erhalten Firmendaten, Bonitätsbewertungen, Zahlungserfahrungen und Risikoanalysen von führenden Auskunfteien.',
  },
  {
    question: 'Gibt es eine kostenlose Testphase?',
    answer: 'Ja, wir bieten Ihnen gerne eine kostenlose Demo und Testphase an. Kontaktieren Sie uns, um mehr über die Möglichkeiten zu erfahren.',
  },
];

export default function Home() {
  return (
    <>
      <Hero
        title="Ihr Partner für Credit Management"
        subtitle="Vermeiden Sie finanzielle Risiken und verwalten Sie Ihr gesamtes Credit Management in einer leistungsstarken Anwendung."
        primaryCta={{
          text: 'Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Kostenlose Bonitätsauskunft',
          href: '/bonitaetsinformationen',
        }}
      />

      <ProductCards />

      <AllInOne />

      <WhyUs />

      <FAQ
        title="Häufig gestellte Fragen"
        subtitle="Finden Sie Antworten auf die wichtigsten Fragen zu unseren Lösungen"
        items={faqItems}
      />
    </>
  );
}
