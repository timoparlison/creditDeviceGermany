'use client';

import { useCallback, useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Loader2, Wallet } from 'lucide-react';
import { apiGet } from '@/lib/customer/api';
import { formatDateTime, formatMoney } from '@/lib/customer/format';
import type { CreditBalance, CreditTransaction, Page } from '@/lib/customer/types';
import { DepositForm } from './DepositForm';

const PAGE_SIZE = 10;

export function BalancePanel() {
  const t = useTranslations('Account');
  const locale = useLocale();

  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [txPage, setTxPage] = useState<Page<CreditTransaction> | null>(null);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDeposit, setShowDeposit] = useState(false);

  const loadBalance = useCallback(async () => {
    const res = await apiGet<CreditBalance>('/api/customer/credit/balance');
    if (res.ok) setBalance(res.data);
  }, []);

  const loadTransactions = useCallback(async (p: number) => {
    setLoading(true);
    setError(null);
    const res = await apiGet<Page<CreditTransaction>>(
      `/api/customer/credit/transactions?page=${p}&size=${PAGE_SIZE}&sort=createdAt,desc`,
    );
    if (res.ok) {
      setTxPage(res.data);
    } else {
      setError(res.error.message);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    void loadBalance();
  }, [loadBalance]);

  useEffect(() => {
    void loadTransactions(page);
  }, [page, loadTransactions]);

  const onCredited = () => {
    // Stripe confirmed; the backend webhook books the amount asynchronously.
    // Give it a moment, then refresh.
    setTimeout(() => {
      void loadBalance();
      void loadTransactions(0);
      setPage(0);
    }, 1500);
  };

  const currency = balance?.currency ?? 'EUR';
  const totalPages = txPage?.totalPages ?? 0;

  return (
    <div className="space-y-6">
      {/* Balance card */}
      <div className="rounded-xl bg-navy text-white p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-300">{t('balance.currentBalance')}</p>
          <p className="text-3xl font-bold mt-1">
            {balance ? formatMoney(balance.balance, currency, locale) : '—'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowDeposit((v) => !v)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors"
        >
          <Wallet className="w-4 h-4" />
          {t('balance.topUp')}
        </button>
      </div>

      {/* Deposit form */}
      {showDeposit && (
        <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-navy mb-4">{t('balance.topUp')}</h2>
          <DepositForm onCredited={onCredited} />
        </div>
      )}

      {/* Transactions */}
      <div className="rounded-xl bg-white border border-gray-100 shadow-sm p-6">
        <h2 className="font-bold text-navy mb-4">{t('balance.transactionsTitle')}</h2>

        {loading && !txPage ? (
          <div className="flex items-center gap-2 text-gray-500 text-sm py-6">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t('common.loading')}
          </div>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : !txPage || txPage.content.length === 0 ? (
          <p className="text-sm text-gray-500">{t('balance.noTransactions')}</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-100">
                    <th className="py-2 pr-4 font-medium">{t('balance.colDate')}</th>
                    <th className="py-2 pr-4 font-medium">{t('balance.colType')}</th>
                    <th className="py-2 pr-4 font-medium">{t('balance.colReference')}</th>
                    <th className="py-2 font-medium text-right">{t('balance.colAmount')}</th>
                  </tr>
                </thead>
                <tbody>
                  {txPage.content.map((tx) => (
                    <tr key={tx.id} className="border-b border-gray-50">
                      <td className="py-2 pr-4 text-gray-600 whitespace-nowrap">
                        {formatDateTime(tx.createdAt, locale)}
                      </td>
                      <td className="py-2 pr-4 text-navy">
                        {t(`txType.${tx.transactionType}`)}
                      </td>
                      <td className="py-2 pr-4 text-gray-400 font-mono text-xs truncate max-w-[12rem]">
                        {tx.referenceId ?? '—'}
                      </td>
                      <td className="py-2 text-right font-semibold text-navy whitespace-nowrap">
                        {formatMoney(tx.amount, currency, locale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 text-sm">
                <button
                  type="button"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-3 py-1.5 rounded-md border border-gray-200 disabled:opacity-40"
                >
                  {t('balance.prev')}
                </button>
                <span className="text-gray-500">
                  {t('balance.page', { page: page + 1, total: totalPages })}
                </span>
                <button
                  type="button"
                  onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
                  disabled={page + 1 >= totalPages}
                  className="px-3 py-1.5 rounded-md border border-gray-200 disabled:opacity-40"
                >
                  {t('balance.next')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
