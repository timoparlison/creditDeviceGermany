'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const COUNTRIES = [
  { code: 'de', name: 'Deutschland' },
  { code: 'at', name: 'Österreich' },
  { code: 'ch', name: 'Schweiz' },
  { code: 'fr', name: 'Frankreich' },
  { code: 'it', name: 'Italien' },
  { code: 'nl', name: 'Niederlande' },
  { code: 'be', name: 'Belgien' },
  { code: 'gb', name: 'Vereinigtes Königreich' },
  { code: 'es', name: 'Spanien' },
  { code: 'pt', name: 'Portugal' },
  { code: 'pl', name: 'Polen' },
];

type Props = {
  initialName?: string;
  initialCountry?: string;
  variant?: 'light' | 'plain';
};

export function SearchForm({ initialName = '', initialCountry = 'de', variant = 'plain' }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [countryCode, setCountryCode] = useState(initialCountry);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Bitte mindestens 2 Zeichen eingeben.');
      return;
    }
    setError(null);
    const params = new URLSearchParams({ name: name.trim(), countryCode });
    startTransition(() => {
      router.push(`/auskunft/ergebnisse?${params.toString()}`);
    });
  };

  const inputBase =
    variant === 'light'
      ? 'bg-white text-navy placeholder-gray-400 border-gray-200'
      : 'bg-white text-navy placeholder-gray-400 border-gray-300';

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Firmenname"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError(null);
            }}
            className={`w-full pl-10 pr-4 py-3 rounded-md border ${inputBase} focus:outline-none focus:ring-2 focus:ring-primary`}
            autoFocus
          />
        </div>
        <select
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-primary md:min-w-[180px]"
        >
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          <Search className="w-5 h-5" />
          {isPending ? 'Suche...' : 'Suchen'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  );
}
