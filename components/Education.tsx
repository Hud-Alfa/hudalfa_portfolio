import type { Lang } from '@/content/types';
import { education } from '@/content/site';
import { t, ui } from '@/content/dictionary';

export default function Education({ lang }: { lang: Lang }) {
  return (
    <section id="egitim" className="wrap sect">
      <div className="shead">
        <div>
          <span className="eyebrow">{t(ui.sections.education, lang)}</span>
          <h2 dangerouslySetInnerHTML={{ __html: t(ui.sections.educationTitle, lang) }} />
        </div>
      </div>

      <div className="panel edu">
        <div>
          <div className="when">{t(education.when, lang)}</div>
          <h3>{t(education.school, lang)}</h3>
          <div className="dept">{t(education.dept, lang)}</div>
          <p>{t(education.text, lang)}</p>
        </div>
        <div className="gpa">
          <div className="v">{education.gpa}</div>
          <div className="k">{t(education.gpaLabel, lang)}</div>
        </div>
      </div>
    </section>
  );
}
