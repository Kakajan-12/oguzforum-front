import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.oguzforum.com',
                port: '',
                pathname: '/uploads/**',
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
