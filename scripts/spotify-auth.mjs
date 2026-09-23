/**
 * Spotify refresh token alma betiği.
 *
 * Kullanım:
 *   1. https://developer.spotify.com/dashboard adresinde bir uygulama oluştur.
 *   2. Uygulamanın ayarlarında Redirect URI olarak şunu ekle:
 *        http://127.0.0.1:8888/callback
 *   3. Client ID ve Client Secret değerlerini .env.local dosyasına yaz.
 *   4. npm run spotify:auth
 *
 * Betik tarayıcıyı açar, sen izin verirsin, refresh token .env.local'e yazılır.
 * Hiçbir değer dışarı gönderilmez; tüm trafik senin makinen ile Spotify arasında.
 */

import { createServer } from 'node:http';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const PORT = 8888;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played';
const ENV_PATH = resolve(process.cwd(), '.env.local');

function readEnv() {
  if (!existsSync(ENV_PATH)) return {};
  const out = {};
  for (const line of readFileSync(ENV_PATH, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    out[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return out;
}

function writeEnv(key, value) {
  const raw = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, 'utf8') : '';
  const lines = raw.split('\n');
  const idx = lines.findIndex((l) => l.trim().startsWith(`${key}=`));
  if (idx === -1) {
    const sep = raw.length && !raw.endsWith('\n') ? '\n' : '';
    writeFileSync(ENV_PATH, `${raw}${sep}${key}=${value}\n`, 'utf8');
  } else {
    lines[idx] = `${key}=${value}`;
    writeFileSync(ENV_PATH, lines.join('\n'), 'utf8');
  }
}

function openBrowser(url) {
  // Kabuk kullanmıyoruz: Windows'ta cmd, adresteki & karakterlerini komut
  // ayracı sayıp URL'yi ilk & işaretinden kesiyor ve parametreler kayboluyor.
  const [cmd, args] =
    process.platform === 'win32'
      ? ['rundll32', ['url.dll,FileProtocolHandler', url]]
      : process.platform === 'darwin'
        ? ['open', [url]]
        : ['xdg-open', [url]];
  try {
    spawn(cmd, args, { stdio: 'ignore', detached: true }).unref();
  } catch {
    /* açılmazsa kullanıcı adresi elle yapıştırır */
  }
}

const env = readEnv();
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || env.SPOTIFY_CLIENT_SECRET;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error('\n  .env.local içinde SPOTIFY_CLIENT_ID ve SPOTIFY_CLIENT_SECRET bulunamadı.');
  console.error('  Önce Spotify Dashboard\'da uygulamayı oluşturup bu iki değeri yaz.\n');
  process.exit(1);
}

const state = randomBytes(16).toString('hex');
const authUrl =
  'https://accounts.spotify.com/authorize?' +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'code',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
    state,
    show_dialog: 'true',
  });

function page(title, body) {
  return `<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>${title}</title>
<style>body{background:#040B15;color:#DCEDF8;font-family:system-ui,sans-serif;display:grid;place-items:center;height:100vh;margin:0;text-align:center}
div{max-width:520px;padding:32px;border:1px solid rgba(160,205,245,.34);border-radius:16px}
h1{font-size:20px;font-weight:500;margin:0 0 12px}p{color:#A9BED2;font-size:14px;line-height:1.7;margin:0}</style>
</head><body><div><h1>${title}</h1><p>${body}</p></div></body></html>`;
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://127.0.0.1:${PORT}`);
  if (url.pathname !== '/callback') {
    res.writeHead(404).end();
    return;
  }

  const error = url.searchParams.get('error');
  const code = url.searchParams.get('code');

  if (error || !code) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page('İzin verilmedi', `Spotify şu yanıtı döndü: ${error ?? 'kod gelmedi'}`));
    console.error(`\n  Yetkilendirme başarısız: ${error ?? 'kod gelmedi'}\n`);
    server.close();
    process.exit(1);
  }

  if (url.searchParams.get('state') !== state) {
    res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page('Doğrulama hatası', 'State değeri eşleşmedi, işlem iptal edildi.'));
    console.error('\n  State eşleşmedi, işlem iptal edildi.\n');
    server.close();
    process.exit(1);
  }

  try {
    const token = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const json = await token.json();
    if (!token.ok || !json.refresh_token) {
      throw new Error(json.error_description || json.error || 'refresh_token gelmedi');
    }

    writeEnv('SPOTIFY_REFRESH_TOKEN', json.refresh_token);

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page('Tamamdır', 'Refresh token .env.local dosyasına yazıldı. Bu sekmeyi kapatabilirsin.'));

    console.log('\n  Refresh token alındı ve .env.local dosyasına yazıldı.');
    console.log('  Vercel\'e de aynı üç değeri girmen gerekiyor:\n');
    console.log('    SPOTIFY_CLIENT_ID');
    console.log('    SPOTIFY_CLIENT_SECRET');
    console.log(`    SPOTIFY_REFRESH_TOKEN=${json.refresh_token}\n`);

    server.close();
    process.exit(0);
  } catch (e) {
    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(page('Token alınamadı', String(e.message ?? e)));
    console.error(`\n  Token alınamadı: ${e.message ?? e}\n`);
    server.close();
    process.exit(1);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log('\n  Tarayıcı açılıyor. Spotify hesabınla izin ver.');
  console.log('  Açılmazsa şu adresi elle yapıştır:\n');
  console.log(`  ${authUrl}\n`);
  openBrowser(authUrl);
});
