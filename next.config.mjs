/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  allowedDevOrigins: ["192.168.1.36"],
  // Static HTML build in out/
  output: "export",
  // Each page becomes folder/index.html, so /about/ works on any static host
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
