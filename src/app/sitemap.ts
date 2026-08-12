import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const locales = ['de', 'en', 'es', 'fr', 'it', 'nl', 'sv', 'no', 'da', 'fi'] as const;
const nonDe = locales.filter((l) => l !== 'de');

// Internal path → { de: deSlug, others: enSlug }
const routes: Array<{
  de: string;
  en: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}> = [
  { de: '/',                          en: '/',                            priority: 1.0, changeFrequency: 'weekly'  },
  { de: '/bonitaetsinformationen',    en: '/credit-information',          priority: 0.9, changeFrequency: 'monthly' },
  { de: '/credit-management-software',en: '/credit-management-software',  priority: 0.9, changeFrequency: 'monthly' },
  { de: '/policymanager',             en: '/policy-manager',              priority: 0.9, changeFrequency: 'monthly' },
  { de: '/auskunft',                  en: '/credit-inquiry',              priority: 0.8, changeFrequency: 'monthly' },
  { de: '/ueber-uns',                 en: '/about',                       priority: 0.7, changeFrequency: 'yearly'  },
  { de: '/kontakt',                   en: '/contact',                     priority: 0.7, changeFrequency: 'yearly'  },
  { de: '/datenschutz',               en: '/privacy-policy',              priority: 0.3, changeFrequency: 'yearly'  },
  { de: '/impressum',                 en: '/legal-notice',                priority: 0.3, changeFrequency: 'yearly'  },
];

// next.config nutzt trailingSlash: true — Sitemap-URLs müssen die finale
// Slash-Variante nennen, sonst bekommen Crawler erst einen 308-Redirect.
const withTrailingSlash = (path: string) => (path.endsWith('/') ? path : `${path}/`);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map(({ de, en, priority, changeFrequency }) => {
    const languages: Record<string, string> = { de: `${SITE_URL}${withTrailingSlash(de)}` };
    for (const locale of nonDe) {
      languages[locale] = `${SITE_URL}/${locale}${withTrailingSlash(en)}`;
    }
    languages['x-default'] = `${SITE_URL}${withTrailingSlash(de)}`;

    return {
      url: `${SITE_URL}${withTrailingSlash(de)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    };
  });
}
