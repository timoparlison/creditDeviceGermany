import { BillingRunForm } from '@/components/admin/BillingRunForm';

export const runtime = 'edge';

export default function AdminBillingPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-navy">Abrechnung</h1>
      <p className="text-sm text-gray-600">
        Der Abrechnungslauf startet automatisch am 1. jedes Monats um 02:00 Uhr für den Vormonat. Hier lässt er sich
        manuell für eine Periode auslösen, z. B. nach einem Fehler. Der Lauf ist idempotent: Je Konto und Periode
        entsteht höchstens eine Sammelrechnung.
      </p>
      <BillingRunForm />
    </div>
  );
}
