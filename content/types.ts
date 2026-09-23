export const LANGS = ['tr', 'en'] as const;
export type Lang = (typeof LANGS)[number];

/** Aynı metnin iki dildeki karşılığı. */
export type L = Record<Lang, string>;
export type LArr = Record<Lang, string[]>;

export function isLang(v: string): v is Lang {
  return (LANGS as readonly string[]).includes(v);
}
