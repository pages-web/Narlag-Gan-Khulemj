const { permission } = require('process');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cloudfront.net'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: '**.erxes.io'
      },
      {
        protocol: 'https',
        hostname: 'erxes.io'
      },
      { protocol: 'https', hostname: 'play-lh.googleusercontent.com' },
    ]
  },
  env: {
    NEXT_PUBLIC_MAIN_API_DOMAIN: "https://narlaggankhulemj.app.erxes.io/gateway",
    NEXT_PUBLIC_WS_DOMAIN: "wss:https://narlaggankhulemj.app.erxes.io/api/graphql",
    NEXT_PUBLIC_POS_TOKEN: "nyZy5KBVHv3Y7gvxoqDNjQTOxvIUEqqs",
    NEXT_PUBLIC_CP_ID: "bxmPdQNjTn0H9hCngfVp1",
  },
};

module.exports = nextConfig;
