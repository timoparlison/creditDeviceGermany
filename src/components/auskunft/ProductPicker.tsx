'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, ShoppingCart } from 'lucide-react';
import { PRODUCT_CATALOG, formatPrice, priceFor, type ProductId } from '@/lib/gcc/products';
import type { Company } from '@/lib/gcc/types';

type Props = {
  company: Company;
};

export function ProductPicker({ company }: Props) {
  const router = useRouter();
  const available = useMemo(() => PRODUCT_CATALOG.filter((p) => p.available), []);
  const [selected, setSelected] = useState<ProductId[]>(
    available.length ? [available[0].id] : [],
  );

  const totals = useMemo(() => {
    let net = 0;
    let gross = 0;
    let currency = 'EUR';
    for (const id of selected) {
      const def = PRODUCT_CATALOG.find((p) => p.id === id);
      if (!def) continue;
      const price = priceFor(company.pricing, def.apiName);
      if (price) {
        net += price.net ?? 0;
        gross += price.gross ?? 0;
        currency = price.currency ?? currency;
      }
    }
    return { net, gross, currency };
  }, [selected, company]);

  const toggle = (id: ProductId) => {
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((p) => p !== id) : [...cur, id],
    );
  };

  const onOrder = () => {
    if (!selected.length) return;
    const params = new URLSearchParams({ products: selected.join(',') });
    router.push(`/auskunft/unternehmen/${encodeURIComponent(company.id)}/bestellen?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden sticky top-24">
      <div className="bg-navy text-white px-6 py-4">
        <h3 className="text-lg font-bold">Produkte auswählen</h3>
        <p className="text-sm text-gray-300">Mehrere Produkte können kombiniert werden</p>
      </div>

      <div className="p-4 space-y-3">
        {PRODUCT_CATALOG.map((def) => {
          const price = priceFor(company.pricing, def.apiName);
          const isSelected = selected.includes(def.id);
          const disabled = !def.available;
          return (
            <button
              key={def.id}
              type="button"
              onClick={() => !disabled && toggle(def.id)}
              disabled={disabled}
              className={`w-full text-left rounded-lg border-2 p-4 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-gray-200 hover:border-gray-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                    isSelected
                      ? 'bg-primary border-primary'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold text-navy">{def.label}</span>
                    {price && (
                      <span className="text-sm font-bold text-primary whitespace-nowrap">
                        {formatPrice(price.gross, price.currency)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    {def.description}
                  </p>
                  {disabled && (
                    <p className="text-xs text-gray-400 italic mt-1">bald verfügbar</p>
                  )}
                  {price && (
                    <p className="text-xs text-gray-500 mt-1">
                      Netto {formatPrice(price.net, price.currency)} · zzgl. MwSt.
                    </p>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="border-t px-6 py-4 bg-gray-50">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Netto</span>
          <span className="text-sm text-gray-700">
            {formatPrice(totals.net, totals.currency)}
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-xs text-gray-500 uppercase tracking-wide">Brutto</span>
          <span className="text-xl font-bold text-navy">
            {formatPrice(totals.gross, totals.currency)}
          </span>
        </div>
      </div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={onOrder}
          disabled={!selected.length}
          className="w-full inline-flex items-center justify-center gap-2 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart className="w-5 h-5" />
          Bestellen
        </button>
      </div>
    </div>
  );
}
