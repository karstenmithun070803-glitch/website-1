import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Sanity Studio is not RSC-safe under Turbopack — its internal chunks
   * do `import useSWR from "swr"` which fails against `swr/react-server.mjs`.
   * Marking Sanity + its runtime companions as external stops Turbopack
   * from bundling those chunks into the RSC graph.
   */
  serverExternalPackages: ["sanity", "@sanity/vision", "styled-components"],
};

export default nextConfig;
