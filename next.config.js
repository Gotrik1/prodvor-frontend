/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compiler: { removeConsole: { exclude: ['error', 'warn'] } },
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'ppzkctfvrxqlcrpwtuuu.supabase.co' },
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'http',  hostname: 'storage.googleapis.com' },
    ],
  },
};

export default nextConfig;
