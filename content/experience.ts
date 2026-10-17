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
        'Doğalgaz dağıtım firmaları için geliştirilen web tabanlı CAD uygulamasının uçtan uca süreçlerinde rol aldım; kullanıcı deneyimi odaklı arayüzler ve Three.js ile 3D destekli çizim modülleri tasarladım.',
        'Uygulamanın altyapı ve dağıtım süreçlerinde Docker ve Portainer kullanarak izole, kolay yönetilebilir ve ölçeklenebilir bir konteyner mimarisi kurguladım.',
        'Geliştirme yaşam döngüsünün geneline güvenli yazılım (secure coding) prensiplerini entegre ederek projenin yapısal güvenliğini maksimize ettim.',
      ],
      en: [
        'Worked end to end on a web-based CAD application for natural gas distribution companies, designing user-experience-focused interfaces and 3D-enabled drawing modules with Three.js.',
        'Set up an isolated, easy-to-manage and scalable container architecture for the app’s infrastructure and deployment using Docker and Portainer.',
        'Built secure coding principles into the whole development lifecycle to maximize the project’s structural security.',
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
