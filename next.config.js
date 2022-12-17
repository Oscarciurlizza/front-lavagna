/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "project-lavagna.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
