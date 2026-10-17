import { ara } from '../lib/bilgi';
const sorular: [string, 'tr' | 'en'][] = [
  ['Nerede okudu?', 'tr'],
  ['Hangi stajları yaptı?', 'tr'],
  ['StarCAD hangi teknolojilerle yapıldı?', 'tr'],
  ['Siber güvenlikte neler yapıyor?', 'tr'],
  ['React Native biliyor mu?', 'tr'],
  ['Microsoft stajında ne yaptı?', 'tr'],
  ['Nasıl iletişime geçerim?', 'tr'],
  ['Şu sıralar ne üzerinde çalışıyor?', 'tr'],
  ['Which certificates does he have?', 'en'],
  ['Tell me about his graduation project', 'en'],
];
for (const [s, l] of sorular) {
  const r = ara(s, l, 3).map((x) => `${x.parca.id}(${x.puan.toFixed(1)})`);
  console.log(`${s.padEnd(42)} -> ${r.join('  ') || '(eşleşme yok)'}`);
}
