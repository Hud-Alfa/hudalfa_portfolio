import type { L, LArr } from './types';

export const site = {
  name: 'Yasir Hüdalfa Özdaş',
  shortName: 'Hudalfa',
  email: 'ysrozdas1@gmail.com',
  github: 'https://github.com/Hud-Alfa',
  githubUser: 'Hud-Alfa',
  linkedin: 'https://www.linkedin.com/in/hudalfa/',
  instagram: 'https://www.instagram.com/yasir_hudalfa',
  url: 'https://hudalfa.vercel.app',
};

export const intro = {
  eyebrow: {
    tr: 'Bilgisayar mühendisi',
    en: 'Computer engineer',
  } satisfies L,
  /** Hero'da sırayla dönen unvanlar. */
  roles: {
    tr: ['Full stack developer', 'Mobil developer', 'Siber güvenlik araştırmacısı'],
    en: ['Full stack developer', 'Mobile developer', 'Security researcher'],
  } satisfies LArr,
  /** Sekme başlığı ve JSON-LD için tek satırlık hali. */
  role: {
    tr: 'Full stack & mobil developer · Siber güvenlik araştırmacısı',
    en: 'Full stack & mobile developer · Security researcher',
  } satisfies L,
  lead: {
    tr: 'Merhaba, ben Yasir. React Native ile çapraz platform uygulamalar geliştiriyor, aynı zamanda siber güvenlik üzerine çalışıyorum. Son olarak Tekhnelogos’ta doğal gaz dağıtım firmaları için tarayıcıda çalışan bir CAD editörü geliştirdim.',
    en: 'Hi, I’m Yasir. I build cross-platform apps with React Native and work on security at the same time. Most recently I built a browser-based CAD editor at Tekhnelogos for natural gas distribution companies.',
  } satisfies L,
};

export const now = [
  {
    key: { tr: 'Şu sıralar', en: 'Right now' } satisfies L,
    title: { tr: 'Google Play', en: 'Google Play' } satisfies L,
    text: {
      tr: 'Uygulamalarımı Google Play’de yayına hazırlıyorum; mağaza gereksinimleri, imzalama ve sürüm süreçleriyle ilgileniyorum.',
      en: 'Getting my apps ready for Google Play — store requirements, signing and release flows.',
    } satisfies L,
  },
  {
    key: { tr: 'Çalışıyorum', en: 'Working on' } satisfies L,
    title: { tr: 'Bug bounty ve sızma testi', en: 'Bug bounty and pentesting' } satisfies L,
    text: {
      tr: 'Zafiyet avcılığı pratiklerimi sürdürüyor, web ve mobil hedeflerde sızma testi tarafında derinleşiyorum.',
      en: 'Keeping my bug hunting sharp and going deeper into penetration testing on web and mobile targets.',
    } satisfies L,
  },
  {
    key: { tr: 'Açığım', en: 'Open to' } satisfies L,
    title: { tr: 'Mobil ve full stack', en: 'Mobile and full stack' } satisfies L,
    text: {
      tr: 'Mobil geliştirme ve full stack tarafında tam zamanlı bir role açığım.',
      en: 'Looking for a full-time role in mobile development or full stack engineering.',
    } satisfies L,
  },
];

export const about = {
  paragraphs: {
    tr: [
      'React Native ile çapraz platform ürünler geliştirirken siber güvenlik alanındaki çalışmalarıma hız kesmeden devam ediyorum. Yazılım ve donanım tabanlı problemlere çok yönlü çözümler üretmeyi seviyorum — bir mobil arayüzden step motor sürücüsüne, bir CAD editöründen cihaz üzerinde çalışan RAG sistemine kadar.',
      'Hedefim; yenilikçi uygulamalar geliştirmeye devam ederken siber güvenlik disiplinlerinde derinleşmek ve kariyerimi bu iki alandaki birikimimle ileriye taşımak.',
    ],
    en: [
      'I build cross-platform products with React Native while keeping up my work in security without slowing down. I enjoy finding many-sided solutions to problems that span software and hardware — from a mobile interface to a stepper motor driver, from a CAD editor to a RAG system running entirely on device.',
      'My goal is to keep building products while going deeper into security, and to carry my career forward on what I have learned in both.',
    ],
  } satisfies LArr,
  facts: [
    {
      k: { tr: 'Konum', en: 'Location' } satisfies L,
      v: { tr: 'İstanbul, Türkiye', en: 'Istanbul, Türkiye' } satisfies L,
    },
    {
      k: { tr: 'Eğitim', en: 'Education' } satisfies L,
      v: {
        tr: 'Hitit Üniversitesi · Bilgisayar Mühendisliği',
        en: 'Hitit University · Computer Engineering',
      } satisfies L,
    },
    {
      k: { tr: 'Diller', en: 'Languages' } satisfies L,
      v: {
        tr: 'Türkçe · İngilizce (Upper intermediate)',
        en: 'Turkish · English (Upper intermediate)',
      } satisfies L,
    },
    {
      k: { tr: 'Odak', en: 'Focus' } satisfies L,
      v: {
        tr: 'Mobil, full stack, uygulama güvenliği',
        en: 'Mobile, full stack, application security',
      } satisfies L,
    },
    {
      k: { tr: 'Durum', en: 'Status' } satisfies L,
      v: { tr: 'Yeni fırsatlara açığım', en: 'Open to new opportunities' } satisfies L,
      live: true,
    },
  ],
};

export const education = {
  when: { tr: '2022 — 2026  ·  Çorum', en: '2022 — 2026  ·  Çorum' } satisfies L,
  school: { tr: 'Hitit Üniversitesi', en: 'Hitit University' } satisfies L,
  dept: {
    tr: 'Bilgisayar Mühendisliği · Lisans',
    en: 'Computer Engineering · BSc',
  } satisfies L,
  text: {
    tr: 'Lisans eğitimim boyunca IoT ve React Native teknolojileriyle mobil çözümler geliştirerek, ekip sinerjisiyle gerçek dünya problemlerini çözen ürünler ortaya çıkarmayı ilke edindim. Bitirme projem ALDOS, üç eksende konum takipli step motorlarla çalışan bir depo otomasyon sistemiydi.',
    en: 'Throughout my degree I built mobile solutions with IoT and React Native, making it a principle to ship products that solve real problems through team work. My graduation project, ALDOS, was a warehouse automation system driven by position-tracked stepper motors on three axes.',
  } satisfies L,
  gpa: '3.16',
  gpaLabel: { tr: 'Ortalama', en: 'GPA' } satisfies L,
};

export const contact = {
  heading: {
    tr: 'Birlikte bir şey <b>yapalım</b>',
    en: 'Let’s build <b>something</b>',
  } satisfies L,
  text: {
    tr: 'Mobil, full stack ya da güvenlik tarafında bir işin varsa yaz. En hızlı e-postadan dönüş yaparım.',
    en: 'If you have something on the mobile, full stack or security side, write to me. Email gets the fastest reply.',
  } satisfies L,
};
