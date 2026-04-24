import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const routes: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/bonitaetsinformationen', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/credit-management-software', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/policymanager', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/auskunft', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/kontakt', priority: 0.7, changeFrequency: 'yearly' },
    { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
