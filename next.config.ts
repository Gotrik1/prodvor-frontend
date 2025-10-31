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
        }
    ],
  },
  env: {
    NEXT_PUBLIC_YANDEX_API_KEY: process.env.YANDEX_API_KEY,
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  }
};

export default nextConfig;
