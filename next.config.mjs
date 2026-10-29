/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
    ],
  },
  async redirects() {
    // Eski Vercel adresi ve www, aynı sayfayla birlikte asıl alan adına taşınıyor.
    const asil = (host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: 'https://hudalfa.com.tr/:path*',
      permanent: true,
    });
    return [
      asil('hudalfa.vercel.app'),
      asil('www.hudalfa.com.tr'),
      { source: '/', destination: '/tr', permanent: false },
    ];
  },
};

export default nextConfig;
