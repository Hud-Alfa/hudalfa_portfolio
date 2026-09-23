'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '@/content/types';
import { t, ui } from '@/content/dictionary';

type Payload = {
  playing: boolean;
  title: string;
  url: string | null;
  uri: string | null;
  cover: string | null;
};

type EmbedController = {
  togglePlay: () => void;
  loadUri: (uri: string) => void;
  addListener: (event: string, cb: (e: { data: { isPaused: boolean } }) => void) => void;
  destroy?: () => void;
};

type IFrameAPI = {
  createController: (
    el: HTMLElement,
    opts: { uri: string; width: string | number; height: string | number },
    cb: (c: EmbedController) => void,
  ) => void;
};

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: IFrameAPI) => void;
  }
}

const API_SRC = 'https://open.spotify.com/embed/iframe-api/v1';
const REFRESH_MS = 60_000;

export default function SpotifyBadge({ lang }: { lang: Lang }) {
  const [data, setData] = useState<Payload | null>(null);
  const [paused, setPaused] = useState(true);
  const [ready, setReady] = useState(false);
  const holder = useRef<HTMLSpanElement>(null);
  const controller = useRef<EmbedController | null>(null);
  const loadedUri = useRef<string | null>(null);

  // Rozet verisi: önce "şu an çalıyor", yoksa "son dinlenen".
  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch('/api/spotify', { cache: 'no-store' });
        if (!res.ok) return;
        const json: Payload = await res.json();
        if (alive) setData(json.title ? json : null);
      } catch {
        /* uç nokta yoksa rozet gizli kalır */
      }
    };
    load();
    const id = setInterval(load, REFRESH_MS);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  // Gömülü oynatıcı: görünmez, sadece kendi düğmemiz tetikler.
  useEffect(() => {
    const uri = data?.uri;
    if (!uri || !holder.current) return;

    if (controller.current) {
      if (loadedUri.current !== uri) {
        controller.current.loadUri(uri);
        loadedUri.current = uri;
        setPaused(true);
      }
      return;
    }

    const attach = (api: IFrameAPI) => {
      if (!holder.current || controller.current) return;
      api.createController(holder.current, { uri, width: '300', height: '80' }, (c) => {
        controller.current = c;
        loadedUri.current = uri;
        c.addListener('playback_update', (e) => setPaused(e.data.isPaused));
        setReady(true);
      });
    };

    if (document.querySelector(`script[src="${API_SRC}"]`)) {
      window.onSpotifyIframeApiReady = attach;
      return;
    }
    window.onSpotifyIframeApiReady = attach;
    const s = document.createElement('script');
    s.src = API_SRC;
    s.async = true;
    document.body.appendChild(s);
  }, [data?.uri]);

  const toggle = useCallback(() => {
    controller.current?.togglePlay();
  }, []);

  if (!data) return null;

  const label = data.playing ? ui.spotify.nowPlaying : ui.spotify.lastPlayed;
  // Gömülü oynatıcı bağlanana kadar düğme görünmez: ilk tıklama boşa gitmesin.
  const canPlay = Boolean(data.uri) && ready;

  return (
    <div className={`badge${data.playing || !paused ? '' : ' paused'}`}>
      {canPlay ? (
        <button
          type="button"
          className={`sp-art${paused ? '' : ' on'}`}
          style={data.cover ? { backgroundImage: `url(${data.cover})` } : undefined}
          onClick={toggle}
          aria-label={t(paused ? ui.spotify.play : ui.spotify.pause, lang)}
        >
          <span className="glyph" aria-hidden="true">
            {paused ? '▶' : '❙❙'}
          </span>
        </button>
      ) : (
        <span
          className="sp-art"
          style={data.cover ? { backgroundImage: `url(${data.cover})` } : undefined}
          aria-hidden="true"
        />
      )}

      <a
        className="sp-txt"
        href={data.url ?? 'https://open.spotify.com'}
        target="_blank"
        rel="noopener"
      >
        <span className="sp-k">
          <span className="eq" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="sp-lbl">{t(label, lang)}</span>
        </span>
        <span className="sp-t">{data.title}</span>
      </a>

      {/* Spotify createController verilen düğümü kendi işaretlemesiyle değiştiriyor,
          bu yüzden gizleme stilleri dıştaki sarmalayıcıda duruyor. */}
      <span className="sp-frame" aria-hidden="true">
        <span ref={holder} />
      </span>
    </div>
  );
}
