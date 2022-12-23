const isProd = process.env.NODE_ENV === "production"

/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
    assetPrefix: isProd ? "/tb-santa-jam-2022" : "",
    basePath: isProd ? "/tb-santa-jam-2022" : "",
}

module.exports = nextConfig
