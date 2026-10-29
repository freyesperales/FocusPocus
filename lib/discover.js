/*
 * FocusPocus — descubrimiento.
 * Toma el catálogo de Brújula (data/sites.js, global CATEGORIES) y elige
 * sitios para proponer en lugar del que se bloqueó.
 */

import { activeRedes, entryMatchesUrl } from "./core.js";
import { DISCOVER_EXCLUDED } from "./lists.js";

function catalog() {
  // data/sites.js se carga antes como script clásico y declara CATEGORIES.
  // eslint-disable-next-line no-undef
  return typeof CATEGORIES !== "undefined" ? CATEGORIES : [];
}

/* Todas las entradas configuradas, estén o no activas ahora: no se recomienda nada que tú bloqueas. */
export function configuredEntries(settings, adultDomains) {
  return [
    ...adultDomains,
    ...(settings.categories.redes ? activeRedes(settings) : []),
    ...settings.custom
  ];
}

export function buildPool(settings, adultDomains) {
  const entries = configuredEntries(settings, adultDomains);
  const pool = [];
  for (const cat of catalog()) {
    if (DISCOVER_EXCLUDED.includes(cat.id)) continue;
    for (const site of cat.sites) {
      let url;
      try { url = new URL(site.url); } catch { continue; }
      if (entries.some(e => entryMatchesUrl(e, url))) continue;
      pool.push({ ...site, catId: cat.id, catLabel: cat.label, catIcon: cat.icon });
    }
  }
  return pool;
}

function randomIndex(n) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % n;
}

/* Un sitio al azar que no repita URL ni, si se puede, categoría. */
export function pickOne(pool, { excludeUrls = new Set(), excludeCats = new Set() } = {}) {
  let options = pool.filter(s => !excludeUrls.has(s.url) && !excludeCats.has(s.catId));
  if (!options.length) options = pool.filter(s => !excludeUrls.has(s.url));
  if (!options.length) options = pool;
  return options.length ? options[randomIndex(options.length)] : null;
}

export function pickMany(pool, n) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const s = pickOne(pool, {
      excludeUrls: new Set(out.map(x => x.url)),
      excludeCats: new Set(out.map(x => x.catId))
    });
    if (s) out.push(s);
  }
  return out;
}

export function randomQuote() {
  // eslint-disable-next-line no-undef
  const list = typeof QUOTES !== "undefined" ? QUOTES : [];
  return list.length ? list[randomIndex(list.length)] : null;
}
