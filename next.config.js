/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },
  // Environment variables that should be available on the client
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
  // Optimize images
  images: {
    domains: [],
  },
  // Webpack configuration
  webpack: (config) => {
    // Add any custom webpack config here
    return config;
  },
};

module.exports = nextConfig;
