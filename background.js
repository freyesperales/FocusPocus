/*
 * FocusPocus — service worker.
 * Mantiene las reglas de bloqueo al día según la configuración, el horario
 * y los desbloqueos temporales. No hace ninguna petición a la red.
 */

import {
  DEFAULT_SETTINGS, activeRedes, entryParts, focusActive, getState, hostMatches,
  loadAdultDomains, normalizeEntry, reasonIsValid, sanitizeSettings, uid, updateStats
} from "./lib/core.js";
import { buildRules } from "./lib/rules.js";

const BASE = chrome.runtime.getURL("blocked.html");
const TICK = "tick";

/* ---------- Sincronizar reglas ---------- */

let queue = Promise.resolve();
function sync() {
  queue = queue.then(syncRules).catch(e => console.error("FocusPocus: error al sincronizar reglas", e));
  return queue;
}


async function syncRules() {
  const { settings, unlocks } = await getState();
  const now = Date.now();

  // Limpiar desbloqueos vencidos.
  const live = Object.fromEntries(Object.entries(unlocks).filter(([, until]) => until > now));
  if (Object.keys(live).length !== Object.keys(unlocks).length) {
    await chrome.storage.local.set({ unlocks: live });
  }

  const [adultDomains, perms, existing] = await Promise.all([
    loadAdultDomains(),
    chrome.permissions.getAll(),
    chrome.declarativeNetRequest.getDynamicRules()
  ]);
  const rules = buildRules({ settings, adultDomains, unlocks: live, origins: perms.origins || [], base: BASE, now });

  // El navegador devuelve las reglas con otro orden de claves; se compara
  // con la firma de lo último que se escribió en esta sesión.
  const sig = JSON.stringify(rules);
  const { rulesSig } = await chrome.storage.session.get("rulesSig");
  if (sig === rulesSig && existing.length === rules.length) return;
  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: existing.map(r => r.id),
    addRules: rules
  });
  await chrome.storage.session.set({ rulesSig: sig });
}

function ensureTick() {
  chrome.alarms.get(TICK).then(a => {
    if (!a) chrome.alarms.create(TICK, { periodInMinutes: 1 });
  });
}

/* ---------- Instalación y migración desde v1 ---------- */

async function migrateFromV1() {
  // La v1 guardaba en chrome.storage.sync: blockedSites (array de texto) y tasks ([{text}]).
  try {
    const old = await chrome.storage.sync.get(["blockedSites", "tasks"]);
    const custom = (old.blockedSites || []).map(normalizeEntry).filter(Boolean);
    const tasks = (old.tasks || [])
      .filter(t => t && typeof t.text === "string" && t.text.trim())
      .map(t => ({ id: uid(), text: t.text.trim(), done: false }));
    return { custom, tasks };
  } catch {
    return { custom: [], tasks: [] };
  }
}

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  const data = await chrome.storage.local.get(["settings", "tasks"]);
  if (!data.settings) {
    const old = await migrateFromV1();
    const settings = sanitizeSettings({ ...DEFAULT_SETTINGS, custom: old.custom });
    await chrome.storage.local.set({
      settings,
      tasks: data.tasks || old.tasks,
      dreams: [],
      unlocks: {}
    });
  }
  ensureTick();
  await sync();
  if (reason === "install") {
    await chrome.storage.local.set({ showWelcome: true });
    chrome.runtime.openOptionsPage();
  }
});

chrome.runtime.onStartup.addListener(() => { ensureTick(); sync(); });
chrome.alarms.onAlarm.addListener(() => sync());
chrome.permissions.onAdded.addListener(() => sync());
chrome.permissions.onRemoved.addListener(() => sync());
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && (changes.settings || changes.unlocks)) sync();
});

ensureTick();
sync();

/* ---------- Desbloqueo con esfuerzo ---------- */

async function getWaits() {
  const { waits } = await chrome.storage.session.get("waits");
  return waits || {};
}

/* La entrada que se puede desbloquear: debe estar bloqueada ahora y no ser de adultos. */
async function unlockableEntry(entry) {
  const { settings } = await getState();
  if (typeof entry !== "string") return null;
  const { host } = entryParts(entry);
  const adult = await loadAdultDomains();
  if (settings.categories.adultos && adult.some(d => hostMatches(host, d))) return null;
  if (!focusActive(settings)) return null;
  const candidates = [
    ...(settings.categories.redes ? activeRedes(settings) : []),
    ...(settings.categories.propia ? settings.custom : [])
  ];
  return candidates.includes(entry) ? { entry, settings } : null;
}

async function handle(msg) {
  if (msg.type === "startWait") {
    const ok = await unlockableEntry(msg.entry);
    if (!ok) return { ok: false, error: "Este sitio no se puede desbloquear desde aquí." };
    const waits = await getWaits();
    // Se respeta el primer inicio: recargar la página no reinicia ni acorta la espera.
    if (!waits[msg.entry] || Date.now() - waits[msg.entry] > 60 * 60 * 1000) {
      waits[msg.entry] = Date.now();
      await chrome.storage.session.set({ waits });
    }
    return { ok: true, startedAt: waits[msg.entry], waitMinutes: ok.settings.unlock.waitMinutes };
  }

  if (msg.type === "unlock") {
    const ok = await unlockableEntry(msg.entry);
    if (!ok) return { ok: false, error: "Este sitio no se puede desbloquear desde aquí." };
    const { settings } = ok;

    if (msg.method === "wait") {
      const waits = await getWaits();
      const started = waits[msg.entry];
      const need = settings.unlock.waitMinutes * 60 * 1000 - 2000;
      if (!started || Date.now() - started < need) return { ok: false, error: "Todavía no termina la espera." };
      delete waits[msg.entry];
      await chrome.storage.session.set({ waits });
    } else if (msg.method === "reason") {
      if (!reasonIsValid(msg.reason)) return { ok: false, error: "El motivo es demasiado corto o no se entiende." };
    } else {
      return { ok: false, error: "Método no válido." };
    }

    const until = Date.now() + settings.unlock.durationMinutes * 60 * 1000;
    const { unlocks } = await chrome.storage.local.get("unlocks");
    await chrome.storage.local.set({ unlocks: { ...(unlocks || {}), [msg.entry]: until } });
    await updateStats(s => {
      s.reasons.push({
        at: Date.now(),
        entry: msg.entry,
        method: msg.method,
        text: msg.method === "reason" ? String(msg.reason).trim().slice(0, 500) : ""
      });
    });
    chrome.alarms.create("expire:" + msg.entry, { when: until + 500 });
    await sync();
    return { ok: true, until };
  }

  return { ok: false, error: "Mensaje desconocido." };
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  // Solo se aceptan mensajes de las páginas de la propia extensión.
  if (sender.id !== chrome.runtime.id || !msg || typeof msg.type !== "string") return false;
  handle(msg).then(sendResponse, e => sendResponse({ ok: false, error: String(e && e.message || e) }));
  return true;
});
