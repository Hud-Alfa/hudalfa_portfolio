'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Lang } from '@/content/types';
import { site } from '@/content/site';
import { t, ui } from '@/content/dictionary';

const NAV = [
  { id: 'projeler', label: ui.nav.projects },
  { id: 'hakkimda', label: ui.nav.about },
  { id: 'egitim', label: ui.nav.education },
  { id: 'deneyim', label: ui.nav.experience },
  { id: 'sertifikalar', label: ui.nav.certificates },
  { id: 'iletisim', label: ui.nav.contact },
];

export default function Header({ lang }: { lang: Lang }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const spy = () => {
      const line = window.scrollY + window.innerHeight * 0.3;
      let current: string | null = null;
      for (const s of sections) if (s.offsetTop <= line) current = s.id;
      setActive(current);
    };
    spy();
    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);
    return () => {
      window.removeEventListener('scroll', spy);
      window.removeEventListener('resize', spy);
    };
  }, []);

  const other: Lang = lang === 'tr' ? 'en' : 'tr';

  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Link className="logo" href={`/${lang}`}>
          {site.shortName}
        </Link>

        <nav className="nav" aria-label={t(ui.nav.projects, lang)}>
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={active === n.id ? 'act' : undefined}
              aria-current={active === n.id ? 'true' : undefined}
            >
              {t(n.label, lang)}
            </a>
          ))}
        </nav>

        <div className="hdr-right">
          <div className="lang">
            <Link href={`/${lang}`} className="on" aria-current="true">
              {lang.toUpperCase()}
            </Link>
            <Link href={`/${other}`}>{other.toUpperCase()}</Link>
          </div>

          <a className="ic" href={site.github} target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.6 1 2.7 0 3.8-2.3 4.7-4.6 4.9.4.3.7.9.7 1.9V21c0 .3.2.6.7.5 3.9-1.3 6.8-5.1 6.8-9.5C22 6.5 17.5 2 12 2z" />
            </svg>
          </a>

          <a
            className="ic"
            href={site.linkedin}
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6ZM2 9h4v11H2z" />
              <circle cx="4" cy="4" r="2" fill="currentColor" stroke="none" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
