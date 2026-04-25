import type { Metadata } from 'next';
import { siteConfig } from './site';

/**
 * Default SEO metadata factory. Use in `generateMetadata` of any page
 * to inherit sensible defaults and override only what's needed.
 */
export function buildMetadata(overrides: Partial<Metadata> = {}): Metadata {
  return {
    title: overrides.title ?? siteConfig.name,
    description: overrides.description ?? siteConfig.description,
    openGraph: {
      type: 'website',
      locale: 'pl_PL',
      url: siteConfig.url,
      siteName: siteConfig.name,
      ...overrides.openGraph,
    },
    ...overrides,
  };
}
