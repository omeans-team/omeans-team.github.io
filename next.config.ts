import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/omeans-team-live',
  assetPrefix: '/omeans-team-live/',
  images: {
    unoptimized: true
  },
  // Disable static export temporarily to fix build issues
  experimental: {
    esmExternals: false
  }
}

export default nextConfig
