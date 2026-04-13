import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';

export const metadata = { title: 'Bestellung bestätigt' };

export default function ConfirmationPage() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 min-h-[60vh]">
      <Container>
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow border border-gray-100 p-8 md:p-12 text-center">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
            Vielen Dank für Ihre Bestellung!
          </h1>
          <p className="text-gray-600 mb-8">
            Wir haben Ihre Bestellung erhalten. Unsere Credit-Analysten recherchieren nun
            die angeforderten Informationen und stellen Ihnen die Auskunft zeitnah bereit.
            Eine Bestätigung wurde an Ihre E-Mail-Adresse gesendet.
          </p>
          <Link
            href="/auskunft"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
          >
            Weitere Auskunft bestellen
          </Link>
        </div>
      </Container>
    </section>
  );
}
