/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  onDemandEntries: {
    maxInactiveAge: 500,
    pagesBufferLength: 2,
  },
  experimental: {
    isrMemoryCacheSize: 0,
  },
}

export default nextConfig
