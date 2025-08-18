import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  distDir: 'out',
  // Note: Headers configuration is not supported with output: 'export'
  // Cache headers are handled via .htaccess file for Apache servers
};

export default nextConfig;
