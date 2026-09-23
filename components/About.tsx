'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/types';
import { about } from '@/content/site';
import { skills } from '@/content/skills';
import { t, ui } from '@/content/dictionary';

type Tip = { text: string; el: HTMLElement } | null;

export default function About({ lang }: { lang: Lang }) {
  const [tip, setTip] = useState<Tip>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const box = useRef<HTMLDivElement>(null);

  const place = (el: HTMLElement, text: string) => setTip({ text, el });

  // Metin yerleştikten sonra ölç: kutunun genişliği içeriğe göre değişiyor.
  useLayoutEffect(() => {
    if (!tip || !box.current) return;
    const r = tip.el.getBoundingClientRect();
    const w = box.current.offsetWidth;
    const h = box.current.offsetHeight;
    let x = r.left + r.width / 2 - w / 2;
    x = Math.max(12, Math.min(x, window.innerWidth - w - 12));
    let y = r.top - h - 10;
    if (y < 12) y = r.bottom + 10;
    setPos({ x, y });
  }, [tip]);

  useEffect(() => {
    if (!tip) return;
    const hide = () => setTip(null);
    window.addEventListener('scroll', hide, { passive: true });
    return () => window.removeEventListener('scroll', hide);
  }, [tip]);

  return (
    <section id="hakkimda" className="wrap sect">
      <div className="shead">
        <div>
          <span className="eyebrow">{t(ui.sections.profile, lang)}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t(ui.sections.aboutTitle, lang) }} />
        </div>
      </div>

      <div className="duo">
        <div className="panel panel--about">
          <h3>{t(ui.sections.aboutHeading, lang)}</h3>
          {about.paragraphs[lang].map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <div className="facts">
            {about.facts.map((f) => (
              <div className="fact" key={f.k.tr}>
                <span className="k">{t(f.k, lang)}</span>
                <span className="v">
                  {'live' in f && f.live ? <span className="dotlive" /> : null}
                  {t(f.v, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>{t(ui.sections.skillsHeading, lang)}</h3>
          <div className="skills">
            {skills.map((group) => (
              <div className="srow" key={group.label.tr}>
                <div className="sk">{t(group.label, lang)}</div>
                <div className="chips">
                  {group.items.map((s) => {
                    const name = t(s.name, lang);
                    const text = t(s.tip, lang);
                    return (
                      <span
                        key={name}
                        className="chip"
                        tabIndex={0}
                        onMouseEnter={(e) => place(e.currentTarget, text)}
                        onMouseLeave={() => setTip(null)}
                        onFocus={(e) => place(e.currentTarget, text)}
                        onBlur={() => setTip(null)}
                      >
                        {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        ref={box}
        className={`tipbox${tip ? ' on' : ''}`}
        role="tooltip"
        style={{ left: pos.x, top: pos.y }}
      >
        {tip?.text ?? ''}
      </div>
    </section>
  );
}
