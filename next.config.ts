import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages deployment.
  // Remove `output: 'export'` if deploying to Vercel with SSR/ISR features,
  // or if you need API routes, middleware, or server-side rendering.
  output: "export",

  // Disable image optimization for static export (no server to optimize at runtime).
  // Remove this when switching to Vercel SSR — Next.js Image will work natively.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
