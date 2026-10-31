/** @type {import('next').NextConfig} */
const nextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.36"],
  // Match the WordPress URLs already indexed by Google (e.g. /about/)
  trailingSlash: true,
  images: {
    qualities: [75, 100],
  },

  async redirects() {
    return [
      {
        source: "/products/:slug",
        destination: "/product/:slug/",
        permanent: true,
      },
      {
        source: "/cake-box",
        destination: "/product/cake-box/",
        permanent: true,
      },
    ];
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
