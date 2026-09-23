# hudalfa_portfolio

Yasir Hüdalfa Özdaş — kişisel portföy sitesi.

Next.js 16 (App Router) ve TypeScript ile yazıldı. Türkçe ve İngilizce olarak yayınlanıyor, iki dil de derleme anında statik üretiliyor.

## Çalıştırma

```bash
npm install
npm run dev
```

`http://localhost:3000` adresi `/tr` sayfasına yönlenir.

## Yapı

```
app/[lang]/          dile göre yerleşim ve sayfa
app/api/spotify/     Spotify uç noktası
components/          arayüz bileşenleri
content/             tüm metinler, TR ve EN yan yana
lib/github.ts        açık depo sayısı
public/gorsel/       proje ekran görüntüleri
scripts/             Spotify yetkilendirme betiği
```

Metinleri değiştirmek için bileşenlere girmeye gerek yok; `content/` altındaki dosyalarda her metnin `tr` ve `en` karşılığı yan yana duruyor.

## Ortam değişkenleri

`.env.example` dosyasını `.env.local` olarak kopyala ve doldur.

| Değişken | Ne işe yarar |
| --- | --- |
| `SPOTIFY_CLIENT_ID` | Hero'daki "son dinlediğim" rozeti |
| `SPOTIFY_CLIENT_SECRET` | Aynı rozet |
| `SPOTIFY_REFRESH_TOKEN` | `npm run spotify:auth` ile alınır |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | İletişim formu |
| `GITHUB_TOKEN` | Zorunlu değil; GitHub API hız sınırını yükseltir |

### Spotify rozeti

1. [Spotify Dashboard](https://developer.spotify.com/dashboard) üzerinde bir uygulama oluştur.
2. Redirect URI olarak `http://127.0.0.1:8888/callback` ekle.
3. Client ID ve secret'ı `.env.local` dosyasına yaz.
4. `npm run spotify:auth` çalıştır; betik refresh token'ı alıp aynı dosyaya yazar.

Uç nokta access token'ı süresi dolana dek, şarkı bilgisini 20 saniye önbellekte tutar. Kimlik bilgileri yoksa rozet sessizce gizlenir.

## Lisans

Kod MIT lisanslıdır. Metinler, fotoğraf ve proje görselleri kişisel içeriktir, kapsam dışıdır.
