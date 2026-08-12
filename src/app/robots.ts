import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

const DISALLOWED = ['/api/', '/auskunft/bestaetigung', '/auskunft/ergebnisse'];

// KI-Crawler explizit erlauben (Trainings-, Such- und Abruf-Bots).
// Hinweis: Eine spezifische User-Agent-Gruppe ersetzt die '*'-Gruppe
// vollständig — daher müssen die Disallow-Regeln hier wiederholt werden.
const AI_CRAWLERS = [
  // OpenAI / ChatGPT
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic / Claude
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google (Gemini-Training, keine Auswirkung auf die Suche)
  'Google-Extended',
  // Apple
  'Applebot-Extended',
  // Meta, Amazon, ByteDance, Common Crawl
  'Meta-ExternalAgent',
  'Amazonbot',
  'Bytespider',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: DISALLOWED,
      })),
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOWED,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
