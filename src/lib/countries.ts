/**
 * ISO-3166-1 alpha-2 Ländercodes (klein), gleiche Liste wie im
 * Auskunfts-Suchformular. Für Anzeige `Intl.DisplayNames` nutzen.
 */
export const COUNTRY_CODES = [
  'de', 'af', 'eg', 'al', 'dz', 'as', 'ao', 'ag', 'ar', 'am', 'aw', 'az', 'et', 'au', 'bs',
  'bh', 'bd', 'bb', 'be', 'bz', 'bj', 'bm', 'bo', 'bq', 'ba', 'bw', 'br', 'vg', 'bg', 'bf',
  'bi', 'ky', 'cl', 'cn', 'cw', 'dk', 'dm', 'do', 'dj', 'ec', 'ci', 'sv', 'gq', 'er', 'sz',
  'ee', 'fj', 'fi', 'fr', 'gf', 'ga', 'gm', 'ge', 'gh', 'gd', 'gr', 'gl', 'gb', 'gp', 'gu',
  'gt', 'gg', 'gn', 'gw', 'gy', 'ht', 'hn', 'hk', 'in', 'id', 'iq', 'ir', 'ie', 'is', 'it',
  'jm', 'jp', 'ye', 'jo', 'kh', 'cm', 'ca', 'cv', 'kz', 'qa', 'ke', 'kg', 'co', 'cg', 'kr',
  'xk', 'hr', 'kw', 'la', 'lv', 'lb', 'lr', 'ly', 'lt', 'lu', 'mg', 'mw', 'my', 'ml', 'mt',
  'ma', 'mh', 'mq', 'mr', 'mu', 'yt', 'mk', 'mx', 'fm', 'md', 'me', 'ms', 'mz', 'mm', 'na',
  'np', 'nc', 'nz', 'ni', 'ne', 'ng', 'nl', 'mp', 'no', 'om', 'at', 'pk', 'pw', 'ps', 'pa',
  'pg', 'py', 'pe', 'pl', 'pt', 'pr', 'cd', 'rw', 'ro', 'ru', 'zm', 'st', 'sa', 'se', 'ch',
  'sn', 'rs', 'sc', 'sl', 'sg', 'sx', 'sk', 'si', 'so', 'es', 'lk', 'sh', 'kn', 'lc', 'pm',
  'vc', 'sd', 'za', 'ss', 'sr', 'sj', 'sy', 'tj', 'tw', 'tz', 'th', 'tg', 'tt', 'td', 'cz',
  'tn', 'tr', 'tm', 'tc', 'ug', 'ua', 'hu', 'uy', 'us', 'vi', 'uz', 've', 'ae', 'vn', 'by',
  'eh', 'cf', 'zw', 'cy',
];

export type CountryOption = { code: string; name: string };

/** Nach lokalisiertem Namen sortierte Optionen (Code jeweils UPPERCASE-fähig). */
export function countryOptions(locale: string): CountryOption[] {
  const displayNames = new Intl.DisplayNames([locale], { type: 'region' });
  return COUNTRY_CODES.map((code) => ({
    code,
    name: displayNames.of(code.toUpperCase()) ?? code,
  })).sort((a, b) => a.name.localeCompare(b.name, locale));
}
