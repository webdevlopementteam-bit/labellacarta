/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML build in out/. Don't enable cacheComponents here:
  // it turns on PPR, which can't run in export mode.
  output: "export",
  // Match the WordPress URLs already indexed by Google (e.g. /about/)
  trailingSlash: true,
  images: {
    // The image optimizer needs a server; images are already WebP
    unoptimized: true,
  },

  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
