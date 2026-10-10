'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiPost } from '@/lib/customer/api';
import { ROLE_ADMIN, type Account } from '@/lib/customer/types';
import { FormError, SubmitButton, TextField } from '@/components/customer/ui';

const NO_ADMIN = 'Dieser Zugang hat keine Administratorrechte.';

export function AdminLoginForm({ denied }: { denied: boolean }) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(denied ? NO_ADMIN : null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await apiPost<{ account: Account }>('/api/customer/auth/login', { username, password });
    if (!res.ok) {
      setError(res.error.status === 401 ? 'Anmeldung fehlgeschlagen.' : res.error.message);
      setLoading(false);
      return;
    }
    if (!res.data.account.authorities.includes(ROLE_ADMIN)) {
      await apiPost('/api/customer/auth/logout');
      setError(NO_ADMIN);
      setLoading(false);
      return;
    }
    router.replace('/admin/');
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormError message={error} />
      <TextField label="Login oder E-Mail" name="username" value={username} onChange={setUsername} required autoComplete="username" disabled={loading} />
      <TextField label="Passwort" name="password" type="password" value={password} onChange={setPassword} required autoComplete="current-password" disabled={loading} />
      <SubmitButton loading={loading}>Anmelden</SubmitButton>
    </form>
  );
}
