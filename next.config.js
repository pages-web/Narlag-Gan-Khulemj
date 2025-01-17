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

  // env: {
  //   NEXT_PUBLIC_MAIN_API_DOMAIN: "https://segsgermaa.app.erxes.io/gateway",
  //   NEXT_PUBLIC_WS_DOMAIN: "wss:https://segsgermaa.app.erxes.io/api/graphql",
  //   NEXT_PUBLIC_POS_TOKEN: "IuUcQtb4SFmcG2OHE5yFhI2opGml3jr2",
  //   NEXT_PUBLIC_CP_ID: "L8XsGnzyUpZSd0HG2i7Eq",
  //   NEXT_PUBLIC_FACEBOOK_ID: "477832793072863",
  // },
  // env: {
  //   NEXT_PUBLIC_MAIN_API_DOMAIN: "https://giftstore.app.erxes.io/gateway",
  //   NEXT_PUBLIC_WS_DOMAIN: "wss:https://giftstore.app.erxes.io/api/graphql",
  //   NEXT_PUBLIC_POS_TOKEN: "pIHS7DAHi2XXdHMCgQWCArXkiHzzE5Nl",
  //   NEXT_PUBLIC_CP_ID: "oiAqS6ULx8fSHdqj0gCv2",
  // },
};

module.exports = nextConfig;
