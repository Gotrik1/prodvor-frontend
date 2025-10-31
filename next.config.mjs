/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
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
        }
    ],
  },
  env: {
    NEXT_PUBLIC_YANDEX_API_KEY: process.env.YANDEX_API_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/:path*`,
      },
    ];
  },
};

export default nextConfig;
