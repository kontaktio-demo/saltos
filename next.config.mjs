/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Supabase Storage public bucket (gallery images, etc.)
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  // Three.js / R3F should be treated as external on the server
  // (moved out of experimental in Next 16).
  serverExternalPackages: ['three'],
  // Turbopack (default in Next 16) — register .glb/.gltf/.hdr/.ktx2 as asset
  // modules so they can be imported from `public/` in client components.
  turbopack: {
    rules: {
      '*.glb': { loaders: ['file-loader'], as: '*.js' },
      '*.gltf': { loaders: ['file-loader'], as: '*.js' },
      '*.hdr': { loaders: ['file-loader'], as: '*.js' },
      '*.ktx2': { loaders: ['file-loader'], as: '*.js' },
    },
  },
};

export default nextConfig;
