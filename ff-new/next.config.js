/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ext.same-assets.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-gop.garenanow.com',
      }
    ],
  },
  // Esta configuração desativa os avisos de crossorigin
  crossOrigin: 'anonymous',
};

export default nextConfig;
