import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { tr: `${site.url}/tr`, en: `${site.url}/en` };
  return (['tr', 'en'] as const).map((lang) => ({
    url: `${site.url}/${lang}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: lang === 'tr' ? 1 : 0.9,
    alternates: { languages },
  }));
}
