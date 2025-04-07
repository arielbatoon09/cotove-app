import { NextConfig } from 'next'
const tenants = ['store', 'tenant1', 'tenant2'];
const allowedDevOrigins = tenants.map(t => `http://${t}.localhost:3000`);

const nextConfig: NextConfig = {
  images: {
    domains: ['localhost'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-dns-prefetch-control',
            value: 'on',
          },
        ],
      },
    ]
  },
  allowedDevOrigins
}

export default nextConfig
