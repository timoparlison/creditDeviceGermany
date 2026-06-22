import { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { SearchForm } from '@/components/auskunft/SearchForm';
import { Globe, ShieldCheck, Zap } from 'lucide-react';
import { JsonLd, breadcrumbSchema } from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'Unternehmensauskunft bestellen — globale Wirtschaftsauskünfte',
  description:
    'Onlineauskünfte zu Unternehmen und Wirtschaftsauskünfte aus über 200 Ländern. Schnell, zuverlässig und mit einem Klick online bestellbar.',
  alternates: { canonical: '/auskunft' },
};

export default function AuskunftPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Startseite', path: '/' },
          { name: 'Unternehmensauskunft', path: '/auskunft' },
        ])}
      />
      <section className="relative bg-navy text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-white/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-3xl" />

        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-primary font-semibold mb-3 tracking-wide uppercase text-sm">
              schnell &amp; zuverlässig
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] mb-5">
              Onlineauskünfte — globale <br />
              <span className="text-primary">Bonitätsauskünfte</span> leicht gemacht
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Mit einem Mausklick bestellbar. Im Anschluss an Ihre Bestellung recherchieren
              unsere erfahrenen Credit-Analysten die gewünschten Informationen und stellen
              Ihnen die Auskunft zeitnah zur Verfügung.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-5 md:p-6 max-w-4xl">
            <SearchForm variant="light" />
          </div>
        </Container>
      </section>

      <Section background="white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">Weltweit</h3>
              <p className="text-gray-600 text-sm">
                Unternehmensdaten aus über 200 Ländern – EU, UK, USA und weltweit.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">Schnelle Lieferung</h3>
              <p className="text-gray-600 text-sm">
                Recherche und Bereitstellung durch erfahrene Credit-Analysten.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-navy mb-1">Sichere Zahlung</h3>
              <p className="text-gray-600 text-sm">
                Kartenzahlung und SEPA, abgewickelt über Stripe.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
