/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  experimental: {
    // Required:
    appDir: true,
    assetPrefix: isProd ? '/tb-santa-jam-2022' : '',
    images: {
      unoptimized: true,
    },
  },
  basePath: '/tb-santa-jam-2022',
};

module.exports = nextConfig;
