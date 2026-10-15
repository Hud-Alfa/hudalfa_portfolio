'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/types';
import { certificates, type Certificate } from '@/content/certificates';
import { t, ui } from '@/content/dictionary';

export default function Certificates({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState<Certificate | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('lock');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('lock');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(null);
    returnTo.current?.focus();
  };

  return (
    <section id="sertifikalar" className="wrap sect">
      <div className="shead">
        <div>
          <span className="eyebrow">{t(ui.sections.certificates, lang)}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t(ui.sections.certificatesTitle, lang) }} />
        </div>
        <p className="side">{t(ui.sections.certificatesSide, lang)}</p>
      </div>

      <div className="hud">
        <span className="cnr tl0" />
        <span className="cnr tr0" />
        <span className="cnr bl0" />
        <span className="cnr br0" />

        <div className="hud-head">
          <span className="ln" />
          <span className="hud-title">{t(ui.hud.title, lang)}</span>
          <span className="ln" />
        </div>
        <div className="hud-sub">{t(ui.hud.sub, lang)}</div>

        <div className="hrows">
          {certificates.map((c, i) => (
            <div
              className="hrow2"
              key={c.name}
              role="button"
              tabIndex={0}
              onClick={(e) => {
                returnTo.current = e.currentTarget;
                setOpen(c);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  returnTo.current = e.currentTarget;
                  setOpen(c);
                }
              }}
              aria-label={`${c.name} — ${t(ui.hud.open, lang)}`}
              data-index={i}
            >
              <span className="hicon">
                <i />
              </span>
              <div>
                <div className="hname">{c.name}</div>
                <div className="horg">
                  {t(c.org, lang)} · {c.gains[lang].slice(0, 3).join(', ')}
                </div>
              </div>
              <div className="hright">
                <span className="hwhen">{t(c.whenShort, lang)}</span>
                <span className="hverify">{t(ui.hud.open, lang)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="hud-foot">{t(ui.hud.foot, lang)}</div>
      </div>

      {open ? createPortal(
        <div
          className="mdl"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="sys-box" role="dialog" aria-modal="true" aria-label={open.name}>
            <span className="cnr tl0" />
            <span className="cnr tr0" />
            <span className="cnr bl0" />
            <span className="cnr br0" />

            <div className="sys-title">{t(ui.hud.system, lang)}</div>
            <div className="sys-line" />

            <div className="sys-note">
              <div className="sys-ico">!</div>
              <div className="sys-k">{t(ui.hud.record, lang)}</div>
              <div className="sys-name">{open.name}</div>
              <div className="sys-org">{t(open.org, lang)}</div>
              <div className="sys-list">
                {open.gains[lang].map((g) => (
                  <div key={g}>{g}</div>
                ))}
              </div>
            </div>

            <div className="sys-act">
              <a className="sys-btn" href={open.url} target="_blank" rel="noopener">
                {t(ui.hud.verify, lang)}
              </a>
              <button type="button" className="sys-btn sys-btn--ghost" onClick={close} ref={closeRef}>
                {t(ui.hud.close, lang)}
              </button>
            </div>

            <div className="sys-foot">
              {t(open.when, lang)} · {t(ui.hud.verifiable, lang)}
            </div>
          </div>
        </div>
      , document.body) : null}
    </section>
  );
}
