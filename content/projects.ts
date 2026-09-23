import type { L, LArr } from './types';

export const CATS = ['mobil', 'web', 'ai', 'sistem'] as const;
export type Cat = (typeof CATS)[number];

export const catLabels: Record<Cat | 'all', L> = {
  all: { tr: 'Tümü', en: 'All' },
  mobil: { tr: 'Mobil', en: 'Mobile' },
  web: { tr: 'Web ve arayüz', en: 'Web and interfaces' },
  ai: { tr: 'Yapay zeka ve veri', en: 'AI and data' },
  sistem: { tr: 'Gömülü ve otomasyon', en: 'Embedded and automation' },
};

export type Project = {
  slug: string;
  title: string;
  /** Petek ızgarada öne çıkan altı projeden biri mi. */
  featured?: boolean;
  /** Arşiv ızgarasındaki kategorileri. Boşsa arşivde görünmez. */
  cats: Cat[];
  lang: { name: string; color: string };
  /** Arşiv kartının alt satırındaki teknoloji özeti. */
  stack: string;
  /** Arşiv kartındaki kısa açıklama. */
  short: L;
  /** Petek ızgaradaki küçük etiket. */
  tag?: L;
  /** Petek ızgarada görünen kapak. Yoksa desenli petek çizilir. */
  cover?: string;
  imgs?: string[];
  /** Detay penceresindeki uzun anlatım. Varsa proje detay sayfası açılır. */
  desc?: L;
  hi?: LArr;
  tech?: string[];
  note?: L;
  github?: string;
  /** Açık deposu yok: karta "depo özel" rozeti düşer, GitHub yerine detay açılır. */
  privateRepo?: boolean;
};

const g = (n: string) => `/gorsel/${n}`;

export const projects: Project[] = [
  {
    slug: 'starcad',
    title: 'StarCAD',
    featured: true,
    cats: ['web'],
    lang: { name: 'TypeScript', color: '#3178c6' },
    stack: 'React 19 · Three.js · Zustand',
    tag: { tr: 'Web · Three.js', en: 'Web · Three.js' },
    short: {
      tr: 'Tarayıcıda çalışan doğal gaz tesisat CAD editörü; 2B çizim, 3B ve otomatik izometrik görünüm, malzeme dökümlü PDF çıktısı.',
      en: 'A browser-based CAD editor for gas installations: 2D drafting, 3D and automatic isometric views, PDF output with a bill of materials.',
    },
    desc: {
      tr: 'React 19, TypeScript ve Three.js kullanarak tarayıcı üzerinde çalışan bir doğal gaz tesisat CAD editörü. Tekhnelogos stajı kapsamında, doğalgaz dağıtım ve plan çizim firmalarının ihtiyaçlarına göre geliştirildi. Çizim verisi saf JSON modeli olarak Zustand ile yönetilip MinIO üzerinde sürümlendi.',
      en: 'A CAD editor for natural gas installations that runs entirely in the browser, built with React 19, TypeScript and Three.js. Developed during my internship at Tekhnelogos around the needs of gas distribution and drafting companies. Drawing data is kept as a plain JSON model in Zustand and versioned on MinIO.',
    },
    hi: {
      tr: [
        '2B plan çizimi',
        '3B ve otomatik izometrik görünüm',
        'Boru, vana ve cihaz yerleşimi',
        'Tesisat doğrulama uyarıları',
        'Malzeme dökümlü PDF çıktısı',
      ],
      en: [
        '2D plan drafting',
        '3D and automatic isometric views',
        'Pipe, valve and device placement',
        'Installation validation warnings',
        'PDF export with a bill of materials',
      ],
    },
    tech: ['React 19', 'TypeScript', 'Three.js', 'Zustand', 'MinIO'],
    imgs: [],
    note: {
      tr: 'Ekran görüntüleri henüz eklenmedi.',
      en: 'Screenshots not added yet.',
    },
    github: 'https://github.com/Hud-Alfa/StarCAD',
  },
  {
    slug: 'aldos',
    title: 'ALDOS',
    featured: true,
    cats: ['mobil', 'web', 'sistem'],
    lang: { name: 'TypeScript', color: '#3178c6' },
    stack: 'React · Expo · Firebase',
    tag: { tr: 'IoT · Bitirme projesi', en: 'IoT · Graduation project' },
    cover: g('aldos.png'),
    short: {
      tr: 'Akıllı lojistik depo otomasyonu; QR ile konum doğrulama, üç eksende konum takipli step motorlar, web ve mobil istemci.',
      en: 'Smart warehouse automation: QR-based location verification, stepper motors tracked on three axes, web and mobile clients.',
    },
    desc: {
      tr: 'ALDOS (Akıllı Lojistik Depo Otomasyonu), bitirme tezi kapsamında geliştirilen bir depo yönetim sistemi. Amaç; depo operasyonlarını dijitalleştirmek, QR kodlarla kutu ve konum doğrulaması yapmak, görev sıralarını hem sahada hem ofiste yönetilebilir kılmak. Önceden öğrenilmiş konumlar üzerinden üç farklı eksende konum takipli step motorlarla eş zamanlı çalışır.',
      en: 'ALDOS (Smart Logistics Warehouse Automation) is a warehouse management system built as my graduation project. The goal was to digitise warehouse operations, verify boxes and locations through QR codes, and make task queues manageable both on the floor and in the office. It runs in sync with stepper motors tracked on three axes using pre-learned positions.',
    },
    hi: {
      tr: [
        'E-posta ve şifre ile giriş, hızlı erişim ve özet ekranları',
        'QR kod üretimi, listeleme ve kamera ile okutma',
        'Kutu görevlerinin sıralı işlenmesi',
        'Donanım verilerinin anlık takibi ve arayüze aktarımı',
        'Web ve mobil istemciler aynı Firebase projesiyle senkron',
      ],
      en: [
        'Email and password sign-in, quick access and summary screens',
        'QR code generation, listing and camera scanning',
        'Sequential processing of box tasks',
        'Live tracking of hardware data and relaying it to the interface',
        'Web and mobile clients in sync through one Firebase project',
      ],
    },
    tech: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Expo',
      'React Native',
      'Firebase Authentication',
      'Cloud Firestore',
      'Firebase Storage',
    ],
    imgs: [
      'aldos-06-web-arayuzu-1.png',
      'aldos-07-web-arayuzu-2.png',
      'aldos-08-depo-islem-ekrani.png',
      'aldos-01-ana-sayfa-navigasyon.png',
      'aldos-02-giris-sonrasi-ozet.png',
      'aldos-03-qr-kodlari-yonetimi.png',
      'aldos-04-qr-kod-okutma-kamera.png',
      'aldos-05-kutu-gorevleri-sirasi.png',
      'aldos-mobil-anasayfa.jpg',
      'aldos-mobil-qr-kodlari.jpg',
      'aldos-mobil-qr-okutma.jpg',
      'aldos-mobil-kutu-gorevleri-sirasi.jpg',
    ].map((f) => g(`aldos/${f}`)),
    github: 'https://github.com/Hud-Alfa/ALDOS',
  },
  {
    slug: 'not-lan',
    title: 'Not-LAN',
    featured: true,
    cats: ['mobil', 'web'],
    lang: { name: 'JavaScript', color: '#f1e05a' },
    stack: 'Expo · React Native · Firebase',
    tag: { tr: 'React Native · Firebase', en: 'React Native · Firebase' },
    cover: g('notlan.png'),
    short: {
      tr: 'Öğrenciler için not paylaşım ve mesajlaşma platformu; tek kod tabanından web, Android ve iOS.',
      en: 'A note sharing and messaging platform for students: web, Android and iOS from one codebase.',
    },
    desc: {
      tr: 'Not-LAN, öğrenciler ve geliştiriciler için tasarlanmış açık kaynaklı bir eğitim, not paylaşımı ve iletişim platformu. Ders notlarını ve materyalleri paylaşmak, arama ve kategorilerle düzenlemek, kullanıcılar arasında mesajlaşmayı aynı uygulama içinde sunmak amaçlandı. Expo ile tek kod tabanından Android, iOS ve masaüstü web tarayıcılarında ortak deneyim hedeflenir. MIT lisansıyla yayınlandı.',
      en: 'Not-LAN is an open source platform for study notes, sharing and communication, designed for students and developers. The aim was to share course notes and materials, organise them through search and categories, and keep messaging inside the same app. Expo delivers one shared experience on Android, iOS and desktop browsers from a single codebase. Released under the MIT licence.',
    },
    hi: {
      tr: [
        'Arama, kategorizasyon ve sıralama ile not listesi',
        'Başlık, açıklama, ders kategorisi ve medya ile içerik yükleme',
        'Mesajlaşma paneli ve geçmiş konuşmalar',
        'Hesap tercihleri ile oturum ve güvenlik ayarları',
      ],
      en: [
        'Note list with search, categorisation and sorting',
        'Uploading content with title, description, course category and media',
        'Messaging panel and past conversations',
        'Account preferences with session and security settings',
      ],
    },
    tech: [
      'Expo ~54',
      'React Native 0.81',
      'React 19',
      'React Native Web',
      'React Navigation',
      'Firebase Authentication',
      'Cloud Firestore',
      'Cloud Storage',
      'Async Storage',
    ],
    imgs: [
      'notlan-web-01-notlar-listesi.png',
      'notlan-web-02-not-detay.png',
      'notlan-web-03-icerik-arama.png',
      'notlan-web-04-sohbetler.png',
      'notlan-web-05-sohbet-oturumu.png',
      'notlan-web-06-not-paylasma.png',
      'notlan-web-07-ayarlar.png',
      'notlan-mobil-anasayfa-notlar.jpg',
      'notlan-mobil-not-detay.jpg',
      'notlan-mobil-not-paylasma.jpg',
      'notlan-mobil-sohbetler.jpg',
      'notlan-mobil-sohbet-arama.jpg',
      'notlan-mobil-profil.jpg',
      'notlan-mobil-ayarlar.jpg',
    ].map((f) => g(`not-lan/${f}`)),
    github: 'https://github.com/Hud-Alfa/Not-LAN',
  },
  {
    slug: 'su-vakti',
    title: 'Su-Vakti',
    featured: true,
    cats: ['mobil'],
    lang: { name: 'Kotlin', color: '#A97BFF' },
    stack: 'Jetpack Compose · WorkManager',
    tag: { tr: 'Kotlin · Jetpack Compose', en: 'Kotlin · Jetpack Compose' },
    cover: g('suvakti.jpg'),
    short: {
      tr: 'Günlük su tüketimi takibi; dakika bazlı hatırlatıcılar, sessiz saatler, ana ekran widget’ı ve koyu tema.',
      en: 'Daily water tracking: minute-based reminders, quiet hours, a home screen widget and a dark theme.',
    },
    desc: {
      tr: 'Su Vakti, günlük su tüketimini takip etmenizi ve belirlediğiniz aralıklarla hatırlatıcı bildirimler almanızı sağlayan bir Android uygulaması. Amaç; hedeflenen içme suyu miktarına ulaşmayı kolaylaştırmak ve düzenli hidrasyon alışkanlığı oluşturmak. MIT lisansıyla yayınlandı.',
      en: 'Su Vakti is an Android app that tracks daily water intake and sends reminder notifications at intervals you choose. The goal is to make reaching a daily target easier and to build a steady hydration habit. Released under the MIT licence.',
    },
    hi: {
      tr: [
        'Günlük su hedefi belirleme',
        'Farklı bardak boyutları veya özel ml girişiyle tek dokunuşla ekleme',
        '30–240 dakika arası bildirim aralığı ve sessiz saatler',
        'Günlük otomatik sıfırlama saati',
        'Ana ekran widget’ı, açık ve koyu tema',
      ],
      en: [
        'Setting a daily water target',
        'One-tap logging with preset glass sizes or a custom amount in ml',
        'Reminder intervals from 30 to 240 minutes, plus quiet hours',
        'Automatic daily reset at a chosen hour',
        'Home screen widget, light and dark themes',
      ],
    },
    tech: [
      'Kotlin',
      'Android · min API 23 / SDK 35',
      'Jetpack Compose',
      'Material 3',
      'AndroidX DataStore',
      'WorkManager',
      'AlarmManager',
      'Foreground service',
      'Lottie Compose',
    ],
    imgs: [
      'suvakti-06-widget.jpg',
      'suvakti-01-giris-ekrani.jpg',
      'suvakti-02-hedef-belirleme.jpg',
      'suvakti-03-takip-ekrani.jpg',
      'suvakti-04-bildirim-ornegi.jpg',
      'suvakti-05-hatirlatici-koyu-tema.jpg',
    ].map((f) => g(`su-vakti/${f}`)),
    github: 'https://github.com/Hud-Alfa/Su-Vakti',
  },
  {
    slug: 'kolon-kanseri-tespiti',
    title: 'Kolon Kanseri Tespiti',
    featured: true,
    cats: ['ai'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'CNN · ResNet50',
    tag: { tr: 'Derin öğrenme', en: 'Deep learning' },
    short: {
      tr: 'Patolojik görüntülerden kolon kanseri tespiti; temel CNN mimarisi ve ResNet50 ile transfer öğrenme karşılaştırması.',
      en: 'Colon cancer detection from pathology images: a baseline CNN compared against transfer learning with ResNet50.',
    },
    desc: {
      tr: 'Patolojik verileri analiz ederek kolon kanseri hücrelerini tespit etmek amacıyla Python ile geliştirilen derin öğrenme modelleri. Temel bir CNN mimarisi ile transfer öğrenme yaklaşımı karşılaştırıldı ve modellerin performans ile doğruluk oranları raporlandı.',
      en: 'Deep learning models built in Python to detect colon cancer cells by analysing pathology data. A baseline CNN architecture was compared against a transfer learning approach, and the performance and accuracy of both was reported.',
    },
    hi: {
      tr: [
        'Temel CNN mimarisi',
        'ResNet50 ile transfer öğrenme',
        'Performans ve doğruluk oranlarının raporlanması',
      ],
      en: [
        'Baseline CNN architecture',
        'Transfer learning with ResNet50',
        'Reporting of performance and accuracy figures',
      ],
    },
    tech: ['Python', 'CNN', 'ResNet50', 'Transfer learning'],
    imgs: [],
    note: {
      tr: 'Ekran görüntüleri henüz eklenmedi.',
      en: 'Screenshots not added yet.',
    },
    github: 'https://github.com/Hud-Alfa/colon-cancer-detection',
  },
  {
    slug: 'begbegdm',
    title: 'BegBegDm',
    featured: true,
    cats: ['sistem'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'Meta Graph API · Webhook',
    tag: { tr: 'Python · Meta Graph API', en: 'Python · Meta Graph API' },
    privateRepo: true,
    short: {
      tr: 'Instagram doğrudan mesaj akışlarını kural tabanlı algoritmalarla anlık yöneten otomasyon; gelen mesajları analiz edip otomatik yanıtlıyor.',
      en: 'Automation that handles Instagram direct message flows in real time with rule-based logic, analysing incoming messages and replying automatically.',
    },
    desc: {
      tr: 'Meta Graph API ve Webhook entegrasyonları temel alınarak Python ile geliştirilen, Instagram doğrudan mesaj akışlarını anlık olarak yöneten bir otomasyon. Gelen mesajlar kural tabanlı algoritmalarla analiz edilip otomatik yanıtlanarak iş yükü azaltıldı ve etkileşim hızı artırıldı.',
      en: 'An automation built in Python on top of the Meta Graph API and webhooks that manages Instagram direct message flows in real time. Incoming messages are analysed with rule-based logic and answered automatically, cutting manual workload and speeding up responses.',
    },
    hi: {
      tr: [
        'Gelen mesajların kural tabanlı analizi',
        'Otomatik yanıtlama ile iş yükünün azaltılması',
        'Webhook ile anlık mesaj akışı',
      ],
      en: [
        'Rule-based analysis of incoming messages',
        'Automatic replies that cut manual workload',
        'Real-time message flow through webhooks',
      ],
    },
    tech: ['Python', 'Meta Graph API', 'Webhook'],
    imgs: [],
    note: {
      tr: 'Depo özel; ekran görüntüleri henüz eklenmedi.',
      en: 'Private repository; screenshots not added yet.',
    },
  },
  {
    slug: 'local-foundry-rag',
    title: 'local-foundry-rag',
    cats: ['ai'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'Embedding · SQLite',
    short: {
      tr: 'İnternet bağlantısı olmadan, tamamen cihaz üzerinde çalışan RAG uygulaması; SQLite tabanlı vektör deposu.',
      en: 'A RAG application that runs fully on device with no internet connection, backed by a SQLite vector store.',
    },
    github: 'https://github.com/Hud-Alfa/local-foundry-rag',
  },
  {
    slug: 'ev-fiyat-tahmini',
    title: 'ev-fiyat-tahmini',
    cats: ['ai'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'Regresyon · Veri ön işleme',
    short: {
      tr: 'Konut verileriyle fiyat tahmini; öznitelik mühendisliği ve regresyon modellerinin karşılaştırılması.',
      en: 'House price prediction: feature engineering and a comparison of regression models.',
    },
    github: 'https://github.com/Hud-Alfa/ev-fiyat-tahmini',
  },
  {
    slug: 'musteri-ayrilma-talebi',
    title: 'musteri-ayrilma-talebi',
    cats: ['ai'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'Sınıflandırma · Model değerlendirme',
    short: {
      tr: 'Müşteri kaybı tahmini; sınıflandırma modelleri ve başarı metriklerinin raporlanması.',
      en: 'Customer churn prediction: classification models and reporting of success metrics.',
    },
    github: 'https://github.com/Hud-Alfa/musteri-ayrilma-talebi',
  },
  {
    slug: 'fetih-mimarlik',
    title: 'fetih_mimarlik',
    cats: ['web'],
    lang: { name: 'TypeScript', color: '#3178c6' },
    stack: 'Next.js 15 · Tailwind',
    short: {
      tr: 'Mimarlık ofisi için kurumsal web arayüzü; hareketli geçişler ve proje vitrini.',
      en: 'A corporate web interface for an architecture studio, with motion transitions and a project showcase.',
    },
    github: 'https://github.com/Hud-Alfa/fetih_mimarlik',
  },
  {
    slug: 'ultimate-pdf-suite',
    title: 'ultimate-pdf-suite',
    cats: ['sistem'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'PyQt6 · Masaüstü',
    short: {
      tr: 'PDF birleştirme, bölme ve dönüştürme işlemlerini tek arayüzde toplayan masaüstü aracı.',
      en: 'A desktop tool that brings PDF merging, splitting and conversion together in one interface.',
    },
    github: 'https://github.com/Hud-Alfa/ultimate-pdf-suite',
  },
];

export const featured = projects.filter((p) => p.featured);
export const archive = projects.filter((p) => p.cats.length > 0);
export const bySlug = (slug: string) => projects.find((p) => p.slug === slug);
export const hasDetail = (p: Project) => Boolean(p.desc);
