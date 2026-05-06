import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use 'standalone' for Docker, remove for Vercel
  ...(process.env.DOCKER_BUILD === 'true' ? { output: 'standalone' as const } : {}),
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.googleapis.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
