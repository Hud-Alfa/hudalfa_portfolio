import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { isLang, type Lang } from '@/content/types';
import { site, intro } from '@/content/site';
import { t } from '@/content/dictionary';

// LinkedIn, WhatsApp, X gibi yerlerde bağlantı paylaşılınca görünen kart.
export const alt = 'Yasir Hüdalfa Özdaş';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : 'tr';
  const foto = await readFile(join(process.cwd(), 'public/gorsel/profil-v2.jpg'));
  const src = `data:image/jpeg;base64,${foto.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: 64,
          padding: '0 80px',
          background: 'linear-gradient(135deg, #02222A 0%, #061219 55%, #0B2E33 100%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <img
          src={src}
          width={340}
          height={425}
          style={{ objectFit: 'cover', borderRadius: '170px 170px 16px 16px', border: '2px solid rgba(86,208,200,.5)' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 6, color: '#56D0C8' }}>
            {t(intro.eyebrow, lang).toLocaleUpperCase(lang === 'tr' ? 'tr' : 'en')}
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05, marginTop: 18 }}>{site.name}</div>
          <div style={{ fontSize: 30, color: '#A9BED2', marginTop: 22, lineHeight: 1.35 }}>{t(intro.role, lang)}</div>
          <div style={{ fontSize: 24, color: '#56D0C8', marginTop: 40 }}>hudalfa.com.tr</div>
        </div>
      </div>
    ),
    size,
  );
}
