const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
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
