import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

/**
 * Static + dynamic sitemap. Add dynamic entries (e.g. /zajecia/[slug])
 * by fetching slugs from `lib/services/classes.service.ts`.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const lastModified = new Date();

  const staticRoutes = [
    '',
    '/rezerwacje',
    '/zajecia',
    '/cennik',
    '/faq',
    '/galeria',
    '/kontakt',
    '/urodziny',
    '/szkoly',
    '/firmy',
    '/regulamin',
    '/regulamin-rezerwacji',
    '/polityka-prywatnosci',
  ];

  return staticRoutes.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.7,
  }));
}
