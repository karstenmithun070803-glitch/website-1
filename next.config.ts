import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sanity", "@sanity/vision", "styled-components"],
  images: {
    remotePatterns: [{ hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
