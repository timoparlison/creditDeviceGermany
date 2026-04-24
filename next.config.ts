import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '206.wpcdnnode.com',
        pathname: '/creditdevice.com/**',
      },
    ],
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/polismanager',
        destination: '/policymanager',
        permanent: true,
      },
      {
        source: '/polismanager/:path*',
        destination: '/policymanager/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
