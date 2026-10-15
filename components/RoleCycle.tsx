'use client';

import { useEffect, useState } from 'react';

const HOLD = 3400;
const SLIDE = 700;

/**
 * Unvanlar sırayla aşağı doğru dönüyor: yeni satır üstten iniyor,
 * eski satır aşağı çıkıyor. Hareket azaltma açıksa dönme olmuyor,
 * üçü birden alt alta görünüyor.
 */
export default function RoleCycle({ roles }: { roles: string[] }) {
  const [still, setStill] = useState(true);
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);

  useEffect(() => {
    setStill(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (still || roles.length < 2) return;
    const id = setInterval(() => {
      setActive((a) => {
        setLeaving(a);
        return (a + 1) % roles.length;
      });
    }, HOLD);
    return () => clearInterval(id);
  }, [still, roles.length]);

  useEffect(() => {
    if (leaving === null) return;
    const id = setTimeout(() => setLeaving(null), SLIDE);
    return () => clearTimeout(id);
  }, [leaving]);

  if (still) {
    return (
      <div className="role role--static">
        {roles.map((r) => (
          <span key={r}>{r}</span>
        ))}
      </div>
    );
  }

  return (
    <div className="role" aria-live="off">
      {roles.map((r, i) => (
        <span key={r} className={i === active ? 'on' : i === leaving ? 'off' : undefined}>
          {r}
        </span>
      ))}
    </div>
  );
}
