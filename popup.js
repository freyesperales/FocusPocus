/* FocusPocus — popup */

import {
  activeRedes, dayKey, describeWhen, entryMatchesUrl, focusActive, getState,
  hostHasAccess, loadAdultDomains, nextScheduleChange, normalizeEntry, originFor,
  recordExplore, saveSettings, streak
} from "./lib/core.js";
import { buildPool, pickOne } from "./lib/discover.js";
import { $, h } from "./lib/dom.js";
import { mountNotes } from "./lib/notes.js";

const BLOCKED_PAGE = chrome.runtime.getURL("blocked.html");

function renderStatus(settings) {
  const now = new Date();
  const active = focusActive(settings, now);
  const anyFocusCat = settings.categories.redes || settings.categories.propia;
  const pill = $("#pill");
  const main = $("#status-main");
  const sub = $("#status-sub");

  if (anyFocusCat && active) {
    pill.textContent = "En foco";
    pill.classList.add("is-on");
    if (settings.mode === "siempre") {
      main.textContent = "Bloqueo activo, a toda hora";
    } else {
      const next = nextScheduleChange(settings, now);
      main.textContent = next ? `Bloqueo activo hasta ${describeWhen(next, now).replace(/^a las /, "las ")}` : "Bloqueo activo";
    }
  } else {
    pill.textContent = "Libre";
    pill.classList.remove("is-on");
    if (!anyFocusCat) {
      main.textContent = "Redes y tu lista están apagadas";
    } else {
      const next = nextScheduleChange(settings, now);
      main.textContent = next ? `Fuera de horario. Vuelve ${describeWhen(next, now)}` : "Fuera de horario";
    }
  }
  sub.textContent = settings.categories.adultos
    ? "Adultos: bloqueado siempre."
    : "Adultos: desactivado en las opciones.";
}

function renderStats(stats) {
  const n = streak(stats.exploreDays);
  $("#streak-num").textContent = String(n);
  $("#streak-label").textContent = n === 1 ? "día explorando" : "días seguidos explorando";
  const hits = stats.hits[dayKey()] || 0;
  $("#hits-num").textContent = String(hits);
  $("#hits-label").textContent = hits === 1 ? "pausa hoy" : "pausas hoy";
}

/* La URL real de la pestaña; si es nuestra página de bloqueo, la del sitio bloqueado. */
function realUrl(tab) {
  if (!tab || !tab.url) return null;
  let s = tab.url;
  if (s.startsWith(BLOCKED_PAGE)) s = decodeURI(new URL(s).hash.slice(1));
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:" ? u : null;
  } catch { return null; }
}

async function setupSiteButton(settings, adult) {
  const btn = $("#block-site");
  const msg = $("#site-msg");
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = realUrl(tab);
  if (!url) return;

  const entry = normalizeEntry(url.hostname);
  if (!entry) return;

  const covering = [
    ...(settings.categories.adultos ? adult : []),
    ...(settings.categories.redes ? activeRedes(settings) : []),
    ...settings.custom
  ].find(e => entryMatchesUrl(e, url) && !e.includes("/"));

  if (covering) {
    btn.replaceChildren("Ya está en tu lista: ", h("span", { class: "host", text: covering }));
    return;
  }

  const perms = await chrome.permissions.getAll();
  const needPerm = !hostHasAccess(entry, perms.origins || []);

  btn.disabled = false;
  btn.replaceChildren(h("span", { "aria-hidden": "true", text: "⊘" }), " Bloquear ", h("span", { class: "host", text: entry }));
  btn.addEventListener("click", async () => {
    btn.disabled = true;
    // El permiso se pide en el mismo clic, sin esperas antes, para no perder el gesto del usuario.
    // Sin permiso el sitio queda bloqueado igual; con permiso, se ve la página de sugerencias.
    const permReq = needPerm ? chrome.permissions.request({ origins: [originFor(entry)] }).catch(() => false) : Promise.resolve(true);
    const next = { ...settings, custom: [...settings.custom, entry], categories: { ...settings.categories, propia: true } };
    await saveSettings(next);
    const granted = await permReq;
    btn.replaceChildren("Bloqueado: ", h("span", { class: "host", text: entry }));
    if (focusActive(next)) {
      msg.textContent = granted ? "Listo. Se aplica desde ahora." : "Listo. Sin el permiso se bloquea igual, pero con la página de error del navegador.";
      setTimeout(() => chrome.tabs.reload(tab.id), 600);
    } else {
      msg.textContent = "Agregado. Se bloqueará dentro de tu horario.";
    }
  });
}

async function main() {
  const [{ settings, stats }, adult] = await Promise.all([getState(), loadAdultDomains()]);
  renderStatus(settings);
  renderStats(stats);
  setupSiteButton(settings, adult);

  const pool = buildPool(settings, adult);
  $("#surprise").addEventListener("click", async () => {
    const site = pickOne(pool);
    if (!site) return;
    await recordExplore();
    await chrome.tabs.create({ url: site.url });
    window.close();
  });

  $("#open-options").addEventListener("click", () => { chrome.runtime.openOptionsPage(); window.close(); });

  mountNotes($("#tasks"), {
    key: "tasks", title: "Tus tareas", placeholder: "Agregar una tarea", checkable: true,
    emptyText: "Sin tareas por ahora.", headingLevel: "h2"
  });
}

main();
