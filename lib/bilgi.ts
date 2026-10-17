/**
 * Asistanın bilgi tabanı: sitedeki içerikten (content/) üretilen parçalar ve
 * bu parçalar üzerinde BM25 araması. Bilgi elle bir yere kopyalanmıyor; site
 * güncellendiğinde asistan da güncellenmiş oluyor. Telefon numarası gibi
 * kişisel bilgiler zaten content/ içinde olmadığı için buraya da girmiyor.
 */
import type { Lang } from '@/content/types';
import { site, intro, now, about, education } from '@/content/site';
import { projects } from '@/content/projects';
import { experience } from '@/content/experience';
import { certificates } from '@/content/certificates';
import { skills } from '@/content/skills';
import { t } from '@/content/dictionary';

export type Parca = {
  id: string;
  /** Kaynak etiketinde görünen ad. */
  ad: string;
  metin: string;
  /** Proje parçalarında, kaynağa tıklayınca açılacak projenin kimliği. */
  slug?: string;
};

// Her parçaya, metninde geçmese de sorularda sık kullanılan kelimeler ekleniyor:
// "nerede okudu" sorusu "Hitit Üniversitesi" metnini bulsun diye.
const IPUCU = {
  egitim: 'okul okudu okuyor universite mezun mezuniyet lisans bolum ortalama not school university studied study graduate degree gpa',
  deneyim: 'staj stajyer stajlar calisti calistigi is deneyim sirket internship intern worked work job experience company',
  sertifika: 'sertifika sertifikalar kurs bootcamp belge dogrulama certificate certificates course verified',
  yetenek: 'yetenek yetenekler yetkinlik bilir biliyor kullanir teknoloji teknolojiler dil diller araclar skills skill knows languages technologies tools stack',
  iletisim: 'iletisim ulas ulasmak eposta mail email linkedin github instagram contact reach hire',
  simdi: 'su sirada simdi suan guncel calisiyor ugrasiyor acik firsat is ariyor now currently working open opportunity looking',
  proje: 'proje projeler gelistirdi yapti yaptigi uygulama project projects built made app',
};

function parcalar(lang: Lang): Parca[] {
  const out: Parca[] = [];
  const L = (tr: string, en: string) => (lang === 'tr' ? tr : en);

  for (const p of projects) {
    const satirlar = [
      `${L('Proje', 'Project')}: ${p.title}`,
      t(p.short, lang),
      p.desc ? t(p.desc, lang) : '',
      p.hi ? `${L('Öne çıkanlar', 'Highlights')}: ${p.hi[lang].join('; ')}` : '',
      `${L('Teknolojiler', 'Technologies')}: ${p.tech ? p.tech.join(', ') : p.stack}`,
      `${L('Ana dil', 'Main language')}: ${p.lang.name}`,
      p.github ? `GitHub: ${p.github}` : L('Deposu özel.', 'Repository is private.'),
      p.live ? `${L('Canlı adres', 'Live')}: ${p.live}` : '',
      p.note ? t(p.note, lang) : '',
      IPUCU.proje,
    ];
    out.push({ id: `proje:${p.slug}`, ad: p.title, metin: satirlar.filter(Boolean).join('\n'), slug: p.slug });
  }

  for (const j of experience) {
    out.push({
      id: `deneyim:${kimlik(t(j.org, 'en').split(' ·')[0])}`,
      ad: t(j.org, lang).split(' ·')[0],
      metin: [
        `${L('Deneyim', 'Experience')}: ${t(j.role, lang)} — ${t(j.org, lang)}`,
        `${L('Tarih', 'Dates')}: ${t(j.when, lang)}`,
        ...j.points[lang],
        IPUCU.deneyim,
      ].join('\n'),
    });
  }

  out.push({
    id: 'egitim',
    ad: L('Eğitim', 'Education'),
    metin: [
      `${L('Eğitim', 'Education')}: ${t(education.school, lang)} — ${t(education.dept, lang)}`,
      `${t(education.when, lang)} · ${t(education.gpaLabel, lang)}: ${education.gpa}`,
      t(education.text, lang),
      IPUCU.egitim,
    ].join('\n'),
  });

  for (const c of certificates) {
    out.push({
      id: `sertifika:${kimlik(c.name)}`,
      ad: c.name,
      metin: [
        `${L('Sertifika', 'Certificate')}: ${c.name} — ${t(c.org, lang)} (${t(c.when, lang)})`,
        `${L('Kazanımlar', 'Gains')}: ${c.gains[lang].join(', ')}`,
        `${L('Doğrulama', 'Verification')}: ${c.url}`,
        IPUCU.sertifika,
      ].join('\n'),
    });
  }

  for (const g of skills) {
    out.push({
      id: `yetenek:${kimlik(t(g.label, 'en'))}`,
      ad: t(g.label, lang),
      metin: [
        `${L('Yetkinlikler', 'Skills')} — ${t(g.label, lang)}: ${g.items.map((s) => t(s.name, lang)).join(', ')}`,
        ...g.items.map((s) => `${t(s.name, lang)}: ${t(s.tip, lang)}`),
        IPUCU.yetenek,
      ].join('\n'),
    });
  }

  out.push({
    id: 'simdi',
    ad: L('Şu sıralar', 'Right now'),
    metin: [...now.map((n) => `${t(n.key, lang)} — ${t(n.title, lang)}: ${t(n.text, lang)}`), IPUCU.simdi].join('\n'),
  });

  out.push({
    id: 'iletisim',
    ad: L('İletişim', 'Contact'),
    metin: [
      `${L('E-posta', 'Email')}: ${site.email}`,
      `GitHub: ${site.github}`,
      `LinkedIn: ${site.linkedin}`,
      `Instagram: ${site.instagram}`,
      IPUCU.iletisim,
    ].join('\n'),
  });

  return out;
}

/** Her soruda modele verilen, aramadan bağımsız temel profil. */
export function cekirdek(lang: Lang): string {
  const L = (tr: string, en: string) => (lang === 'tr' ? tr : en);
  return [
    `${L('Ad', 'Name')}: ${site.name}`,
    `${L('Unvanlar', 'Roles')}: ${intro.roles[lang].join(', ')}`,
    `${L('Tanıtım', 'Intro')}: ${t(intro.lead, lang)}`,
    ...about.paragraphs[lang],
    ...about.facts.map((f) => `${t(f.k, lang)}: ${t(f.v, lang)}`),
    `${L('E-posta', 'Email')}: ${site.email}`,
    `${L('Proje listesi', 'Project list')}:`,
    ...projects.map((p) => `- ${p.title} (${p.stack}): ${t(p.short, lang)}`),
  ].join('\n');
}

// --- Arama ---

const DURAK = new Set(
  (
    've veya ile icin bir bu su o da de mi mu ne nedir neler nasil hangi kim kac ' +
    'mi mı mu mü ki ama gibi olan var yok daha en cok cok hakkinda biraz bana ' +
    'the a an and or of to in on for with is are was were what which who how does do did about his he him me tell'
  ).split(/\s+/),
);

function katla(s: string): string {
  return s
    .toLocaleLowerCase('tr')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function kimlik(s: string): string {
  return katla(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/** Türkçe eklemeli bir dil; ilk dört harf, ekleri kırpmanın kaba ama işe yarar yolu. */
function kelimeler(s: string): string[] {
  return katla(s)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length > 1 && !DURAK.has(w))
    .map((w) => (w.length > 4 ? w.slice(0, 4) : w));
}

type Indeks = { parcalar: Parca[]; tf: Map<string, number>[]; boy: number[]; ort: number; df: Map<string, number> };
const onbellek = new Map<Lang, Indeks>();

function indeks(lang: Lang): Indeks {
  const hazir = onbellek.get(lang);
  if (hazir) return hazir;
  const ps = parcalar(lang);
  const tf = ps.map((p) => {
    const m = new Map<string, number>();
    // Başlık eşleşmesi metnin geri kalanından daha güçlü bir işaret.
    const metin = `${p.ad} ${p.ad} ${p.ad}
${p.metin}`;
    for (const w of kelimeler(metin)) m.set(w, (m.get(w) ?? 0) + 1);
    return m;
  });
  const boy = tf.map((m) => [...m.values()].reduce((a, b) => a + b, 0));
  const df = new Map<string, number>();
  for (const m of tf) for (const w of m.keys()) df.set(w, (df.get(w) ?? 0) + 1);
  const ix = { parcalar: ps, tf, boy, ort: boy.reduce((a, b) => a + b, 0) / boy.length, df };
  onbellek.set(lang, ix);
  return ix;
}

/** Soruya en uygun parçalar, BM25 puanına göre. Hiçbir kelime eşleşmezse boş döner. */
export function ara(soru: string, lang: Lang, k = 5): { parca: Parca; puan: number }[] {
  const ix = indeks(lang);
  const q = [...new Set(kelimeler(soru))];
  const N = ix.parcalar.length;
  const k1 = 1.4;
  const b = 0.72;
  return ix.parcalar
    .map((parca, i) => {
      let puan = 0;
      for (const w of q) {
        const f = ix.tf[i].get(w);
        if (!f) continue;
        const n = ix.df.get(w) ?? 0;
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
        puan += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * ix.boy[i]) / ix.ort));
      }
      return { parca, puan };
    })
    .filter((r) => r.puan > 0)
    .sort((a, z) => z.puan - a.puan)
    .slice(0, k);
}
