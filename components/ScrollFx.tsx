'use client';

import { useEffect } from 'react';

/**
 * Bölümler görünür alana girerken alttan yükselerek belirir.
 * Konum tabanlı: sayfanın ortasına atlansa bile üstte kalan hiçbir öğe
 * görünmez kalmaz. prefers-reduced-motion açıkken CSS animasyonu devre dışı.
 */
const GROUPS = ['.comb', '.rgrid', '.tl', '.now-grid', '.duo', '.ct'];
const SINGLES = '.shead, .edu, .hud';

export default function ScrollFx() {
  useEffect(() => {
    const items: HTMLElement[] = [];

    for (const sel of GROUPS) {
      const box = document.querySelector(sel);
      if (!box) continue;
      Array.from(box.children).forEach((child, i) => {
        if (child.classList.contains('hrow')) {
          Array.from(child.children).forEach((h, j) => {
            const el = h as HTMLElement;
            el.classList.add('reveal');
            el.style.transitionDelay = `${j * 60}ms`;
            items.push(el);
          });
          return;
        }
        const el = child as HTMLElement;
        el.classList.add('reveal');
        el.style.transitionDelay = `${Math.min(i, 5) * 60}ms`;
        items.push(el);
      });
    }

    document.querySelectorAll<HTMLElement>(SINGLES).forEach((el) => {
      el.classList.add('reveal');
      items.push(el);
    });

    let pending = [...items];

    const tick = () => {
      const h = window.innerHeight;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < h * 0.92) {
          el.classList.add('in');
          return false;
        }
        return true;
      });
      if (!pending.length) {
        window.removeEventListener('scroll', tick);
        window.removeEventListener('resize', tick);
      }
    };

    tick();
    window.addEventListener('scroll', tick, { passive: true });
    window.addEventListener('resize', tick);
    return () => {
      window.removeEventListener('scroll', tick);
      window.removeEventListener('resize', tick);
    };
  }, []);

  return null;
}
