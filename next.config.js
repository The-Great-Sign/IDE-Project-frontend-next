/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['liveblocks.io', 'lh3.googleusercontent.com'],
  },
  async rewrites() {
    return [
      {
        source: '/oauth2/authorization/google',
        destination: `${process.env.NEXT_PUBLIC_BACKEND_URI}/oauth2/authorization/google`, // Google OAuth endpoint
      },
      // 다른 rewrites 설정이 필요하다면 여기에 추가
    ];
  },
};

module.exports = nextConfig;
