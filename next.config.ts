import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/omeans-team-live' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/omeans-team-live/' : '',
  images: {
    unoptimized: true
  }
}

export default nextConfig
