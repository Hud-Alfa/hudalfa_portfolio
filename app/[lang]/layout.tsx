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
  const title = `${site.name} — ${t(intro.role, lang)}`;
  const description = t(intro.lead, lang);

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: `/${lang}`,
      languages: { tr: '/tr', en: '/en' },
    },
    openGraph: {
      title,
      description,
      url: `${site.url}/${lang}`,
      siteName: site.name,
      locale: lang === 'tr' ? 'tr_TR' : 'en_US',
      type: 'website',
    },
    icons: { icon: '/favicon.svg' },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'tr';

  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: t(intro.role, lang),
    email: `mailto:${site.email}`,
    url: site.url,
    sameAs: [site.github, site.linkedin],
    address: { '@type': 'PostalAddress', addressLocality: 'İstanbul', addressCountry: 'TR' },
  };

  return (
    <html lang={lang} className={`${display.variable} ${sans.variable} ${mono.variable}`}>
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
