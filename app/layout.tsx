import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import { siteConfig } from '@/config/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icons/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#F39200',
  width: 'device-width',
  initialScale: 1,
};

/**
 * Root HTML layout — wraps every page (marketing, account, admin, auth).
 * Keep this minimal: fonts, providers, and the html/body skeleton only.
 * Section-level chrome (navbar, footer, sidebars) lives in route-group layouts.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <body className="min-h-screen bg-brand text-white antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
