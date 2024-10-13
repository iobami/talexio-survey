/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
      }
    ],
  },
  async redirects() {
    return [
      {
        "source": "/",
        "destination": "/survey",
        "permanent": false
      }
    ];
  }
};

module.exports = nextConfig;
