import type { Lang } from '@/content/types';
import { now } from '@/content/site';
import { t } from '@/content/dictionary';

export default function Now({ lang }: { lang: Lang }) {
  return (
    <section className="wrap now">
      <div className="now-grid">
        {now.map((item) => (
          <div className="now-item" key={item.title.tr}>
            <div className="k">{t(item.key, lang)}</div>
            <h4>{t(item.title, lang)}</h4>
            <p>{t(item.text, lang)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
