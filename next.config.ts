import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve AVIF first (smallest), then WebP, before falling back to the source.
    formats: ["image/avif", "image/webp"],
    // Photos are portrait and never shown huge — cap the generated widths so the
    // optimizer doesn't produce needless 3840px variants.
    deviceSizes: [360, 480, 640, 828, 1080, 1280],
    minimumCacheTTL: 2_678_400, // 31 days
  },
};

export default nextConfig;
