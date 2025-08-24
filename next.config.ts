import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/omeans-team-live',
  assetPrefix: '/omeans-team-live/',
  images: {
    unoptimized: true
  }
}

export default nextConfig
