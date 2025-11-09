/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'standalone',
  productionBrowserSourceMaps: false,
  compiler: { removeConsole: { exclude: ['error', 'warn'] } },
  reactStrictMode: true,
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
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    'prodvor.website',
    '176.106.247.145',
    // точные хосты облачных воркстейшенов:
    '9000-firebase-prodvor-landin-3110-1761908712682.cluster-3gc7bglotjgwuxlqpiut7yyqt4.cloudworkstations.dev',
    '8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
    // или одним шаблоном (если подходит к вашим доменам):
    '*.cloudworkstations.dev',
  ],
  experimental: {
    // any existing experimental flags
  }
};

export default nextConfig;
