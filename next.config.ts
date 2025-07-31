import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/omeans-team.github.io' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/omeans-team.github.io' : '',
};

export default nextConfig;
