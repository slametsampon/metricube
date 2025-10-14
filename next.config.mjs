const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ['http://192.168.1.10:3000'],
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isProd ? '/metricube' : '',
  env: {
    BASE_PATH: isProd ? '/metricube' : '',
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

// ❌ JANGAN gunakan: module.exports = nextConfig
// ✅ GUNAKAN:
export default nextConfig;
