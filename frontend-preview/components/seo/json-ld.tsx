import { siteConfig } from '@/config/site';

/** Inject JSON-LD structured data (LocalBusiness, Event, FAQPage, …). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsActivityLocation',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.contact.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address.street,
      postalCode: siteConfig.contact.address.postalCode,
      addressLocality: siteConfig.contact.address.city,
      addressCountry: siteConfig.contact.address.country,
    },
  };
}
