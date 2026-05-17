import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  generateBuildId: () => {
    return `${Date.now()}`; // for chunk cache busting
  },
  images: {
    domains: ["ocevialab.com", "www.ocevialab.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "1mb",
      allowedOrigins: [
        "https://ocevialab.com",
        "https://www.ocevialab.com",
      ],
    },
  },
};

export default nextConfig;
