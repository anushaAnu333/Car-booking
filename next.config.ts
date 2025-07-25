import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Suppress hydration warnings in development
  reactStrictMode: true,
  // Add custom webpack config if needed
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
