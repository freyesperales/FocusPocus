/* FocusPocus — página de bloqueo */

import {
  REASON_MIN_CHARS, activeRedes, dayKey, entryMatchesUrl, getState,
  loadAdultDomains, reasonIsValid, recordExplore, updateStats
} from "./lib/core.js";
import { buildPool, pickMany, pickOne, randomQuote } from "./lib/discover.js";
import { $, announce, h } from "./lib/dom.js";
import { mountNotes } from "./lib/notes.js";

const params = new URLSearchParams(location.search);
const category = params.get("c") || "";
const rawTarget = decodeURIComponentSafe(location.hash.slice(1));
const target = parseUrl(rawTarget);

function decodeURIComponentSafe(s) {
  try { return decodeURI(s); } catch { return s; }
}
function parseUrl(s) {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:" ? u : null;
  } catch { return null; }
}
function displayHost(u) {
  return u ? u.hostname.replace(/^www\./, "") : "";
}
function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return ""; }
}

/* ---------- Portada ---------- */

function renderHero() {
  const host = displayHost(target);
  if (host) $("#kicker").textContent = `En pausa · ${host}`;
  if (category === "adultos") {
    $("#titulo").textContent = "Este sitio no entra.";
    $("#lede").textContent = "Está en la categoría de adultos, que tienes activa a toda hora. Hay cosas mucho mejores para hacer con este rato.";
    document.title = "Bloqueado · FocusPocus";
  } else {
    $("#titulo").replaceChildren("Aquí no. ", h("em", { text: "Mejor esto." }));
    const lede = $("#lede");
    lede.replaceChildren(
      "Tú pusiste ",
      h("strong", { text: host || "este sitio" }),
      " en pausa para cuidar tu tiempo. Revisa lo que querías hacer o descubre algo nuevo."
    );
  }
}

/* ---------- Sugerencias ---------- */

let pool = [];
let shown = [];

function cardNode(site, index) {
  const go = () => recordExplore();
  return h("li", { class: "card" },
    h("p", { class: "card-cat", text: `${site.catIcon} ${site.catLabel}` }),
    h("span", { class: "card-emoji", "aria-hidden": "true", text: site.emoji || "✦" }),
    h("h3", { text: site.name }),
    h("p", { class: "card-desc", text: site.desc || "" }),
    h("p", { class: "card-host", text: hostOf(site.url) }),
    h("div", { class: "card-actions" },
      h("a", { class: "btn btn-primary", href: site.url, onclick: go, rel: "noreferrer" }, "Ir", h("span", { class: "sr-only", text: ` a ${site.name}` })),
      h("button", {
        type: "button", class: "btn btn-ghost", "aria-label": `Otra sugerencia en lugar de ${site.name}`,
        onclick: () => replaceCard(index)
      }, "Otro")
    )
  );
}

function renderCards() {
  const list = $("#cards");
  list.replaceChildren(...shown.map((s, i) => cardNode(s, i)));
  if (!shown.length) list.append(h("li", { class: "card" }, h("p", { text: "El catálogo no está disponible." })));
}

function replaceCard(index) {
  const others = shown.filter((_, i) => i !== index);
  const next = pickOne(pool, {
    excludeUrls: new Set(shown.map(s => s.url)),
    excludeCats: new Set(others.map(s => s.catId))
  });
  if (!next) return;
  shown[index] = next;
  const list = $("#cards");
  const fresh = cardNode(next, index);
  list.children[index].replaceWith(fresh);
  // El foco vuelve al botón «Otro» de la tarjeta nueva para poder seguir pasando.
  fresh.querySelector(".btn-ghost").focus();
  announce($("#cards-status"), `Nueva sugerencia: ${next.name}. ${next.desc || ""}`);
}

/* ---------- Desbloqueo ---------- */

function findEntry(settings) {
  if (!target) return null;
  let candidates = [];
  if (category === "redes") candidates = activeRedes(settings);
  else if (category === "propia") candidates = settings.custom;
  const matches = candidates.filter(e => entryMatchesUrl(e, target));
  // La más específica gana: youtube.com/shorts antes que youtube.com.
  return matches.sort((a, b) => b.length - a.length)[0] || null;
}

function renderUnlock(settings) {
  const root = $("#unlock");
  const title = h("h2", { id: "unlock-titulo", text: "¿Lo necesitas de verdad?" });

  if (category === "adultos") {
    root.replaceChildren(
      h("h2", { id: "unlock-titulo", text: "Sin atajos" }),
      h("p", { class: "locked-note", text: "La categoría de adultos no se desbloquea desde aquí. Si alguna vez quieres cambiarla, hazlo con calma desde las opciones." })
    );
    return;
  }

  const entry = findEntry(settings);
  if (!entry) {
    root.replaceChildren(
      title,
      h("p", {}, "Este sitio ya no coincide con tu configuración actual. ",
        target ? h("a", { href: target.href, text: "Volver a intentarlo" }) : null)
    );
    return;
  }

  const mins = settings.unlock.waitMinutes;
  const dur = settings.unlock.durationMinutes;
  const label = entry;

  // Método 1: esperar.
  const timer = h("p", { class: "timer", role: "timer", "aria-live": "off", text: formatTime(mins * 60) });
  const bar = h("span");
  const waitMsg = h("p", { class: "msg", role: "status" });
  const waitStart = h("button", { type: "button", class: "btn btn-quiet", text: `Empezar a esperar ${mins} min` });
  const waitOpen = h("button", { type: "button", class: "btn btn-gold", hidden: true, text: `Abrir ${label} por ${dur} min` });

  waitStart.addEventListener("click", async () => {
    const res = await chrome.runtime.sendMessage({ type: "startWait", entry });
    if (!res || !res.ok) { waitMsg.textContent = (res && res.error) || "No se pudo empezar."; return; }
    waitStart.disabled = true;
    waitStart.textContent = "Esperando…";
    runCountdown(mins * 60, timer, bar, waitMsg, () => {
      waitStart.hidden = true;
      waitOpen.hidden = false;
      waitOpen.focus();
      announce(waitMsg, "Listo. Ya puedes abrir el sitio.");
    });
  });
  waitOpen.addEventListener("click", () => unlock(entry, { method: "wait" }, waitMsg));

  // Método 2: escribir para qué.
  const ta = h("textarea", {
    id: "reason", rows: "3", maxlength: "500", "aria-describedby": "reason-help reason-count"
  });
  const count = h("span", { class: "counter", id: "reason-count", text: `0 / ${REASON_MIN_CHARS}` });
  const reasonMsg = h("p", { class: "msg", role: "status" });
  const reasonOpen = h("button", { type: "button", class: "btn btn-gold", disabled: true, text: `Abrir ${label} por ${dur} min` });
  ta.addEventListener("input", () => {
    const n = ta.value.trim().length;
    const valid = reasonIsValid(ta.value);
    count.textContent = `${n} / ${REASON_MIN_CHARS}`;
    reasonOpen.disabled = !valid;
    reasonMsg.textContent = n >= REASON_MIN_CHARS && !valid ? "Escribe una frase con sentido, de al menos seis palabras." : "";
  });
  reasonOpen.addEventListener("click", () => unlock(entry, { method: "reason", reason: ta.value }, reasonMsg));

  root.replaceChildren(
    title,
    h("p", { text: `Puedes abrir ${label} durante ${dur} minutos, pero cuesta un poco: o esperas, o explicas para qué.` }),
    h("details", {},
      h("summary", { text: "Ver las dos formas de desbloquear" }),
      h("div", { class: "unlock-body" },
        h("div", { class: "method" },
          h("h3", { text: `Esperar ${mins} ${mins === 1 ? "minuto" : "minutos"}` }),
          h("p", { text: "La cuenta solo avanza con esta pestaña a la vista. Si mientras tanto se te pasan las ganas, misión cumplida." }),
          timer,
          h("div", { class: "bar", "aria-hidden": "true" }, bar),
          waitStart, waitOpen, waitMsg
        ),
        h("div", { class: "method" },
          h("h3", {}, h("label", { for: "reason", text: "Escribir para qué lo necesitas" })),
          h("p", { id: "reason-help", text: `Una frase de verdad, de al menos ${REASON_MIN_CHARS} caracteres. Queda guardada solo en tu navegador.` }),
          ta, count, reasonOpen, reasonMsg
        )
      )
    )
  );
}

function formatTime(sec) {
  const s = Math.max(0, Math.ceil(sec));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

function runCountdown(totalSec, timerEl, barEl, msgEl, done) {
  let visibleMs = 0;
  let last = performance.now();
  let lastAnnouncedMin = Math.ceil(totalSec / 60);
  const id = setInterval(() => {
    const now = performance.now();
    if (document.visibilityState === "visible") visibleMs += now - last;
    last = now;
    const left = totalSec - visibleMs / 1000;
    timerEl.textContent = formatTime(left);
    barEl.style.width = `${Math.min(100, (visibleMs / 1000 / totalSec) * 100)}%`;
    const leftMin = Math.ceil(left / 60);
    if (leftMin < lastAnnouncedMin && left > 0) {
      lastAnnouncedMin = leftMin;
      announce(msgEl, `Quedan ${leftMin} ${leftMin === 1 ? "minuto" : "minutos"}.`);
    }
    if (left <= 0) { clearInterval(id); done(); }
  }, 250);
}

async function unlock(entry, payload, msgEl) {
  msgEl.textContent = "";
  const res = await chrome.runtime.sendMessage({ type: "unlock", entry, ...payload });
  if (!res || !res.ok) {
    msgEl.textContent = (res && res.error) || "No se pudo desbloquear.";
    return;
  }
  location.replace(target.href);
}

/* ---------- Inicio ---------- */

async function main() {
  renderHero();

  mountNotes($("#tasks"), {
    key: "tasks", title: "Tus tareas", placeholder: "Algo que quieres terminar hoy",
    checkable: true, emptyText: "Sin tareas por ahora. Anota la siguiente."
  });
  mountNotes($("#dreams"), {
    key: "dreams", title: "Tus sueños", placeholder: "Algo grande que quieres lograr",
    emptyText: "Escribe aquí lo que de verdad quieres lograr."
  });

  const quote = randomQuote();
  if (quote) {
    $("#quote-text").textContent = quote.text;
    $("#quote-author").textContent = quote.author;
    $("#quote").hidden = false;
  }

  const [{ settings }, adult] = await Promise.all([getState(), loadAdultDomains()]);
  pool = buildPool(settings, adult);
  shown = pickMany(pool, 3);
  renderCards();
  renderUnlock(settings);

  const today = dayKey();
  const stats = await updateStats(s => { s.hits[today] = (s.hits[today] || 0) + 1; });
  const n = stats.hits[today];
  $("#hits").textContent = n === 1 ? "Primera pausa de hoy" : `${n} pausas hoy`;
}

main();
