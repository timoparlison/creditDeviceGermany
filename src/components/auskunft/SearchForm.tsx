'use client';

import { useState, useTransition, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const COUNTRY_CODES = [
  'de','af','eg','al','dz','as','ao','ag','ar','am','aw','az','et','au','bs','bh','bd','bb',
  'be','bz','bj','bm','bo','bq','ba','bw','br','vg','bg','bf','bi','ky','cl','cn','cw','dk',
  'dm','do','dj','ec','ci','sv','gq','er','sz','ee','fj','fi','fr','gf','ga','gm','ge','gh',
  'gd','gr','gl','gb','gp','gu','gt','gg','gn','gw','gy','ht','hn','hk','in','id','iq','ir',
  'ie','is','it','jm','jp','ye','jo','kh','cm','ca','cv','kz','qa','ke','kg','co','cg','kr',
  'xk','hr','kw','la','lv','lb','lr','ly','lt','lu','mg','mw','my','ml','mt','ma','mh','mq',
  'mr','mu','yt','mk','mx','fm','md','me','ms','mz','mm','na','np','nc','nz','ni','ne','ng',
  'nl','mp','no','om','at','pk','pw','ps','pa','pg','py','pe','pl','pt','pr','cd','rw','ro',
  'ru','zm','st','sa','se','ch','sn','rs','sc','sl','sg','sx','sk','si','so','es','lk','sh',
  'kn','lc','pm','vc','sd','za','ss','sr','sj','sy','tj','tw','tz','th','tg','tt','td','cz',
  'tn','tr','tm','tc','ug','ua','hu','uy','us','vi','uz','ve','ae','vn','by','eh','cf','zw','cy',
];

type Props = {
  initialName?: string;
  initialCountry?: string;
  variant?: 'light' | 'plain';
};

export function SearchForm({ initialName = '', initialCountry = 'de', variant = 'plain' }: Props) {
  const t = useTranslations('SearchForm');
  const locale = useLocale();
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [countryCode, setCountryCode] = useState(initialCountry);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const countries = useMemo(() => {
    const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
    return COUNTRY_CODES
      .map((code) => ({ code, name: displayNames.of(code.toUpperCase()) ?? code }))
      .sort((a, b) => a.name.localeCompare(b.name, locale));
  }, [locale]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError(t('minCharsError'));
      return;
    }
    setError(null);
    const params = new URLSearchParams({ name: name.trim(), countryCode });
    const prefix = locale === 'de' ? '' : `/${locale}`;
    startTransition(() => {
      router.push(`${prefix}/auskunft/ergebnisse?${params.toString()}`);
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
            placeholder={t('placeholder')}
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
          aria-label={t('countryLabel')}
          className="px-4 py-3 rounded-md border border-gray-300 bg-white text-navy focus:outline-none focus:ring-2 focus:ring-primary md:min-w-[180px]"
        >
          {countries.map((c) => (
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
          {isPending ? t('searching') : t('search')}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </form>
  );
}
