import { ImageResponse } from 'next/og';
import { siteConfig } from '@/config/site';

export const runtime = 'edge';
export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Default OpenGraph image generated at the edge.
 * Per-page OG images can override this by adding their own opengraph-image.tsx.
 */
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #F39200 0%, #2FA84F 55%, #1FA9A8 100%)',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 96, fontWeight: 800, letterSpacing: -2 }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 36, opacity: 0.85, marginTop: 16 }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size },
  );
}
