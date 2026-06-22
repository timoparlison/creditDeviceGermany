'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

const COUNTRIES = [
  { code: 'de', name: 'Deutschland' },
  { code: 'af', name: 'Afghanistan' },
  { code: 'eg', name: 'Ägypten' },
  { code: 'al', name: 'Albanien' },
  { code: 'dz', name: 'Algerien' },
  { code: 'as', name: 'Amerik. Samoa' },
  { code: 'ao', name: 'Angola' },
  { code: 'ag', name: 'Antigua und Barbuda' },
  { code: 'ar', name: 'Argentinien' },
  { code: 'am', name: 'Armenien' },
  { code: 'aw', name: 'Aruba' },
  { code: 'az', name: 'Aserbaidschan' },
  { code: 'et', name: 'Äthiopien' },
  { code: 'au', name: 'Australien' },
  { code: 'bs', name: 'Bahamas' },
  { code: 'bh', name: 'Bahrain' },
  { code: 'bd', name: 'Bangladesh' },
  { code: 'bb', name: 'Barbados' },
  { code: 'be', name: 'Belgien' },
  { code: 'bz', name: 'Belize' },
  { code: 'bj', name: 'Benin' },
  { code: 'bm', name: 'Bermuda' },
  { code: 'bo', name: 'Bolivien' },
  { code: 'bq', name: 'Bonaire, Sint Eustatius und Saba' },
  { code: 'ba', name: 'Bosnien und Herzegowina' },
  { code: 'bw', name: 'Botswana' },
  { code: 'br', name: 'Brasilien' },
  { code: 'vg', name: 'Brit. Jungfraueninseln' },
  { code: 'bg', name: 'Bulgarien' },
  { code: 'bf', name: 'Burkina Faso' },
  { code: 'bi', name: 'Burundi' },
  { code: 'ky', name: 'Cayman Islands' },
  { code: 'cl', name: 'Chile' },
  { code: 'cn', name: 'China' },
  { code: 'cw', name: 'Curaçao' },
  { code: 'dk', name: 'Dänemark' },
  { code: 'dm', name: 'Dominica' },
  { code: 'do', name: 'Dominikanische Republik' },
  { code: 'dj', name: 'Dschibuti' },
  { code: 'ec', name: 'Ecuador' },
  { code: 'ci', name: 'Elfenbeinküste' },
  { code: 'sv', name: 'El Salvador' },
  { code: 'gq', name: 'Äquatorialguinea' },
  { code: 'er', name: 'Eritrea' },
  { code: 'sz', name: 'Eswatini' },
  { code: 'ee', name: 'Estland' },
  { code: 'fj', name: 'Fiji' },
  { code: 'fi', name: 'Finnland' },
  { code: 'fr', name: 'Frankreich' },
  { code: 'gf', name: 'Französisch-Guayana' },
  { code: 'ga', name: 'Gabun' },
  { code: 'gm', name: 'Gambia' },
  { code: 'ge', name: 'Georgien' },
  { code: 'gh', name: 'Ghana' },
  { code: 'gd', name: 'Grenada' },
  { code: 'gr', name: 'Griechenland' },
  { code: 'gl', name: 'Grönland' },
  { code: 'gb', name: 'Großbritannien' },
  { code: 'gp', name: 'Guadeloupe' },
  { code: 'gu', name: 'Guam' },
  { code: 'gt', name: 'Guatemala' },
  { code: 'gg', name: 'Guernsey' },
  { code: 'gn', name: 'Guinea' },
  { code: 'gw', name: 'Guinea-Bissau' },
  { code: 'gy', name: 'Guyana' },
  { code: 'ht', name: 'Haiti' },
  { code: 'hn', name: 'Honduras' },
  { code: 'hk', name: 'Hong Kong' },
  { code: 'in', name: 'Indien' },
  { code: 'id', name: 'Indonesien' },
  { code: 'iq', name: 'Irak' },
  { code: 'ir', name: 'Iran' },
  { code: 'ie', name: 'Irland' },
  { code: 'is', name: 'Island' },
  { code: 'it', name: 'Italien' },
  { code: 'jm', name: 'Jamaica' },
  { code: 'jp', name: 'Japan' },
  { code: 'ye', name: 'Jemen' },
  { code: 'jo', name: 'Jordanien' },
  { code: 'kh', name: 'Kambodscha' },
  { code: 'cm', name: 'Kamerun' },
  { code: 'ca', name: 'Kanada' },
  { code: 'cv', name: 'Kap Verde' },
  { code: 'kz', name: 'Kasachstan' },
  { code: 'qa', name: 'Katar' },
  { code: 'ke', name: 'Kenia' },
  { code: 'kg', name: 'Kirgisistan' },
  { code: 'co', name: 'Kolumbien' },
  { code: 'cg', name: 'Kongo' },
  { code: 'kr', name: 'Korea' },
  { code: 'xk', name: 'Kosovo' },
  { code: 'hr', name: 'Kroatien' },
  { code: 'kw', name: 'Kuwait' },
  { code: 'la', name: 'Laos' },
  { code: 'lv', name: 'Lettland' },
  { code: 'lb', name: 'Libanon' },
  { code: 'lr', name: 'Liberia' },
  { code: 'ly', name: 'Libyen' },
  { code: 'lt', name: 'Litauen' },
  { code: 'lu', name: 'Luxemburg' },
  { code: 'mg', name: 'Madagaskar' },
  { code: 'mw', name: 'Malawi' },
  { code: 'my', name: 'Malaysia' },
  { code: 'ml', name: 'Mali' },
  { code: 'mt', name: 'Malta' },
  { code: 'ma', name: 'Marokko' },
  { code: 'mh', name: 'Marshallinseln' },
  { code: 'mq', name: 'Martinique' },
  { code: 'mr', name: 'Mauretanien' },
  { code: 'mu', name: 'Mauritius' },
  { code: 'yt', name: 'Mayotte' },
  { code: 'mk', name: 'Mazedonien' },
  { code: 'mx', name: 'Mexiko' },
  { code: 'fm', name: 'Mikronesien' },
  { code: 'md', name: 'Moldawien' },
  { code: 'me', name: 'Montenegro' },
  { code: 'ms', name: 'Montserrat' },
  { code: 'mz', name: 'Mosambik' },
  { code: 'mm', name: 'Myanmar' },
  { code: 'na', name: 'Namibia' },
  { code: 'np', name: 'Nepal' },
  { code: 'nc', name: 'Neukaledonien' },
  { code: 'nz', name: 'Neuseeland' },
  { code: 'ni', name: 'Nicaragua' },
  { code: 'ne', name: 'Niger' },
  { code: 'ng', name: 'Nigeria' },
  { code: 'nl', name: 'Niederlande' },
  { code: 'mp', name: 'Nördliche Marianen' },
  { code: 'no', name: 'Norwegen' },
  { code: 'om', name: 'Oman' },
  { code: 'at', name: 'Österreich' },
  { code: 'pk', name: 'Pakistan' },
  { code: 'pw', name: 'Palau' },
  { code: 'ps', name: 'Palästinensisches Autonomiegebiet' },
  { code: 'pa', name: 'Panama' },
  { code: 'pg', name: 'Papua-Neuguinea' },
  { code: 'py', name: 'Paraguay' },
  { code: 'pe', name: 'Peru' },
  { code: 'pl', name: 'Polen' },
  { code: 'pt', name: 'Portugal' },
  { code: 'pr', name: 'Puerto Rico' },
  { code: 'cd', name: 'Republik Kongo' },
  { code: 'rw', name: 'Ruanda' },
  { code: 'ro', name: 'Rumänien' },
  { code: 'ru', name: 'Russland' },
  { code: 'zm', name: 'Sambia' },
  { code: 'st', name: 'Sao Tome und Principe' },
  { code: 'sa', name: 'Saudi-Arabien' },
  { code: 'se', name: 'Schweden' },
  { code: 'ch', name: 'Schweiz' },
  { code: 'sn', name: 'Senegal' },
  { code: 'rs', name: 'Serbien' },
  { code: 'cs', name: 'Serbien und Montenegro' },
  { code: 'sc', name: 'Seychellen' },
  { code: 'sl', name: 'Sierra Leone' },
  { code: 'sg', name: 'Singapur' },
  { code: 'sx', name: 'Sint Maarten' },
  { code: 'sk', name: 'Slowakei' },
  { code: 'si', name: 'Slowenien' },
  { code: 'so', name: 'Somalia' },
  { code: 'es', name: 'Spanien' },
  { code: 'lk', name: 'Sri Lanka' },
  { code: 'bl', name: 'St. Barthélemy' },
  { code: 'sh', name: 'St. Helena' },
  { code: 'kn', name: 'St. Kitts und Nevis' },
  { code: 'lc', name: 'St. Lucia' },
  { code: 'mf', name: 'St. Martin' },
  { code: 'pm', name: 'St. Pierre und Miquelon' },
  { code: 'vc', name: 'St. Vincent und die Grenadinen' },
  { code: 'sd', name: 'Sudan' },
  { code: 'za', name: 'Südafrika' },
  { code: 'ss', name: 'Südsudan' },
  { code: 'sr', name: 'Surinam' },
  { code: 'sj', name: 'Svalbard und Jan Mayen' },
  { code: 'sy', name: 'Syrien' },
  { code: 'tj', name: 'Tadschikistan' },
  { code: 'tw', name: 'Taiwan' },
  { code: 'tz', name: 'Tansania' },
  { code: 'th', name: 'Thailand' },
  { code: 'tg', name: 'Togo' },
  { code: 'tt', name: 'Trinidad und Tobago' },
  { code: 'td', name: 'Tschad' },
  { code: 'cz', name: 'Tschechien' },
  { code: 'tn', name: 'Tunesien' },
  { code: 'tr', name: 'Türkei' },
  { code: 'tm', name: 'Turkmenistan' },
  { code: 'tc', name: 'Turks- und Caicosinseln' },
  { code: 'ug', name: 'Uganda' },
  { code: 'ua', name: 'Ukraine' },
  { code: 'hu', name: 'Ungarn' },
  { code: 'uy', name: 'Uruguay' },
  { code: 'us', name: 'USA' },
  { code: 'vi', name: 'US-Jungfraueninseln' },
  { code: 'uz', name: 'Usbekistan' },
  { code: 've', name: 'Venezuela' },
  { code: 'ae', name: 'Vereinigte Arabische Emirate' },
  { code: 'vn', name: 'Vietnam' },
  { code: 'by', name: 'Weißrussland' },
  { code: 'eh', name: 'Westsahara' },
  { code: 'cf', name: 'Zentralafrikanische Republik' },
  { code: 'zw', name: 'Zimbabwe' },
  { code: 'cy', name: 'Zypern' },
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
