import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

type Track = {
  name: string;
  artists?: { name: string }[];
  album?: { images?: { url: string; width: number }[] };
  external_urls?: { spotify?: string };
  uri?: string;
};

type Payload = {
  playing: boolean;
  title: string;
  url: string | null;
  uri: string | null;
  cover: string | null;
};

const EMPTY: Payload = { playing: false, title: '', url: null, uri: null, cover: null };

/** Yalnızca yerel geliştirmede, SPOTIFY_DEMO=1 ile kullanılır. */
const DEMO: Payload = {
  playing: false,
  title: 'Mor ve Ötesi — Cambaz',
  url: 'https://open.spotify.com/track/4PTG3Z6ehGkBFwjybzWkR8',
  uri: 'spotify:track:4PTG3Z6ehGkBFwjybzWkR8',
  cover: null,
};

/**
 * Sunucu tarafı önbellek. Vercel'de örnekler yeniden kullanıldığı için
 * modül düzeyindeki bu değerler istekler arasında yaşar; kaç ziyaretçi olursa
 * olsun Spotify'a giden çağrı sayısı sabit kalır.
 */
let tokenCache: { value: string; expires: number } | null = null;
let dataCache: { value: Payload; at: number } | null = null;

/** Access token bir saat geçerli; bitmesine bir dakika kala yenilenir. */
async function accessToken(): Promise<string | null> {
  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  const refresh = process.env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;

  if (tokenCache && tokenCache.expires > Date.now()) return tokenCache.value;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + Buffer.from(`${id}:${secret}`).toString('base64'),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: refresh }),
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json = (await res.json()) as { access_token?: string; expires_in?: number };
  if (!json.access_token) return null;

  const ttl = (json.expires_in ?? 3600) - 60;
  tokenCache = { value: json.access_token, expires: Date.now() + ttl * 1000 };
  return json.access_token;
}

function shape(track: Track | undefined, playing: boolean): Payload {
  if (!track?.name) return EMPTY;
  const artists = (track.artists ?? []).map((a) => a.name).join(', ');
  const images = track.album?.images ?? [];
  // En küçük kapak 34 piksellik rozet için fazlasıyla yeterli.
  const cover = images.length ? images[images.length - 1].url : null;
  return {
    playing,
    title: artists ? `${artists} — ${track.name}` : track.name,
    url: track.external_urls?.spotify ?? null,
    uri: track.uri ?? null,
    cover,
  };
}

/** Kaç ziyaretçi olursa olsun Spotify'a en fazla bu aralıkta bir soruyoruz. */
const DATA_TTL = 20_000;

export async function GET() {
  const noStore = { 'Cache-Control': 'no-store, max-age=0' };

  if (dataCache && Date.now() - dataCache.at < DATA_TTL) {
    return NextResponse.json(dataCache.value, { headers: noStore });
  }

  const token = await accessToken();

  if (!token) {
    // Kimlik bilgileri girilmeden rozeti görebilmek için: sadece geliştirmede,
    // sadece SPOTIFY_DEMO=1 iken. Gerçek anahtarlar girilince kendiliğinden susar.
    if (process.env.NODE_ENV !== 'production' && process.env.SPOTIFY_DEMO === '1') {
      return NextResponse.json({ ...DEMO }, { headers: noStore });
    }
    return NextResponse.json(EMPTY, { headers: noStore });
  }

  const auth = { Authorization: `Bearer ${token}` };
  const send = (payload: Payload) => {
    dataCache = { value: payload, at: Date.now() };
    return NextResponse.json(payload, { headers: noStore });
  };

  try {
    const live = await fetch(NOW_PLAYING, { headers: auth, cache: 'no-store' });
    // 204: hiçbir şey çalmıyor. Gövde boş geldiği için json() patlar, önce kontrol et.
    if (live.status === 200) {
      const json = (await live.json()) as { is_playing?: boolean; item?: Track };
      if (json?.item) return send(shape(json.item, Boolean(json.is_playing)));
    }

    const recent = await fetch(RECENT, { headers: auth, cache: 'no-store' });
    if (recent.ok) {
      const json = (await recent.json()) as { items?: { track: Track }[] };
      const track = json?.items?.[0]?.track;
      if (track) return send(shape(track, false));
    }
  } catch {
    // Spotify ulaşılamıyorsa son bilinen şarkıyı göstermeye devam ederiz.
    if (dataCache) return NextResponse.json(dataCache.value, { headers: noStore });
  }

  return NextResponse.json(EMPTY, { headers: noStore });
}
