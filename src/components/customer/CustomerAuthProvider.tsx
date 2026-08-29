'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { Account } from '@/lib/customer/types';

type AuthStatus = 'loading' | 'authenticated' | 'anonymous';

type CustomerAuthValue = {
  account: Account | null;
  status: AuthStatus;
  /** Re-fetch the session from the BFF (call after login/register). */
  refresh: () => Promise<void>;
  /** Clear the session cookie and local state. */
  logout: () => Promise<void>;
};

const CustomerAuthContext = createContext<CustomerAuthValue | null>(null);

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/customer/auth/account', {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const data = (await res.json()) as { account: Account };
        setAccount(data.account);
        setStatus('authenticated');
      } else {
        setAccount(null);
        setStatus('anonymous');
      }
    } catch {
      setAccount(null);
      setStatus('anonymous');
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch('/api/customer/auth/logout', { method: 'POST' });
    } finally {
      setAccount(null);
      setStatus('anonymous');
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo<CustomerAuthValue>(
    () => ({ account, status, refresh, logout }),
    [account, status, refresh, logout],
  );

  return (
    <CustomerAuthContext.Provider value={value}>
      {children}
    </CustomerAuthContext.Provider>
  );
}

export function useCustomerAuth(): CustomerAuthValue {
  const ctx = useContext(CustomerAuthContext);
  if (!ctx) {
    throw new Error('useCustomerAuth must be used within <CustomerAuthProvider>');
  }
  return ctx;
}
