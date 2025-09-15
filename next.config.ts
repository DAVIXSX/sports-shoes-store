import type { NextConfig } from "next";
import path from "path";

const isCI = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: "export",
  images: { unoptimized: true },
  // Use basePath and assetPrefix when building on CI for GitHub Pages
  basePath: isCI ? "/sports-shoes-store" : undefined,
  assetPrefix: isCI ? "/sports-shoes-store/" : undefined,
  // Silence Turbopack root warning
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
