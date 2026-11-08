import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: fast, cheap to host anywhere (Vercel, Netlify, Cloudflare Pages).
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
