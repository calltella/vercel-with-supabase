import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: false,
  },
  cacheComponents: false,
}

export default nextConfig;
