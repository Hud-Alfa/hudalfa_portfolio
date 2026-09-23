import { notFound } from 'next/navigation';
import { isLang, type Lang } from '@/content/types';
import { site } from '@/content/site';
import { t, ui } from '@/content/dictionary';
import { archive } from '@/content/projects';
import { getPublicRepoCount } from '@/lib/github';

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Now from '@/components/Now';
import Projects from '@/components/Projects';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import ScrollFx from '@/components/ScrollFx';

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  if (!isLang(raw)) notFound();
  const lang: Lang = raw;

  // GitHub ulaşılamazsa elle tutulan listedeki açık depo sayısına düşer.
  const fallback = archive.filter((p) => p.github).length;
  const repoCount = await getPublicRepoCount(fallback);

  return (
    <>
      <a className="skip-link" href="#projeler">
        {t(ui.misc.skipToContent, lang)}
      </a>

      <Header lang={lang} />

      <main>
        <Hero lang={lang} />
        <Now lang={lang} />
        <Projects lang={lang} repoCount={repoCount} />
        <About lang={lang} />
        <Education lang={lang} />
        <Experience lang={lang} />
        <Certificates lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="wrap">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <a href="#">{t(ui.misc.backToTop, lang)}</a>
      </footer>

      <ScrollFx />
    </>
  );
}
