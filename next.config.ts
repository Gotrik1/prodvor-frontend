

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compiler: { removeConsole: { exclude: ['error', 'warn'] } },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: 'placehold.co',
        },
        {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
        },
        {
            protocol: 'https',
            hostname: 'picsum.photos',
        },
        {
            protocol: 'https',
            hostname: 'ppzkctfvrxqlcrpwtuuu.supabase.co',
        },
        {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
        },
        {
            protocol: 'http',
            hostname: 'storage.googleapis.com',
        }
    ],
  },
  experimental: {
    allowedDevOrigins: ['https://prodvor.website', 'https://176.106.247.145'],
  }
};

export default nextConfig;
