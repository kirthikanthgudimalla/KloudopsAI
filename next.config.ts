import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  
  // Enable trailing slash for better static hosting
  trailingSlash: true,
  
  // Set output directory for GitHub Pages
  distDir: 'out',
  
  // Base path for GitHub Pages (remove if using custom domain)
  basePath: '',
  
  // Asset prefix for GitHub Pages
  assetPrefix: '',
};

export default nextConfig;
