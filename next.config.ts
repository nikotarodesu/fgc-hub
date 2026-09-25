import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'images-na.ssl-images-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.nikotaro.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'resource.logitechg.com',
      },
      {
        protocol: 'https',
        hostname: 'punkworkshop.jp',
      },
      {
        protocol: 'https',
        hostname: 'haute42.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hitboxarcade.com',
      },
      {
        protocol: 'https',
        hostname: 'image.benq.com',
      },
      {
        protocol: 'https',
        hostname: 'dlcdnwebimgs.asus.com',
      },
    ],
  },
};

export default nextConfig;
