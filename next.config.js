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

  // ВАЖНО: только хосты, без http/https и без портов
  allowedDevOrigins: [
    'localhost',
    '127.0.0.1',
    'prodvor.website',
    '176.106.247.145',

    // Точные хосты ваших Workstations (из логов)
    '8080-firebase-prodvor-backendgit-1762801375121.cluster-3iz2yhcd4rhr2rsnuja2mv2i6k.cloudworkstations.dev/',
    '8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
    '6000-firebase-prodvor-landin-3110-1761908712682.cluster-3gc7bglotjgwuxlqpiut7yyqt4.cloudworkstations.dev',

    // Запасной вариант на будущее (если меняется портовой префикс):
    '*.cloudworkstations.dev',
  ],

  experimental: {
    // ваши флаги при необходимости
  },
};

export default nextConfig;
