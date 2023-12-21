/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['liveblocks.io'],
  },
  async rewrites() {
    return [
      {
        source: '/oauth2/authorization/google',
        destination:
          'http://ec2-43-203-40-200.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google', // Google OAuth endpoint
      },
      // 다른 rewrites 설정이 필요하다면 여기에 추가
    ];
  },
};

module.exports = nextConfig;
