import type { L, LArr } from './types';

export type Job = {
  when: L;
  org: L;
  role: L;
  points: LArr;
};

export const experience: Job[] = [
  {
    when: { tr: 'Temmuz — Eylül 2026', en: 'July — September 2026' },
    org: { tr: 'Tekhnelogos · İstanbul', en: 'Tekhnelogos · Istanbul' },
    role: { tr: 'Full Stack — Yazılım Stajyeri', en: 'Full Stack — Software Intern' },
    points: {
      tr: [
        'Doğalgaz dağıtım ve plan çizim firmaları odaklı bir CAD uygulaması geliştirdim.',
        'Kullanıcı deneyimini merkeze alan, sürdürülebilir ve ölçeklenebilir arayüz mimarileri kurgularken güvenli yazılım prensiplerini sürece dahil ettim.',
      ],
      en: [
        'Built a CAD application aimed at gas distribution and drafting companies.',
        'Designed sustainable, scalable interface architectures around user experience while bringing secure coding principles into the process.',
      ],
    },
  },
  {
    when: { tr: 'Haziran — Ağustos 2026', en: 'June — August 2026' },
    org: { tr: 'Microsoft · Uzaktan', en: 'Microsoft · Remote' },
    role: { tr: 'Gönüllü Yazılım Stajyeri', en: 'Volunteer Software Intern' },
    points: {
      tr: [
        'İnternet bağlantısı gerektirmeden, tamamen cihaz üzerinde çalışan bir RAG uygulaması geliştirdim.',
        'Doküman içeriklerini embedding vektörlerine dönüştürerek SQLite tabanlı bir vektör deposunda indeksledim ve benzerlik aramasıyla yanıtları verimli şekilde getirdim.',
      ],
      en: [
        'Built a RAG application that runs entirely on device, with no internet connection required.',
        'Turned document contents into embedding vectors, indexed them in a SQLite-based vector store, and served answers efficiently through similarity search.',
      ],
    },
  },
  {
    when: { tr: 'Haziran — Eylül 2024', en: 'June — September 2024' },
    org: { tr: 'Bilgiturk Veri İletişim · İstanbul', en: 'Bilgiturk Veri İletişim · Istanbul' },
    role: { tr: 'Yazılım Stajyeri', en: 'Software Intern' },
    points: {
      tr: [
        'Müşterilere ait TypeScript tabanlı web uygulamalarına yeni modüller entegre ettim ve sistem performansını artırmaya yönelik iyileştirmeler yaptım.',
        'Sunucu kurulumları ve donanım yapılandırmaları tamamladım; güvenli ve ölçeklenebilir örnek bir hastane ağ topolojisi tasarladım.',
      ],
      en: [
        'Integrated new modules into client TypeScript web applications and made improvements to raise system performance.',
        'Completed server installations and hardware configuration, and designed a secure, scalable sample hospital network topology.',
      ],
    },
  },
];
