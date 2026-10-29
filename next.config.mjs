/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.scdn.co' },
    ],
  },
  async redirects() {
    // Eski Vercel adresi, aynı sayfayla birlikte asıl alan adına taşınıyor. www'ya yönlendirme
    // konmadı: eski proje hudalfa.com.tr'yi kalıcı olarak www'ya atıyordu ve tarayıcılar bunu
    // hatırlıyor; www'yu geri yönlendirmek döngü yaratır. www siteyi doğrudan gösteriyor,
    // canonical etiketi zaten hudalfa.com.tr.
    const asil = (host) => ({
      source: '/:path*',
      has: [{ type: 'host', value: host }],
      destination: 'https://hudalfa.com.tr/:path*',
      permanent: true,
    });
    return [
      asil('hudalfa.vercel.app'),
      { source: '/', destination: '/tr', permanent: false },
    ];
  },
};

export default nextConfig;
