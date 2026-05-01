// next.config.ts
import type { NextConfig } from "next";
import type { ImageLoaderProps } from "next/image";

const customImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const nextConfig: NextConfig = {
  images: {
    domains: [
      'raw.githubusercontent.com',
      'github.com',
      'avatars.githubusercontent.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
    loader: 'default',
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['localhost:3000']
    }
  },
  async redirects() {
    return [];
  },
  env: {},
  webpack: (config, { isServer, dev }) => {
    config.ignoreWarnings = [
      ...(config.ignoreWarnings || []),
      { module: /node_modules\/punycode/ },
      { module: /react-icon-cloud/ }
    ];
    config.module.rules.push({
      test: /react-icon-cloud/,
      use: {
        loader: 'babel-loader',
        options: { sourceMaps: false }
      }
    });
    if (isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          ...config.resolve?.fallback,
          punycode: false,
        },
      };
    }
    if (!dev) {
      config.devtool = false;
    }
    return config;
  },
  productionBrowserSourceMaps: false,
};

export default nextConfig;