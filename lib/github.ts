import { site } from '@/content/site';

type Repo = { name: string; fork: boolean; archived: boolean };

/** Profil yapılandırma reposu sayıma girmez. */
const SKIP = new Set([site.githubUser.toLowerCase()]);

/**
 * Petek ızgaranın ortasındaki "açık proje" sayısı.
 * Çatallanmış ve arşivlenmiş depolar ile profil config reposu sayılmaz.
 * Günde bir kez tazelenir; GitHub ulaşılamazsa elle tutulan sayıya düşer.
 */
export async function getPublicRepoCount(fallback: number): Promise<number> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/users/${site.githubUser}/repos?per_page=100&type=owner`,
      {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: 86400 },
      },
    );
    if (!res.ok) return fallback;
    const repos: Repo[] = await res.json();
    if (!Array.isArray(repos) || repos.length === 0) return fallback;
    const count = repos.filter(
      (r) => !r.fork && !r.archived && !SKIP.has(r.name.toLowerCase()),
    ).length;
    return count > 0 ? count : fallback;
  } catch {
    return fallback;
  }
}
