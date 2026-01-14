import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
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
};

export default nextConfig;
