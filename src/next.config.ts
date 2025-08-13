import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
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
            hostname: 'prodvor.website',
        },
        {
            protocol: 'https',
            hostname: 'i.pravatar.cc',
        }
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Это предотвращает ошибку "Module not found: Can't resolve 'async_hooks'"
      // для клиентской сборки.
      config.resolve.fallback = {
        ...config.resolve.fallback,
        async_hooks: false,
      };
    }

    return config;
  },
};

export default nextConfig;
