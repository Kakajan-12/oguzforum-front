import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'api.oguzforum.com',
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
