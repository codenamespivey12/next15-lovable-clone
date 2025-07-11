/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  // Disable static exports for now
  output: 'standalone',
  // Add this to disable static generation for the home page
  experimental: {
    // This disables static generation for specific pages
    workerThreads: false,
    cpus: 1
  },
  // Add this to transpile packages that might cause issues
  transpilePackages: ['@trpc/server', '@trpc/client', '@trpc/react-query']
};

module.exports = nextConfig;
