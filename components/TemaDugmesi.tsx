'use client';

import type { Lang } from '@/content/types';

const ETIKET = { tr: 'Temayı değiştir', en: 'Toggle theme' };

/** Açık (Sea Salt) ve koyu (Bottle Green) tema arasında geçiş; seçim tarayıcıda saklanıyor. */
export default function TemaDugmesi({ lang }: { lang: Lang }) {
  const degistir = () => {
    const kok = document.documentElement;
    const yeni = kok.dataset.theme === 'dark' ? 'light' : 'dark';
    kok.dataset.theme = yeni;
    try {
      localStorage.setItem('tema', yeni);
    } catch {
      /* gizli pencerede saklanamayabilir; tema yine de değişir */
    }
  };

  return (
    <button type="button" className="tema" onClick={degistir} aria-label={ETIKET[lang]} title={ETIKET[lang]}>
      <svg className="ay" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      <svg className="gunes" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.5" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
