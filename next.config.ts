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
        }
    ],
  },
  env: {
    NEXT_PUBLIC_YANDEX_API_KEY: process.env.YANDEX_API_KEY,
  }
};

export default nextConfig;
