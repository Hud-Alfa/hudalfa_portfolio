import type { L, LArr } from './types';

export type Certificate = {
  name: string;
  org: L;
  when: L;
  /** Kısa tarih — HUD satırının sağındaki etiket. */
  whenShort: L;
  url: string;
  gains: LArr;
};

export const certificates: Certificate[] = [
  {
    name: 'Machine Learning Bootcamp',
    org: {
      tr: 'Huawei & Türkiye Yapay Zeka Akademisi',
      en: 'Huawei & Turkish Artificial Intelligence Academy',
    },
    when: { tr: 'Ağustos 2026', en: 'August 2026' },
    whenShort: { tr: 'Ağu 2026', en: 'Aug 2026' },
    url: 'https://drive.google.com/file/d/19EMu7hJY1FdHjTM9SQ0WiOLBpGKqaCw-/view',
    gains: {
      tr: [
        'Veri bilimi',
        'Makine öğrenmesi algoritmaları',
        'Veri ön işleme ve modelleme',
        'Uygulamalı model geliştirme',
      ],
      en: [
        'Data science',
        'Machine learning algorithms',
        'Data preprocessing and modelling',
        'Hands-on model development',
      ],
    },
  },
  {
    name: 'Cybersecurity Bootcamp',
    org: { tr: 'Huawei — Cloud Metrik', en: 'Huawei — Cloud Metrik' },
    when: { tr: 'Temmuz 2026', en: 'July 2026' },
    whenShort: { tr: 'Tem 2026', en: 'Jul 2026' },
    url: 'https://drive.google.com/file/d/1ca02N6BPu-H48fhZr6C-dEds9RZF1hAL/view',
    gains: {
      tr: [
        'Güvenli bulut mimarisi',
        'Zafiyet analizi',
        'Proaktif savunma',
        'Uygulamalı tehdit analizi',
      ],
      en: [
        'Secure cloud architecture',
        'Vulnerability analysis',
        'Proactive defence',
        'Hands-on threat analysis',
      ],
    },
  },
  {
    name: 'Siber Vatan',
    org: {
      tr: 'T.C. Sanayi ve Teknoloji Bakanlığı',
      en: 'Republic of Türkiye, Ministry of Industry and Technology',
    },
    when: { tr: 'Haziran 2026', en: 'June 2026' },
    whenShort: { tr: 'Haz 2026', en: 'Jun 2026' },
    url: 'https://drdogrulama.sanayi.gov.tr/tr/verify/26107588564917/',
    gains: {
      tr: ['Sızma testleri', 'Linux', 'Ağ güvenliği', 'Pasif ve aktif veri toplama'],
      en: ['Penetration testing', 'Linux', 'Network security', 'Passive and active reconnaissance'],
    },
  },
  {
    name: 'Güvenli Mobil Uygulama Geliştirme',
    org: { tr: 'Siber Kulüpler Birliği', en: 'Union of Cyber Clubs' },
    when: { tr: 'Eylül 2025', en: 'September 2025' },
    whenShort: { tr: 'Eyl 2025', en: 'Sep 2025' },
    url: 'https://siberkulupler.com/cert/SKB-2025-E47WT',
    gains: {
      tr: ['Mobil zafiyetler', 'Tersine mühendislik', 'Kaynak kod analizi'],
      en: ['Mobile vulnerabilities', 'Reverse engineering', 'Source code analysis'],
    },
  },
  {
    name: 'IBM ile Kodluyoruz: CyberStart',
    org: { tr: 'IBM SkillsBuild', en: 'IBM SkillsBuild' },
    when: { tr: 'Ekim 2024', en: 'October 2024' },
    whenShort: { tr: 'Eki 2024', en: 'Oct 2024' },
    url: 'https://verified.sertifier.com/tr/verify/24912829667879/',
    gains: {
      tr: ['Bilgi güvenliği', 'Tehdit istihbaratı', 'Kriptoloji temelleri'],
      en: ['Information security', 'Threat intelligence', 'Cryptography fundamentals'],
    },
  },
];
