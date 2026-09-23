/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
    ],
  },
  async redirects() {
    return [{ source: '/', destination: '/tr', permanent: false }];
  },
};

export default nextConfig;
