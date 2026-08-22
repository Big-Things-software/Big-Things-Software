import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin Turbopack to this project: multiple lockfiles above it otherwise make
  // it infer the wrong workspace root and fail to resolve tailwindcss.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
