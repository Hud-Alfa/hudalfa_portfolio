import type { L, Lang } from './types';

/** İki dilli bir değeri seçilen dile indirger. */
export function t(v: string | L | undefined, lang: Lang): string {
  if (v == null) return '';
  return typeof v === 'string' ? v : v[lang];
}

export const ui = {
  nav: {
    projects: { tr: 'Projeler', en: 'Projects' },
    about: { tr: 'Hakkımda', en: 'About' },
    education: { tr: 'Eğitim', en: 'Education' },
    experience: { tr: 'Deneyim', en: 'Experience' },
    certificates: { tr: 'Sertifikalar', en: 'Certificates' },
    contact: { tr: 'İletişim', en: 'Contact' },
  },
  hero: {
    seeProjects: { tr: 'Projelerimi gör', en: 'See my work' },
    getInTouch: { tr: 'İletişime geç', en: 'Get in touch' },
  },
  sections: {
    selected: { tr: 'Seçilmiş çalışmalar', en: 'Selected work' },
    featuredTitle: { tr: 'Öne çıkan <b>projeler</b>', en: 'Featured <b>projects</b>' },
    archive: { tr: 'Arşiv', en: 'Archive' },
    archiveTitle: { tr: 'Tüm <b>çalışmalar</b>', en: 'All <b>work</b>' },
    profile: { tr: 'Profil', en: 'Profile' },
    aboutTitle: { tr: 'Hakkımda ve <b>yetkinlikler</b>', en: 'About and <b>skills</b>' },
    aboutHeading: { tr: 'Hakkımda', en: 'About' },
    skillsHeading: { tr: 'Yetkinlikler', en: 'Skills' },
    education: { tr: 'Eğitim', en: 'Education' },
    educationTitle: { tr: 'Nerede <b>okudum</b>', en: 'Where I <b>studied</b>' },
    experience: { tr: 'Deneyim', en: 'Experience' },
    experienceTitle: { tr: 'Nerede <b>çalıştım</b>', en: 'Where I <b>worked</b>' },
    certificates: { tr: 'Sertifikalar', en: 'Certificates' },
    certificatesTitle: { tr: 'Ne <b>öğrendim</b>', en: 'What I <b>learned</b>' },
    certificatesSide: {
      tr: 'Beşinin de doğrulama bağlantısı açık; kurumun kendi sisteminden teyit edilebilir.',
      en: 'All five can be verified through the issuing institution’s own system.',
    },
    contact: { tr: 'İletişim', en: 'Contact' },
  },
  hud: {
    title: { tr: 'Sertifika kaydı', en: 'Certificate registry' },
    sub: { tr: '5 kayıt · tamamı doğrulanabilir', en: '5 records · all verifiable' },
    foot: {
      tr: 'Bir kayda tıkla · Doğrulama bağlantısı içeride',
      en: 'Click a record · Verification link inside',
    },
    open: { tr: 'Aç', en: 'Open' },
    system: { tr: 'Sistem', en: 'System' },
    record: { tr: 'Sertifika kaydı', en: 'Certificate record' },
    verify: { tr: 'Doğrula', en: 'Verify' },
    close: { tr: 'Kapat', en: 'Close' },
    verifiable: { tr: 'doğrulanabilir kayıt', en: 'verifiable record' },
  },
  project: {
    inspect: { tr: 'İncele', en: 'View' },
    highlights: { tr: 'Öne çıkanlar', en: 'Highlights' },
    tech: { tr: 'Teknolojiler', en: 'Technologies' },
    openGithub: { tr: 'GitHub’da aç', en: 'Open on GitHub' },
    openLive: { tr: 'Canlı siteyi aç', en: 'Open the live site' },
    privateRepo: { tr: 'Depo özel', en: 'Private repo' },
    openRepos: { tr: 'açık proje', en: 'open projects' },
    allOnGithub: { tr: 'GitHub’da tümü', en: 'All on GitHub' },
    prevImage: { tr: 'Önceki görsel', en: 'Previous image' },
    nextImage: { tr: 'Sonraki görsel', en: 'Next image' },
    pickImage: { tr: 'Görsel seç', en: 'Choose image' },
    screenshot: { tr: 'ekran görüntüsü', en: 'screenshot' },
  },
  form: {
    name: { tr: 'Adın', en: 'Your name' },
    namePlaceholder: { tr: 'Adın soyadın', en: 'Your full name' },
    email: { tr: 'E-posta', en: 'Email' },
    emailPlaceholder: { tr: 'ornek@eposta.com', en: 'you@example.com' },
    message: { tr: 'Mesajın', en: 'Your message' },
    messagePlaceholder: {
      tr: 'Kısaca ne konuşmak istediğini yaz.',
      en: 'Tell me briefly what you would like to discuss.',
    },
    send: { tr: 'Gönder', en: 'Send' },
    sending: { tr: 'Gönderiliyor…', en: 'Sending…' },
    sent: { tr: 'Mesajın ulaştı, teşekkürler.', en: 'Your message arrived, thank you.' },
    errorRequired: { tr: 'Bu alanı doldur.', en: 'Please fill this in.' },
    errorEmail: { tr: 'Geçerli bir e-posta yaz.', en: 'Enter a valid email address.' },
    errorSend: {
      tr: 'Gönderilemedi. Doğrudan e-posta atabilirsin.',
      en: 'Could not send. You can email me directly.',
    },
  },
  spotify: {
    nowPlaying: { tr: 'Spotify · şu an', en: 'Spotify · now playing' },
    lastPlayed: { tr: 'Spotify · son dinlediği', en: 'Spotify · last played' },
    play: { tr: 'Çal', en: 'Play' },
    pause: { tr: 'Duraklat', en: 'Pause' },
  },
  misc: {
    backToTop: { tr: 'Başa dön', en: 'Back to top' },
    close: { tr: 'Kapat', en: 'Close' },
    skipToContent: { tr: 'İçeriğe geç', en: 'Skip to content' },
  },
} satisfies Record<string, Record<string, L>>;

export type Ui = typeof ui;
