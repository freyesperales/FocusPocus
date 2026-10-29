/*
 * FocusPocus — estado, normalización y horario.
 * Todo vive en chrome.storage.local. Nada sale del navegador.
 */

import { ADULT_EXTRA, ADULT_TLDS, REDES } from "./lists.js";

export const REASON_MIN_CHARS = 40;

export const DEFAULT_SETTINGS = {
  version: 2,
  categories: { adultos: true, redes: true, propia: true },
  redesOff: REDES.filter(r => !r.on).map(r => r.entry),
  custom: [],
  mode: "horario", // "siempre" | "horario"
  schedule: { days: [1, 2, 3, 4, 5], start: "09:00", end: "18:00" },
  unlock: { waitMinutes: 3, durationMinutes: 10 }
};

export const LIMITS = {
  waitMinutes: [1, 30],
  durationMinutes: [5, 60]
};

/* ---------- Utilidades ---------- */

export function clamp(n, [min, max]) {
  const v = Math.round(Number(n));
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

export function dayKey(date = new Date()) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/* ---------- Entradas de bloqueo ---------- */

/*
 * Convierte lo que escribe el usuario en una entrada canónica:
 *   "https://www.Example.com/"        -> "example.com"
 *   "youtube.com/shorts/abc?x=1"      -> "youtube.com/shorts/abc"
 * Devuelve null si no es un sitio web válido.
 */
export function normalizeEntry(input) {
  if (typeof input !== "string") return null;
  let s = input.trim();
  if (!s) return null;
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(s)) s = "http://" + s;
  let url;
  try { url = new URL(s); } catch { return null; }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;
  let host = url.hostname.toLowerCase().replace(/^www\./, "").replace(/\.$/, "");
  if (!host || !host.includes(".") || host.startsWith(".")) return null;
  if (!/^[a-z0-9.-]+$/.test(host)) return null;
  let path = url.pathname.replace(/\/+$/, "");
  if (path === "/") path = "";
  return host + path;
}

export function entryParts(entry) {
  const i = entry.indexOf("/");
  return i === -1 ? { host: entry, path: "" } : { host: entry.slice(0, i), path: entry.slice(i) };
}

export function hostMatches(host, base) {
  return host === base || host.endsWith("." + base);
}

export function entryMatchesUrl(entry, url) {
  const { host, path } = entryParts(entry);
  const h = url.hostname.toLowerCase().replace(/\.$/, "");
  if (!hostMatches(h, host)) return false;
  return !path || url.pathname.toLowerCase().startsWith(path.toLowerCase());
}

/* ---------- Estado ---------- */

function sanitizeTime(t, fallback) {
  return typeof t === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(t) ? t : fallback;
}

export function sanitizeSettings(raw) {
  const d = DEFAULT_SETTINGS;
  const s = raw && typeof raw === "object" ? raw : {};
  const cats = s.categories && typeof s.categories === "object" ? s.categories : {};
  const sched = s.schedule && typeof s.schedule === "object" ? s.schedule : {};
  const unlock = s.unlock && typeof s.unlock === "object" ? s.unlock : {};
  const redesEntries = REDES.map(r => r.entry);
  const custom = Array.isArray(s.custom) ? s.custom.map(normalizeEntry).filter(Boolean) : [];
  const days = Array.isArray(sched.days)
    ? [...new Set(sched.days.map(Number).filter(n => Number.isInteger(n) && n >= 0 && n <= 6))].sort()
    : d.schedule.days;
  return {
    version: 2,
    categories: {
      adultos: typeof cats.adultos === "boolean" ? cats.adultos : d.categories.adultos,
      redes: typeof cats.redes === "boolean" ? cats.redes : d.categories.redes,
      propia: typeof cats.propia === "boolean" ? cats.propia : d.categories.propia
    },
    redesOff: Array.isArray(s.redesOff) ? s.redesOff.filter(e => redesEntries.includes(e)) : [...d.redesOff],
    custom: [...new Set(custom)],
    mode: s.mode === "siempre" ? "siempre" : s.mode === "horario" ? "horario" : d.mode,
    schedule: {
      days,
      start: sanitizeTime(sched.start, d.schedule.start),
      end: sanitizeTime(sched.end, d.schedule.end)
    },
    unlock: {
      waitMinutes: clamp(unlock.waitMinutes ?? d.unlock.waitMinutes, LIMITS.waitMinutes),
      durationMinutes: clamp(unlock.durationMinutes ?? d.unlock.durationMinutes, LIMITS.durationMinutes)
    }
  };
}

export function sanitizeNotes(raw) {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter(n => n && typeof n.text === "string" && n.text.trim())
    .slice(0, 200)
    .map(n => ({ id: typeof n.id === "string" ? n.id : uid(), text: n.text.trim().slice(0, 300), done: !!n.done }));
}

export async function getState() {
  const data = await chrome.storage.local.get(["settings", "tasks", "dreams", "unlocks", "stats"]);
  return {
    settings: sanitizeSettings(data.settings),
    tasks: sanitizeNotes(data.tasks),
    dreams: sanitizeNotes(data.dreams),
    unlocks: data.unlocks && typeof data.unlocks === "object" ? data.unlocks : {},
    stats: sanitizeStats(data.stats)
  };
}

export async function saveSettings(settings) {
  await chrome.storage.local.set({ settings: sanitizeSettings(settings) });
}

/* ---------- Listas de bloqueo ---------- */

let adultCache = null;
export async function loadAdultDomains() {
  if (adultCache) return adultCache;
  let fromBrujula = [];
  try {
    const res = await fetch(chrome.runtime.getURL("data/blocklist.json"));
    const rules = await res.json();
    fromBrujula = rules.flatMap(r => (r.condition && r.condition.requestDomains) || []);
  } catch (e) {
    console.error("FocusPocus: no se pudo leer data/blocklist.json", e);
  }
  adultCache = [...new Set([...fromBrujula, ...ADULT_EXTRA, ...ADULT_TLDS].map(d => d.toLowerCase()))];
  return adultCache;
}

export function activeRedes(settings) {
  return REDES.map(r => r.entry).filter(e => !settings.redesOff.includes(e));
}

/* ---------- Horario ---------- */

function toMinutes(hhmm) {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

export function withinSchedule(schedule, date = new Date()) {
  const { days, start, end } = schedule;
  if (!days.length) return false;
  const now = date.getHours() * 60 + date.getMinutes();
  const s = toMinutes(start);
  const e = toMinutes(end);
  const today = date.getDay();
  const yesterday = (today + 6) % 7;
  if (s === e) return days.includes(today);
  if (s < e) return days.includes(today) && now >= s && now < e;
  // Horario nocturno, por ejemplo 22:00 a 06:00.
  return (days.includes(today) && now >= s) || (days.includes(yesterday) && now < e);
}

/* ¿Están activas ahora las categorías que siguen el horario (redes y lista propia)? */
export function focusActive(settings, date = new Date()) {
  return settings.mode === "siempre" || withinSchedule(settings.schedule, date);
}

/* Próximo cambio de estado del horario, para mostrar «hasta las 18:00» o «empieza el lunes 09:00». */
export function nextScheduleChange(settings, date = new Date()) {
  if (settings.mode === "siempre") return null;
  const current = withinSchedule(settings.schedule, date);
  const t = new Date(date);
  t.setSeconds(0, 0);
  // Minuto a minuto durante 8 días: son ~11 500 comprobaciones baratas.
  for (let i = 0; i < 8 * 24 * 60; i++) {
    t.setMinutes(t.getMinutes() + 1);
    if (withinSchedule(settings.schedule, t) !== current) return t;
  }
  return null;
}

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
export const DAY_SHORT = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"];

export function describeWhen(target, from = new Date()) {
  const hh = `${String(target.getHours()).padStart(2, "0")}:${String(target.getMinutes()).padStart(2, "0")}`;
  const diffDays = Math.round((new Date(target).setHours(0, 0, 0, 0) - new Date(from).setHours(0, 0, 0, 0)) / 86400000);
  if (diffDays === 0) return `a las ${hh}`;
  if (diffDays === 1) return `mañana a las ${hh}`;
  return `el ${DAY_NAMES[target.getDay()]} a las ${hh}`;
}

/*
 * Entradas bloqueadas en este momento, para saber si un cambio de
 * configuración afloja el bloqueo.
 */
export function blockedNow(settings, adultDomains, date = new Date()) {
  const set = new Set();
  if (settings.categories.adultos) adultDomains.forEach(d => set.add("adultos:" + d));
  if (focusActive(settings, date)) {
    if (settings.categories.redes) activeRedes(settings).forEach(e => set.add("redes:" + e));
    if (settings.categories.propia) settings.custom.forEach(e => set.add("propia:" + e));
  }
  return set;
}

export function loosens(before, after, adultDomains, date = new Date()) {
  const a = blockedNow(before, adultDomains, date);
  const b = blockedNow(after, adultDomains, date);
  for (const k of a) if (!b.has(k)) return true;
  return false;
}

/* Texto aceptable como motivo: largo mínimo y que no sea relleno. */
export function reasonIsValid(text) {
  if (typeof text !== "string") return false;
  const t = text.trim();
  if (t.length < REASON_MIN_CHARS) return false;
  const words = t.split(/\s+/).filter(w => /\p{L}{2,}/u.test(w));
  const distinct = new Set(t.toLowerCase().replace(/\s/g, "")).size;
  return words.length >= 6 && distinct >= 10;
}

/* ---------- Estadísticas y racha ---------- */

function sanitizeStats(raw) {
  const s = raw && typeof raw === "object" ? raw : {};
  return {
    exploreDays: Array.isArray(s.exploreDays) ? s.exploreDays.filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d)) : [],
    hits: s.hits && typeof s.hits === "object" ? s.hits : {},
    reasons: Array.isArray(s.reasons) ? s.reasons.slice(-30) : []
  };
}

export async function updateStats(fn) {
  const { stats } = await chrome.storage.local.get("stats");
  const s = sanitizeStats(stats);
  fn(s);
  // Solo se guardan los últimos 60 días.
  const cutoff = dayKey(new Date(Date.now() - 60 * 86400000));
  s.exploreDays = [...new Set(s.exploreDays)].filter(d => d >= cutoff).sort();
  for (const k of Object.keys(s.hits)) if (k < cutoff) delete s.hits[k];
  s.reasons = s.reasons.slice(-30);
  await chrome.storage.local.set({ stats: s });
  return s;
}

export function recordExplore() {
  return updateStats(s => { s.exploreDays.push(dayKey()); });
}

export function streak(exploreDays, date = new Date()) {
  const set = new Set(exploreDays);
  const d = new Date(date);
  if (!set.has(dayKey(d))) d.setDate(d.getDate() - 1); // la racha sigue viva si hoy aún no exploraste
  let n = 0;
  while (set.has(dayKey(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

/* ---------- Permisos de host ---------- */

/* ¿Cubre algún origen concedido a este host? */
export function hostHasAccess(host, origins) {
  for (const o of origins) {
    if (o === "<all_urls>") return true;
    const m = /^(\*|https?):\/\/(\*\.)?([^/]+)\/.*$/.exec(o);
    if (!m) continue;
    const [, , wild, pat] = m;
    if (pat === "*") return true;
    if (host === pat || (wild && host.endsWith("." + pat))) return true;
  }
  return false;
}

export function originFor(entry) {
  return `*://*.${entryParts(entry).host}/*`;
}
