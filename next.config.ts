import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "standalone",
  generateBuildId: () => {
    return `${Date.now()}`; // for chunk cache busting
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "ocevialab.com", pathname: "/**" },
      { protocol: "https", hostname: "www.ocevialab.com", pathname: "/**" },
    ],
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
