import type { Lang } from '@/content/types';
import { experience } from '@/content/experience';
import { t, ui } from '@/content/dictionary';

export default function Experience({ lang }: { lang: Lang }) {
  return (
    <section id="deneyim" className="wrap sect">
      <div className="shead">
        <div>
          <span className="eyebrow">{t(ui.sections.experience, lang)}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t(ui.sections.experienceTitle, lang) }} />
        </div>
      </div>

      <div className="tl">
        {experience.map((job) => (
          <div className="tl-item" key={job.org.tr}>
            <div>
              <div className="tl-when">{t(job.when, lang)}</div>
              <div className="tl-org">{t(job.org, lang)}</div>
            </div>
            <div>
              <div className="tl-role">{t(job.role, lang)}</div>
              <ul>
                {job.points[lang].map((p) => (
                  <li key={p.slice(0, 24)}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
