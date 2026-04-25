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
  // Allow importing 3D model files (.glb / .gltf) directly via webpack asset modules.
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf|hdr|ktx2)$/,
      type: 'asset/resource',
    });
    return config;
  },
  experimental: {
    // Required for Three.js / R3F to be properly bundled in server components.
    serverComponentsExternalPackages: ['three'],
  },
};

export default nextConfig;
