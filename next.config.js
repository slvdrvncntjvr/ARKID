/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://26.65.231.149"],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
