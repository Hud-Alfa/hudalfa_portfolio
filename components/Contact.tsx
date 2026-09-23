'use client';

import { useState } from 'react';
import type { Lang } from '@/content/types';
import { contact, site } from '@/content/site';
import { t, ui } from '@/content/dictionary';

type Errors = { name?: string; email?: string; message?: string };
type State = 'idle' | 'sending' | 'sent' | 'error';

const KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

export default function Contact({ lang }: { lang: Lang }) {
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>('idle');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    const next: Errors = {};
    if (!name) next.name = t(ui.form.errorRequired, lang);
    if (!email) next.email = t(ui.form.errorRequired, lang);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = t(ui.form.errorEmail, lang);
    if (!message) next.message = t(ui.form.errorRequired, lang);
    setErrors(next);
    if (Object.keys(next).length) return;

    setState('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: KEY,
          name,
          email,
          message,
          from_name: name,
          subject: `${site.shortName} — ${name}`,
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setState('sent');
      form.reset();
    } catch {
      setState('error');
    }
  }

  return (
    <section id="iletisim" className="wrap sect">
      <div className="panel ct">
        <div className="ct-left">
          <span className="eyebrow">{t(ui.sections.contact, lang)}</span>
          <h3 dangerouslySetInnerHTML={{ __html: t(contact.heading, lang) }} />
          <p>{t(contact.text, lang)}</p>
          <a className="mailto" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <div className="chips ct-soc">
            <a className="chip" href={site.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="chip" href={site.linkedin} target="_blank" rel="noopener">
              LinkedIn
            </a>
            <a className="chip" href={site.instagram} target="_blank" rel="noopener">
              Instagram
            </a>
          </div>
        </div>

        {KEY ? (
          <form className="form ct-form" onSubmit={onSubmit} noValidate>
            <div className="frow">
              <label>
                <span>{t(ui.form.name, lang)}</span>
                <input
                  type="text"
                  name="name"
                  placeholder={t(ui.form.namePlaceholder, lang)}
                  aria-invalid={errors.name ? 'true' : undefined}
                  onChange={() => setErrors((p) => ({ ...p, name: undefined }))}
                />
                {errors.name ? <span className="err">{errors.name}</span> : null}
              </label>
              <label>
                <span>{t(ui.form.email, lang)}</span>
                <input
                  type="email"
                  name="email"
                  placeholder={t(ui.form.emailPlaceholder, lang)}
                  aria-invalid={errors.email ? 'true' : undefined}
                  onChange={() => setErrors((p) => ({ ...p, email: undefined }))}
                />
                {errors.email ? <span className="err">{errors.email}</span> : null}
              </label>
            </div>
            <label>
              <span>{t(ui.form.message, lang)}</span>
              <textarea
                name="message"
                rows={3}
                placeholder={t(ui.form.messagePlaceholder, lang)}
                aria-invalid={errors.message ? 'true' : undefined}
                onChange={() => setErrors((p) => ({ ...p, message: undefined }))}
              />
              {errors.message ? <span className="err">{errors.message}</span> : null}
            </label>

            <button type="submit" className="btn" disabled={state === 'sending'}>
              {t(state === 'sending' ? ui.form.sending : ui.form.send, lang)}
            </button>

            {state === 'sent' ? (
              <p className="status" role="status">
                {t(ui.form.sent, lang)}
              </p>
            ) : null}
            {state === 'error' ? (
              <p className="status bad" role="status">
                {t(ui.form.errorSend, lang)}
              </p>
            ) : null}
          </form>
        ) : null}
      </div>
    </section>
  );
}
