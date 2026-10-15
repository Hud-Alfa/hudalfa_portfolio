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
  /** Yayında olan ürün adresi. Detay penceresinde ayrı bir düğme olarak çıkar. */
  live?: string;
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
    stack: 'React · Three.js · ASP.NET Core',
    tag: { tr: 'Full stack · Three.js', en: 'Full stack · Three.js' },
    cover: g('starcad/starcad-02-3b-gorunum.png'),
    short: {
      tr: 'Tarayıcıda çalışan doğal gaz tesisat CAD editörü; 2B çizim, 3B ve izometrik görünüm, proje onay akışı ve yönetici paneli.',
      en: 'A browser-based CAD editor for gas installations: 2D drafting, 3D and isometric views, a project approval flow and an admin panel.',
    },
    desc: {
      tr: 'Tarayıcı üzerinde çalışan bir doğal gaz tesisat CAD editörü ve çevresindeki proje yönetim platformu. Tekhnelogos stajı kapsamında, doğalgaz dağıtım ve plan çizim firmalarının ihtiyaçlarına göre geliştirildi. İki uygulamadan oluşuyor: React ve Three.js ile yazılmış çizim istemcisi ile katmanlı mimariye oturan bir ASP.NET Core API. Tesisatçı planı kat kat çiziyor, cihazları ve kotları yerleştiriyor, aynı çizimi 3B ve izometrik olarak görüyor; gaz dağıtım firması ise projeyi evrakları ve poliçesiyle birlikte inceleyip onaylıyor ya da reddediyor. Çizim verisi saf JSON modeli olarak Zustand ile yönetiliyor, dosyalar MinIO üzerinde sürümleniyor.',
      en: 'A browser-based CAD editor for natural gas installations, together with the project management platform around it. Built during my internship at Tekhnelogos around the needs of gas distribution and drafting companies. It is two applications: a drawing client written in React and Three.js, and an ASP.NET Core API built on a layered architecture. The installer drafts the plan floor by floor, places appliances and elevations and sees the same drawing in 3D and isometric; the distribution company then reviews the project with its documents and insurance policy and approves or rejects it. Drawing data is kept as a plain JSON model in Zustand, and files are versioned on MinIO.',
    },
    hi: {
      tr: [
        'Kat kat 2B plan çizimi, katman ve ızgara yönetimi',
        'Boru, vana, kombi ve ocak yerleşimi; kot girişiyle yükseklik tanımlama',
        'Aynı çizimin 3B ve otomatik izometrik görünümü; izometride eğim ve dönüş açısı denetimi',
        'Boru çapı, debi ve kot etiketlerinin çizim üzerinde gösterimi',
        'Hata kontrolleri ile tesisat doğrulama uyarıları',
        'Sınırsız geri al ve ileri al desteği',
        'Projenin gaz dağıtım firmasına gönderilip onaylanması veya reddedilmesi',
        'Evrak ve poliçe takibi, proje işlem geçmişi, çizimden üretilen PDF çıktısı',
        'Gaz dağıtım firmaları, proje firmaları ve kullanıcıları yöneten yönetici paneli',
      ],
      en: [
        'Floor-by-floor 2D drafting with layer and grid control',
        'Placing pipes, valves, boilers and cookers; defining heights through elevation input',
        'The same drawing in 3D and automatic isometric, with pitch and rotation control',
        'Pipe diameter, flow rate and elevation labels drawn on the plan',
        'Validation warnings through built-in error checks',
        'Unlimited undo and redo',
        'Submitting a project to the distribution company for approval or rejection',
        'Document and insurance policy tracking, project history, PDF generated from the drawing',
        'Admin panel managing distribution companies, drafting firms and their users',
      ],
    },
    tech: [
      'React 19',
      'TypeScript',
      'Vite',
      'Three.js',
      'React Three Fiber',
      'Zustand',
      'TanStack Query',
      'Tailwind CSS',
      'jsPDF',
      'ASP.NET Core (.NET 10)',
      'Entity Framework Core',
      'SQL Server',
      'MinIO',
      'Redis',
      'Elasticsearch',
      'Serilog',
      'Docker',
    ],
    imgs: [
      'starcad-01-plan.png',
      'starcad-02-3b-gorunum.png',
      'starcad-03-izometrik.png',
      'starcad-04-kot-araci.png',
      'starcad-05-proje-onay.png',
      'starcad-06-yonetici-paneli.png',
    ].map((f) => g(`starcad/${f}`)),
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
    live: 'https://begbegdm.vercel.app',
    cover: g('begbegdm/begbegdm-01-anasayfa.png'),
    short: {
      tr: 'Instagram yorumlarına otomatik DM gönderen çok kullanıcılı ürün; anahtar kelime kuralları, butonlu mesajlar ve yönetim paneli.',
      en: 'A multi-tenant product that auto-replies to Instagram comments by DM: keyword rules, messages with buttons, and an admin panel.',
    },
    desc: {
      tr: 'Meta Graph API ve Webhook entegrasyonları üzerine kurulu, Instagram yorumlarına saniyeler içinde otomatik DM gönderen çok kullanıcılı bir ürün. Kullanıcılar Instagram ile giriş yapıp kendi gönderileri için kural tanımlıyor: belirli anahtar kelimeler yakalandığında ya da her yoruma, altında dokunulabilir bağlantı butonu olan bir DM gidiyor. Gelen yorumlar kural tabanlı algoritmalarla analiz edilip otomatik yanıtlanarak iş yükü azaltıldı ve etkileşim hızı artırıldı.',
      en: 'A multi-tenant product built on the Meta Graph API and webhooks that answers Instagram comments with a direct message within seconds. Users sign in with Instagram and define rules for their own posts: when specific keywords appear — or on every comment — a DM goes out with a tappable link button underneath. Incoming comments are analysed with rule-based logic and answered automatically, cutting manual workload and speeding up engagement.',
    },
    hi: {
      tr: [
        'Instagram ile giriş ve gönderi başına otomasyon tanımlama',
        'Anahtar kelime kuralları; Türkçe karakter ve büyük-küçük harf farkı gözetmez',
        'Mesaj altında bağlantı butonu ve tıklanma sayısının takibi',
        'Bağlantıyı yalnızca takip edenlere verme seçeneği',
        'Gönderi başına yakalanan yorum, giden DM ve başarısız gönderim istatistikleri',
        'Abonelik durumları, ödemeler ve DM kuyruğunu gösteren yönetim paneli',
        'Hesabı ve tüm verileri kullanıcının kendisinin silebilmesi',
      ],
      en: [
        'Instagram sign-in and per-post automation rules',
        'Keyword rules that ignore case and Turkish character differences',
        'A link button under the message, with click tracking',
        'Option to share the link only with followers',
        'Per-post stats: comments caught, DMs sent, deliveries failed',
        'Admin panel covering subscription states, payments and the DM queue',
        'Self-service account and data deletion',
      ],
    },
    tech: ['Python', 'Meta Graph API', 'Webhook', 'Vercel'],
    imgs: [
      'begbegdm-01-anasayfa.png',
      'begbegdm-02-panel.png',
      'begbegdm-03-otomasyon-ayarlari.png',
      'begbegdm-04-admin-paneli.png',
    ].map((f) => g(`begbegdm/${f}`)),
    note: {
      tr: 'Ürün şu anda test aşamasında; yalnızca test kullanıcıları giriş yapabiliyor. Deposu özel tutuluyor.',
      en: 'The product is currently in testing; only test users can sign in. Its repository is kept private.',
    },
  },
  {
    slug: 'sekme',
    title: 'Sekme',
    cats: ['mobil'],
    lang: { name: 'TypeScript', color: '#3178c6' },
    stack: 'Expo · Reanimated · SQLite',
    short: {
      tr: 'Sonsuz top-blok mobil oyunu: bölüm ve can yok, zorluk ilerlemeye bağlı bir eğriden doğuyor, toplar yalnızca görünüm değiştiriyor.',
      en: 'An endless ball-and-block mobile game: no levels or lives, difficulty grows from a progression curve, and the balls are cosmetic only.',
    },
    github: 'https://github.com/Hud-Alfa/sekme',
  },
  {
    slug: 'alphenix-voice-assistant',
    title: 'Alphenix',
    cats: ['ai', 'sistem'],
    lang: { name: 'Python', color: '#3572A5' },
    stack: 'Python · asyncio · Ollama',
    short: {
      tr: 'Windows için sesle çalışan kişisel yapay zeka asistanı; uygulamaları, dosyaları ve tarayıcıyı yönetiyor, riskli her işlemde izin soruyor.',
      en: 'A voice-first personal AI assistant for Windows that drives apps, files and the browser, and asks permission before anything risky.',
    },
    github: 'https://github.com/Hud-Alfa/alphenix-voice-assistant',
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
