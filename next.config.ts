import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // Потом можно удалить этот блок, если не нужно будет проксировать запросы на api.oguzforum.com
  async rewrites() {
    return [
      {
        source: "/api/oguz-proxy/:path*",
        destination: "https://api.oguzforum.com/api/:path*",
      },
    ];
  },
  //////////////////////////////////////////////////////////////оло
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.oguzforum.com",
        port: "",
        pathname: "/uploads/**",
      },
    ],
  },
  // images: {
  //     remotePatterns: [
  //         {
  //             protocol: 'http',
  //             hostname: 'localhost',
  //             pathname: '/uploads/**',
  //         },
  //     ],
  // },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
