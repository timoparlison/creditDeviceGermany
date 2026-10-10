'use client';

import NextLink from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { apiPost } from '@/lib/customer/api';

const NAV = [
  { href: '/admin/', label: 'Kundenkonten' },
  { href: '/admin/abrechnung/', label: 'Abrechnung' },
];

export function AdminShell({ login, children }: { login: string; children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await apiPost('/api/customer/auth/logout');
    router.replace('/admin/login/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="font-bold">CreditDevice Admin</span>
            <nav className="flex gap-1">
              {NAV.map((n) => {
                const active = n.href === '/admin/' ? pathname === '/admin/' || pathname === '/admin' : pathname.startsWith(n.href.replace(/\/$/, ''));
                return (
                  <NextLink
                    key={n.href}
                    href={n.href}
                    className={`px-3 py-1.5 rounded text-sm ${active ? 'bg-white/15' : 'hover:bg-white/10'}`}
                  >
                    {n.label}
                  </NextLink>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-white/70">{login}</span>
            <button type="button" onClick={logout} className="hover:underline">
              Abmelden
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
