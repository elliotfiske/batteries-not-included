const isProd = process.env.NODE_ENV === 'production';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  images: {
    unoptimized: true,
  },
  assetPrefix: isProd ? '/tb-santa-jam-2022' : '',
  experimental: {
    // Required:
  },
  basePath: '/tb-santa-jam-2022',
};

module.exports = nextConfig;
