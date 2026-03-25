import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/tcodz',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
