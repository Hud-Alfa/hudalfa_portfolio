// Sayfa kaydırma kilidi. Pencereler üst üste açılabildiği için (asistan → proje)
// kilit, açık pencere sayısı sıfıra inince kalkıyor.
let acik = 0;

export function kilitle() {
  acik += 1;
  document.body.classList.add('lock');
}

export function kilitAc() {
  acik = Math.max(0, acik - 1);
  if (acik === 0) document.body.classList.remove('lock');
}
