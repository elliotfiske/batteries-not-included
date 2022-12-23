const isProd = process.env.NODE_ENV === "production"

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
    assetPrefix: isProd ? "/batteries-not-included" : "",
    basePath: isProd ? "/batteries-not-included" : "",
}

module.exports = nextConfig
