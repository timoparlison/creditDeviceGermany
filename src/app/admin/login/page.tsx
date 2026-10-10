import type { Metadata } from 'next';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

export const runtime = 'edge';

export const metadata: Metadata = { title: 'Admin – Anmelden', robots: { index: false, follow: false } };

export default async function AdminLoginPage({ searchParams }: { searchParams: Promise<{ denied?: string }> }) {
  const { denied } = await searchParams;
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-xl font-bold text-navy mb-1">CreditDevice Admin</h1>
        <p className="text-sm text-gray-600 mb-6">Anmeldung nur für Administratoren.</p>
        <AdminLoginForm denied={denied === '1'} />
      </div>
    </div>
  );
}
