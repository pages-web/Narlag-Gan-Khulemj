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
  //   NEXT_PUBLIC_MAIN_API_DOMAIN: "https://yoshinoya.app.erxes.io/gateway",
  //   NEXT_PUBLIC_WS_DOMAIN: "wss://yoshinoya.app.erxes.io/gateway/graphql",
  //   NEXT_PUBLIC_POS_TOKEN: "Uw37NwESiQW4TXlDqzcnzW7b86LCG4WQ",
  //   NEXT_PUBLIC_CP_ID: "Bhult_Q0FJkyGQ13cLRLt",
  //   // NEXT_PUBLIC_NEXT_APP_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHAiOnsibmFtZSI6ImVjb20iLCJjcmVhdGVkQXQiOiIyMDI1LTAxLTE1VDExOjMzOjU1Ljg5OVoiLCJ1c2VyR3JvdXBJZCI6ImcyQ3ZvWWtTNndSd2NvUXpLYUJpMiIsImV4cGlyZURhdGUiOiIyMDI1LTAyLTE1VDE1OjM1OjA2LjU4MVoiLCJub0V4cGlyZSI6dHJ1ZSwiYWxsb3dBbGxQZXJtaXNzaW9uIjpmYWxzZSwiX2lkIjoiWVVDWjRDdWRwcmpSYXRXNmNlSDV4IiwiX192IjowfSwiaWF0IjoxNzM3MDQxNzE0fQ._R3VdRBToVARb_RQIpEr217D8uxjdSZeKWIvJZCYimg",
  // },
};

module.exports = nextConfig;
