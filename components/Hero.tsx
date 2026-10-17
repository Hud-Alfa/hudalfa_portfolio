import Image from 'next/image';
import type { Lang } from '@/content/types';
import { intro, site } from '@/content/site';
import { t, ui } from '@/content/dictionary';
import SpotifyBadge from './SpotifyBadge';
import RoleCycle from './RoleCycle';
import Asistan from './Asistan';

// Anahtar girilmemişse canlı sitede düğme hiç görünmüyor; geliştirmede deneme yanıtı veriyor.
const asistanAcik = Boolean(process.env.ANTHROPIC_API_KEY) || process.env.NODE_ENV !== 'production';

export default function Hero({ lang }: { lang: Lang }) {
  const [first, ...rest] = site.name.split(' ');
  const last = rest.pop() ?? '';
  const middle = rest.join(' ');

  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="eyebrow">{t(intro.eyebrow, lang)}</span>
          <h1>
            {first} {middle}
            <br />
            <b>{last}</b>
          </h1>
          <RoleCycle roles={intro.roles[lang]} />
          <p className="lead">{t(intro.lead, lang)}</p>
          <div className="cta">
            <a className="btn" href="#projeler">
              {t(ui.hero.seeProjects, lang)}
            </a>
            <a className="btn btn--plain" href="#iletisim">
              {t(ui.hero.getInTouch, lang)}
            </a>
          </div>
        </div>

        <div className="shot">
          <div className="frame">
            <Image
              src="/gorsel/profil-v2.jpg"
              alt={site.name}
              width={480}
              height={480}
              priority
              sizes="(max-width: 1080px) 400px, 420px"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
          <SpotifyBadge lang={lang} />
          {asistanAcik ? <Asistan lang={lang} /> : null}
        </div>
      </div>
    </section>
  );
}
