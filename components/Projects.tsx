'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import type { Lang } from '@/content/types';
import { site } from '@/content/site';
import { t, ui } from '@/content/dictionary';
import { CATS, archive, catLabels, featured, hasDetail, type Cat, type Project } from '@/content/projects';

type Filter = Cat | 'all';

export default function Projects({ lang, repoCount }: { lang: Lang; repoCount: number }) {
  const [filter, setFilter] = useState<Filter>('all');
  const [open, setOpen] = useState<Project | null>(null);
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState<string | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const touchX = useRef(0);

  const imgs = open?.imgs ?? [];
  const many = imgs.length > 1;

  const show = useCallback(
    (p: Project, source: HTMLElement) => {
      returnTo.current = source;
      setOpen(p);
      setIndex(0);
      setZoom(null);
    },
    [],
  );

  const close = useCallback(() => {
    setOpen(null);
    setZoom(null);
    returnTo.current?.focus();
  }, []);

  const go = useCallback(
    (n: number) => {
      if (!imgs.length) return;
      setIndex((n + imgs.length) % imgs.length);
    },
    [imgs.length],
  );

  useEffect(() => {
    if (!open) return;
    document.body.classList.add('lock');
    boxRef.current?.scrollTo({ top: 0 });
    closeRef.current?.focus();
    return () => document.body.classList.remove('lock');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (zoom) setZoom(null);
        else close();
        return;
      }
      if (zoom || !many) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        go(index - 1);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        go(index + 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, zoom, many, index, go, close]);

  const shown = useMemo(
    () => archive.filter((p) => filter === 'all' || p.cats.includes(filter)),
    [filter],
  );

  // Arşiv iki satıra iniyor; bölüm ekrana sabitlenirken kartlar yana kayıyor.
  // Kayma bitince sabitleme kalkıyor ve sayfa normal akışına dönüyor.
  const COL = 300;
  const GAP = 12;
  const hsWrap = useRef<HTMLDivElement>(null);
  const hsView = useRef<HTMLDivElement>(null);
  const [shift, setShift] = useState(0);
  const [maxShift, setMaxShift] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia('(min-width: 901px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const measure = () => {
      const view = hsView.current;
      if (!view) return;
      // Sütun genişliği sabit olduğu için şerit genişliği ölçmeden hesaplanabiliyor.
      const cols = Math.ceil(shown.length / 2);
      const trackW = cols * COL + Math.max(0, cols - 1) * GAP;
      const m = Math.max(0, trackW - view.clientWidth);
      setMaxShift(m);
      setPinned(wide.matches && !calm.matches && m > 0);
      setShift((s) => Math.min(s, m));
    };
    measure();
    // Eşik atlandığında resize olayı her zaman gelmiyor; sorguyu da dinliyoruz.
    window.addEventListener('resize', measure);
    wide.addEventListener('change', measure);
    calm.addEventListener('change', measure);
    return () => {
      window.removeEventListener('resize', measure);
      wide.removeEventListener('change', measure);
      calm.removeEventListener('change', measure);
    };
  }, [shown.length]);

  useEffect(() => {
    if (!pinned) {
      setShift(0);
      return;
    }
    const hdr = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--hdr') || '66',
      10,
    );
    const onScroll = () => {
      const w = hsWrap.current;
      if (!w) return;
      const passed = hdr - w.getBoundingClientRect().top;
      setShift(Math.max(0, Math.min(maxShift, passed)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pinned, maxShift]);

  // Filtre değişince şerit başa dönüyor; yoksa yarısında kalmış gibi görünüyor.
  const pickFilter = (c: Filter) => {
    setFilter(c);
    const w = hsWrap.current;
    if (!pinned || !w) return;
    const top = w.getBoundingClientRect().top + window.scrollY;
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'auto' });
  };

  const hub = (
    <a
      className="hex hex--hub"
      href={site.github}
      target="_blank"
      rel="noopener"
      key="hub"
    >
      <span className="edge" />
      <span className="body">
        <span className="num">{repoCount}</span>
        <h3 style={{ fontWeight: 200, fontSize: 18 }}>{t(ui.project.openRepos, lang)}</h3>
        <span className="tag">{t(ui.project.allOnGithub, lang)} →</span>
      </span>
    </a>
  );

  const hex = (p: Project) => (
    <a
      className={`hex${p.cover ? '' : ' hex--pat'}`}
      href={p.github ?? '#'}
      key={p.slug}
      onClick={(e) => {
        e.preventDefault();
        show(p, e.currentTarget);
      }}
    >
      {p.cover ? <Image src={p.cover} alt="" fill sizes="280px" /> : null}
      <span className="veil" />
      <span className="edge" />
      <span className="body">
        <span className="tag">{t(p.tag, lang)}</span>
        <h3>{p.title}</h3>
        <span className="go">{t(ui.project.inspect, lang)} →</span>
      </span>
    </a>
  );

  return (
    <>
      <section id="projeler" className="sect">
        <div className="wrap">
          <div className="shead">
            <div>
              <span className="eyebrow">{t(ui.sections.selected, lang)}</span>
              <h2 dangerouslySetInnerHTML={{ __html: t(ui.sections.featuredTitle, lang) }} />
            </div>
            <p className="side">{t(ui.sections.featuredSide, lang)}</p>
          </div>
        </div>

        <div className="comb">
          <div className="hrow">{[featured[0], featured[1]].map(hex)}</div>
          <div className="hrow">
            {hex(featured[2])}
            {hub}
            {hex(featured[3])}
          </div>
          <div className="hrow">{[featured[4], featured[5]].map(hex)}</div>
        </div>
      </section>

      <section className="wrap sect">
        <div
          className={`hs${pinned ? ' on' : ''}`}
          ref={hsWrap}
          style={pinned ? { height: `calc(100vh - var(--hdr) + ${maxShift}px)` } : undefined}
        >
          <div className="hs-pin">
            <div className="shead">
              <div>
                <span className="eyebrow">{t(ui.sections.archive, lang)}</span>
                <h2 dangerouslySetInnerHTML={{ __html: t(ui.sections.archiveTitle, lang) }} />
              </div>
            </div>

            <div className="tabs">
              {(['all', ...CATS] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`tab${filter === c ? ' on' : ''}`}
                  aria-pressed={filter === c}
                  onClick={() => pickFilter(c)}
                >
                  {t(catLabels[c], lang)}
                </button>
              ))}
            </div>

            <div className="hs-view" ref={hsView}>
              <div
                className="hs-track"
                style={pinned ? { transform: `translateX(${-shift}px)` } : undefined}
              >
          {shown.map((p) => {
            const detail = hasDetail(p) && !p.github;
            const body = (
              <>
                <h4>{p.title}</h4>
                <p>{t(p.short, lang)}</p>
                <div className="meta">
                  <span>
                    <i className="dot" style={{ background: p.lang.color }} />
                    {p.lang.name}
                  </span>
                  <span>{p.stack}</span>
                  {p.privateRepo ? (
                    <span className="priv">{t(ui.project.privateRepo, lang)}</span>
                  ) : null}
                </div>
              </>
            );
            return detail ? (
              <a
                className="rcard"
                key={p.slug}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  show(p, e.currentTarget);
                }}
              >
                {body}
              </a>
            ) : (
              <a className="rcard" key={p.slug} href={p.github} target="_blank" rel="noopener">
                {body}
              </a>
            );
          })}
              </div>
            </div>

            <div className="hs-bar" aria-hidden="true">
              <i style={{ width: `${maxShift ? (shift / maxShift) * 100 : 0}%` }} />
            </div>
          </div>
        </div>
      </section>

      {open ? (
        <div
          className="mdl"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="mdl-box" role="dialog" aria-modal="true" aria-label={open.title} ref={boxRef}>
            <button
              type="button"
              className="mdl-x"
              onClick={close}
              ref={closeRef}
              aria-label={t(ui.misc.close, lang)}
            >
              ✕
            </button>
            <span className="mdl-tag">{t(open.tag, lang)}</span>
            <h3>{open.title}</h3>

            <div className="mdl-body">
              <p>{t(open.desc, lang)}</p>
              {open.hi ? (
                <>
                  <h4>{t(ui.project.highlights, lang)}</h4>
                  <ul>
                    {open.hi[lang].map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {open.tech ? (
                <>
                  <h4>{t(ui.project.tech, lang)}</h4>
                  <ul>
                    {open.tech.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </>
              ) : null}
              {open.note ? <div className="mdl-note">{t(open.note, lang)}</div> : null}
            </div>

            {imgs.length ? (
              <div className="slider">
                <div className="sl-wrap">
                  <div
                    className="sl-view"
                    onTouchStart={(e) => {
                      touchX.current = e.changedTouches[0].clientX;
                    }}
                    onTouchEnd={(e) => {
                      const dx = e.changedTouches[0].clientX - touchX.current;
                      if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
                    }}
                  >
                    <ul
                      className="sl-track"
                      style={{ transform: `translateX(${-index * 100}%)` }}
                    >
                      {imgs.map((src, i) => (
                        <li className="sl-slide" key={src}>
                          <img
                            src={src}
                            alt={`${open.title} ${t(ui.project.screenshot, lang)} ${i + 1}`}
                            loading={i < 2 ? 'eager' : 'lazy'}
                            onClick={() => setZoom(src)}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                  {many ? (
                    <>
                      <button
                        type="button"
                        className="sl-btn sl-prev"
                        onClick={() => go(index - 1)}
                        aria-label={t(ui.project.prevImage, lang)}
                      >
                        ‹
                      </button>
                      <button
                        type="button"
                        className="sl-btn sl-next"
                        onClick={() => go(index + 1)}
                        aria-label={t(ui.project.nextImage, lang)}
                      >
                        ›
                      </button>
                    </>
                  ) : null}
                </div>

                {many ? (
                  <div className="sl-dots" role="tablist" aria-label={t(ui.project.pickImage, lang)}>
                    {imgs.map((src, i) => (
                      <button
                        type="button"
                        key={src}
                        className={`sl-dot${i === index ? ' on' : ''}`}
                        role="tab"
                        aria-selected={i === index}
                        aria-label={`${i + 1}`}
                        onClick={() => go(i)}
                      />
                    ))}
                  </div>
                ) : null}

                <p className="sl-count" aria-live="polite">
                  {index + 1} / {imgs.length}
                </p>
              </div>
            ) : null}

            {open.live || open.github ? (
              <div className="mdl-act">
                {open.live ? (
                  <a className="btn" href={open.live} target="_blank" rel="noopener">
                    {t(ui.project.openLive, lang)} →
                  </a>
                ) : null}
                {open.github ? (
                  <a
                    className={`btn${open.live ? ' btn--plain' : ''}`}
                    href={open.github}
                    target="_blank"
                    rel="noopener"
                  >
                    {t(ui.project.openGithub, lang)} →
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      {zoom ? (
        <div className="mdl lb" onClick={() => setZoom(null)}>
          <button
            type="button"
            className="mdl-x lb-x"
            aria-label={t(ui.misc.close, lang)}
            onClick={() => setZoom(null)}
          >
            ✕
          </button>
          <img src={zoom} alt="" />
        </div>
      ) : null}
    </>
  );
}
