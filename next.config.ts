import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: '/omeans-team.github.io',
  assetPrefix: '/omeans-team.github.io',
  distDir: 'out',
};

export default nextConfig;
