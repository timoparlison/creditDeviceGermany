import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

type Messages = Record<string, unknown>;

/** Deep merge: keys missing in `override` fall back to `base`. */
function withFallback(base: Messages, override: Messages): Messages {
  const out: Messages = { ...base };
  for (const [k, v] of Object.entries(override)) {
    const b = out[k];
    out[k] =
      v && typeof v === 'object' && b && typeof b === 'object'
        ? withFallback(b as Messages, v as Messages)
        : v;
  }
  return out;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  const messages = (await import(`../messages/${locale}.json`)).default;
  // Customer-portal texts live in their own files (src/messages/account/*.json).
  // Missing locales/keys fall back to English (de has its own complete file).
  const accountEn = (await import('../messages/account/en.json')).default;
  const accountLocale = await import(`../messages/account/${locale}.json`)
    .then((m) => m.default as Messages)
    .catch(() => ({}));
  return {
    locale,
    messages: { ...messages, Account: withFallback(accountEn, accountLocale) },
  };
});
