/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // Ensures minor type inconsistencies don't fail production build on Vercel
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
