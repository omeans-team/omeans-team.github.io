import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Disable static export temporarily to fix build issues
  experimental: {
    esmExternals: false
  }
}

export default nextConfig
