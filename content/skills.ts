import type { L } from './types';

/** Teknoloji adları çevrilmez (string), Türkçe terimler çevrilir (L). */
export type Skill = { name: string | L; tip: L };
export type SkillGroup = { label: L; items: Skill[] };

export const skills: SkillGroup[] = [
  {
    label: { tr: 'Diller', en: 'Languages' },
    items: [
      {
        name: 'Python',
        tip: {
          tr: 'Betik, veri işleme ve otomasyon için sık kullandığım çok yönlü bir dil.',
          en: 'A versatile language I reach for in scripting, data processing and automation.',
        },
      },
      {
        name: 'C#',
        tip: {
          tr: '.NET ekosisteminde masaüstü ve uygulama geliştirme için başvurduğum ana dil.',
          en: 'My main language for desktop and application development in the .NET ecosystem.',
        },
      },
      {
        name: 'JavaScript',
        tip: {
          tr: 'Tarayıcıda ve sunucuda çalışan arayüzlerin ve servislerin temelini kurduğum dil.',
          en: 'The language I build interfaces and services on, in the browser and on the server.',
        },
      },
      {
        name: 'TypeScript',
        tip: {
          tr: 'JavaScript’e tip güvenliği katarak daha sürdürülebilir istemci ve servis kodu yazıyorum.',
          en: 'Adding type safety to JavaScript so client and service code stays maintainable.',
        },
      },
      {
        name: 'Kotlin',
        tip: {
          tr: 'Android tarafında native uygulamalar geliştirirken kullandığım modern dil.',
          en: 'The modern language I use when building native Android applications.',
        },
      },
    ],
  },
  {
    label: { tr: 'Framework', en: 'Frameworks' },
    items: [
      {
        name: 'React Native',
        tip: {
          tr: 'Tek kod tabanıyla iOS ve Android için çapraz platform arayüz ve bileşenler geliştiriyorum.',
          en: 'Building cross-platform interfaces and components for iOS and Android from one codebase.',
        },
      },
      {
        name: 'Expo',
        tip: {
          tr: 'React Native projelerini hızlı kurmak, cihaz modüllerine erişmek ve dağıtmak için kullanıyorum.',
          en: 'Used to spin up React Native projects quickly, reach device modules and ship them.',
        },
      },
      {
        name: 'React',
        tip: {
          tr: 'Bileşen tabanlı arayüzleri durum yönetimiyle birlikte kurguluyorum.',
          en: 'Designing component-based interfaces together with their state management.',
        },
      },
      {
        name: 'Next.js',
        tip: {
          tr: 'Sunucu tarafı render ve dosya tabanlı yönlendirmeyle üretim seviyesinde web uygulamaları yazıyorum.',
          en: 'Writing production web applications with server rendering and file-based routing.',
        },
      },
      {
        name: 'Three.js',
        tip: {
          tr: 'Tarayıcıda 3B sahne, kamera ve geometri yönetimiyle görselleştirme yapıyorum.',
          en: 'Visualising in the browser through 3D scenes, cameras and geometry.',
        },
      },
    ],
  },
  {
    label: { tr: 'Veri tabanı', en: 'Databases' },
    items: [
      {
        name: 'SQL Server',
        tip: {
          tr: 'İlişkisel veri modelleme ve sorgu optimizasyonu üzerinde çalışıyorum.',
          en: 'Working on relational data modelling and query optimisation.',
        },
      },
      {
        name: 'MySQL',
        tip: {
          tr: 'Web uygulamaları için ilişkisel şema tasarlayıp sorguları yönetiyorum.',
          en: 'Designing relational schemas for web applications and managing their queries.',
        },
      },
      {
        name: 'Firebase',
        tip: {
          tr: 'Kimlik doğrulama, gerçek zamanlı veri ve dosya depolama ihtiyaçlarını tek çatıda çözüyorum.',
          en: 'Solving authentication, realtime data and file storage needs under one roof.',
        },
      },
    ],
  },
  {
    label: { tr: 'Siber güvenlik', en: 'Security' },
    items: [
      {
        name: { tr: 'Sızma testi', en: 'Penetration testing' },
        tip: {
          tr: 'Sistemleri saldırgan bakış açısıyla test edip zayıf noktaları raporluyorum.',
          en: 'Testing systems from an attacker’s point of view and reporting the weak spots.',
        },
      },
      {
        name: 'Bug bounty',
        tip: {
          tr: 'Gerçek hedeflerde zafiyet avcılığı yaparak pratiğimi canlı tutuyorum.',
          en: 'Hunting vulnerabilities on real targets to keep my practice sharp.',
        },
      },
      {
        name: { tr: 'Bulut güvenliği', en: 'Cloud security' },
        tip: {
          tr: 'Bulut mimarilerinde yapılandırma hatalarını ve erişim risklerini değerlendiriyorum.',
          en: 'Assessing misconfigurations and access risks in cloud architectures.',
        },
      },
      {
        name: { tr: 'Zafiyet analizi', en: 'Vulnerability analysis' },
        tip: {
          tr: 'Bulunan açıkları etki ve sömürülebilirlik açısından sınıflandırıyorum.',
          en: 'Classifying findings by impact and exploitability.',
        },
      },
      {
        name: 'Kali Linux',
        tip: {
          tr: 'Güvenlik testleri ve penetrasyon araçları için yaygın kullanılan bu dağıtımda pratik yapıyorum.',
          en: 'Practising on the distribution most widely used for security testing tooling.',
        },
      },
    ],
  },
  {
    label: { tr: 'Gömülü ve yapay zeka', en: 'Embedded and AI' },
    items: [
      {
        name: 'Raspberry Pi',
        tip: {
          tr: 'Küçük kartlar üzerinde sensör ve motor sürücüleriyle çalışan prototipler kuruyorum.',
          en: 'Building prototypes on small boards driven by sensors and motor drivers.',
        },
      },
      {
        name: 'IoT',
        tip: {
          tr: 'Cihazları ağa bağlayıp sensör verisini yazılımla birleştiren gömülü ve ağlı sistemler.',
          en: 'Networked embedded systems that connect devices and join sensor data to software.',
        },
      },
      {
        name: { tr: 'Derin öğrenme', en: 'Deep learning' },
        tip: {
          tr: 'Çok katmanlı ağlarla desen tanıma, sınıflandırma ve tahmin modelleri üzerine odaklanıyorum.',
          en: 'Focusing on pattern recognition, classification and prediction with multi-layer networks.',
        },
      },
      {
        name: 'RAG',
        tip: {
          tr: 'Belgeleri vektörleştirip benzerlik aramasıyla modele bağlam sunan sistemler kuruyorum.',
          en: 'Building systems that vectorise documents and feed the model context through similarity search.',
        },
      },
      {
        name: { tr: 'Görüntü işleme', en: 'Image processing' },
        tip: {
          tr: 'Piksel düzeyinde dönüşümler ve bilgisayarlı görü yöntemleriyle görüntüden bilgi çıkarıyorum.',
          en: 'Extracting information from images through pixel-level transforms and computer vision.',
        },
      },
    ],
  },
  {
    label: { tr: 'Araçlar ve dağıtım', en: 'Tooling and delivery' },
    items: [
      {
        name: 'Git',
        tip: {
          tr: 'Sürüm kontrolü, dallanma ve birleştirme ile kod geçmişini düzenli ve izlenebilir tutuyorum.',
          en: 'Keeping history tidy and traceable through version control, branching and merging.',
        },
      },
      {
        name: 'Docker',
        tip: {
          tr: 'Uygulamaları bağımlılıklarıyla birlikte konteynerleyip her ortamda aynı şekilde çalışmasını sağlıyorum.',
          en: 'Containerising applications with their dependencies so they run the same everywhere.',
        },
      },
      {
        name: 'Portainer',
        tip: {
          tr: 'Konteynerleri, imajları ve birimleri tek arayüzden yönetip sunucudaki servisleri izliyorum.',
          en: 'Managing containers, images and volumes from one interface and watching services on the server.',
        },
      },
      {
        name: 'REST API',
        tip: {
          tr: 'HTTP üzerinden kaynakları standart uç noktalarla sunarak istemci-sunucu iletişimini kurguluyorum.',
          en: 'Shaping client-server communication by exposing resources over standard HTTP endpoints.',
        },
      },
      {
        name: { tr: 'Veri analizi', en: 'Data analysis' },
        tip: {
          tr: 'Ham veriyi temizleyip özetleyerek anlamlı içgörülere ulaşma süreçleri üzerinde çalışıyorum.',
          en: 'Cleaning and summarising raw data to reach insights that mean something.',
        },
      },
    ],
  },
];
