import { Hero, ProductCards, AllInOne, WhyUs, FAQ, CustomerLogos, CTABanner } from '@/components/sections';
import { JsonLd, faqSchema } from '@/components/seo/JsonLd';

const faqItems = [
  {
    question: 'Was macht CreditDevice einzigartig?',
    answer: 'CreditDevice bietet eine Komplettlösung für Ihr gesamtes Kreditmanagement. Wir entwickeln unsere Produkte selbst, weil wir die Bedürfnisse unserer Kunden kennen. Jedes Produkt hat seine eigene Stärke – in Kombination werden unsere Lösungen noch leistungsfähiger.',
  },
  {
    question: 'Sind die Module einzeln nutzbar?',
    answer: 'Ja. Unsere interaktiven Module — Credit Management Software, PolicyManager, Kreditinformationen und Inkasso — funktionieren unabhängig voneinander. Als Gesamtlösung entfalten sie jedoch ihre volle Stärke.',
  },
  {
    question: 'Wie schnell erreiche ich einen Ansprechpartner?',
    answer: 'Wir sind ein unabhängiges Unternehmen. In der Praxis bedeutet das kurze Kommunikationswege und direkten Kontakt. Die enge Beziehung zu unseren Kunden spiegelt sich auch im Entwicklungsprozess neuer Produkte wider.',
  },
  {
    question: 'Wie erhalte ich internationale Kreditinformationen?',
    answer: 'Mit unseren internationalen Online-Firmenauskünften erhalten Sie innerhalb kürzester Zeit weltweite Kreditinformationen — ohne Vertrag, ohne Laufzeit oder Mindestabnahme.',
  },
  {
    question: 'Wie hilft der PolicyManager bei der Kreditversicherung?',
    answer: 'Der PolicyManager führt alle wichtigen und relevanten Informationen Ihrer Kreditversicherung zusammen. Dank des Benachrichtigungssystems verhindern Sie Entschädigungsverluste und halten Kreditlimits stets aktuell.',
  },
  {
    question: 'Welche Rolle spielt die Credit Management Software?',
    answer: 'Unsere Credit Management Software geht über reines Debitorenmanagement hinaus. Sie bietet Einblicke in das Zahlungsverhalten Ihrer Kunden, damit Sie im Voraus Entscheidungen treffen, gezielte Maßnahmen ergreifen und Risiken minimieren können.',
  },
];

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(faqItems)} />
      <Hero
        title="Die Gesamtlösung für das Kreditmanagement"
        subtitle="CreditDevice bietet eine Komplettlösung für Ihr gesamtes Kreditmanagement. Jedes Produkt hat seine eigene Stärke – kombinieren Sie Module für eine effiziente Gesamtlösung."
        primaryCta={{
          text: 'Demo anfordern',
          href: '/kontakt',
        }}
        secondaryCta={{
          text: 'Bonitätsauskunft',
          href: '/bonitaetsinformationen',
        }}
        image="/credTitelBildNachTeamsCall.png"
        imageAlt="CreditDevice Team im Gespräch nach einem Credit-Management-Beratungstermin"
      />

      <CustomerLogos />

      <ProductCards />

      <AllInOne />

      <WhyUs />

      <FAQ
        title="Häufig gestellte Fragen"
        subtitle="Finden Sie Antworten auf die wichtigsten Fragen zu unseren Lösungen"
        items={faqItems}
      />

      <CTABanner />
    </>
  );
}
