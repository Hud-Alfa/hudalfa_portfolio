import type { Metadata } from 'next';
import { Archivo, Inter, JetBrains_Mono } from 'next/font/google';
import { LANGS, isLang, type Lang } from '@/content/types';
import { site, intro } from '@/content/site';
import { t } from '@/content/dictionary';
import '../globals.css';

const display = Archivo({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export function generateStaticParams() {
  return LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'tr';
  const title = `${site.name} (Hüdalfa) — ${t(intro.role, lang)}`;
  const description = t(SEO_ACIKLAMA, lang);

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    applicationName: site.name,
    authors: [{ name: site.name, url: site.url }],
    creator: site.name,
    keywords: [site.name, ...site.alternateNames, ...ANAHTAR[lang]],
    alternates: {
      canonical: `/${lang}`,
      languages: { tr: '/tr', en: '/en', 'x-default': '/tr' },
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
    openGraph: {
      title,
      description,
      url: `${site.url}/${lang}`,
      siteName: `${site.name} · Hüdalfa`,
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      alternateLocale: lang === 'tr' ? 'en_US' : 'tr_TR',
      type: 'profile',
      firstName: 'Yasir Hüdalfa',
      lastName: 'Özdaş',
      username: 'hudalfa',
    },
    twitter: { card: 'summary_large_image', title, description },
    // Search Console doğrulaması DNS'ten yapılmazsa Vercel'e bu değişken girilebilir.
    verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  };
}

const SEO_ACIKLAMA = {
  tr: 'Yasir Hüdalfa Özdaş (Hüdalfa) — İstanbul’da full stack ve mobil developer, siber güvenlik araştırmacısı. Hitit Üniversitesi Bilgisayar Mühendisliği. React Native, Next.js, Three.js ve ASP.NET Core ile geliştirdiği StarCAD, ALDOS, Not-LAN gibi projeler.',
  en: 'Yasir Hüdalfa Özdaş (Hüdalfa) — full stack & mobile developer and security researcher in Istanbul. Computer Engineering, Hitit University. Projects like StarCAD, ALDOS and Not-LAN built with React Native, Next.js, Three.js and ASP.NET Core.',
};

const ANAHTAR: Record<Lang, string[]> = {
  tr: ['full stack developer', 'mobil developer', 'siber güvenlik', 'React Native', 'bilgisayar mühendisi', 'portföy'],
  en: ['full stack developer', 'mobile developer', 'security researcher', 'React Native', 'computer engineer', 'portfolio'],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'tr';

  const kisi = {
    '@type': 'Person',
    '@id': `${site.url}/#kisi`,
    name: site.name,
    alternateName: site.alternateNames,
    givenName: 'Yasir Hüdalfa',
    familyName: 'Özdaş',
    jobTitle: t(intro.role, lang),
    description: t(SEO_ACIKLAMA, lang),
    image: `${site.url}/gorsel/profil-v2.jpg`,
    email: `mailto:${site.email}`,
    url: site.url,
    sameAs: [site.github, site.linkedin, site.instagram],
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Hitit Üniversitesi', sameAs: 'https://www.hitit.edu.tr' },
    knowsAbout: ['Full stack development', 'Mobile development', 'React Native', 'Next.js', 'Three.js', 'ASP.NET Core', 'Application security', 'Penetration testing', 'Bug bounty'],
    address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' },
  };
  const personLd = {
    '@context': 'https://schema.org',
    '@graph': [
      kisi,
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#site`,
        url: site.url,
        name: site.name,
        alternateName: ['Hüdalfa', 'Hudalfa'],
        inLanguage: ['tr', 'en'],
        publisher: { '@id': `${site.url}/#kisi` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/${lang}`,
        url: `${site.url}/${lang}`,
        name: `${site.name} (Hüdalfa)`,
        inLanguage: lang,
        isPartOf: { '@id': `${site.url}/#site` },
        mainEntity: { '@id': `${site.url}/#kisi` },
      },
    ],
  };

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        {/* Arka plan CSS içindeki bir sözde öğede duruyor; tarayıcı onu ancak stil
            dosyasını çözdükten sonra fark ediyordu. HTML ile birlikte erkenden çekiliyor. */}
        <link
          rel="preload"
          as="image"
          href="/arkaplan/devre-dalga.webp"
          media="(min-width: 901px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/arkaplan/devre-dalga-sm.webp"
          media="(max-width: 900px)"
          fetchPriority="high"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
      </body>
    </html>
  );
}
