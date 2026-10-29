/* FocusPocus — opciones */

import {
  DAY_SHORT, LIMITS, REASON_MIN_CHARS, clamp, describeWhen, entryParts, focusActive,
  getState, hostHasAccess, loadAdultDomains, loosens, nextScheduleChange, normalizeEntry,
  originFor, reasonIsValid, sanitizeNotes, sanitizeSettings, saveSettings, activeRedes, updateStats
} from "./lib/core.js";
import { CATEGORY_META, REDES } from "./lib/lists.js";
import { $, h } from "./lib/dom.js";
import { mountNotes } from "./lib/notes.js";

const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const DAY_ORDER = [1, 2, 3, 4, 5, 6, 0];

let cur = null;      // configuración guardada
let adult = [];
let origins = [];

/* ---------- Guardar, con puerta si afloja el bloqueo ---------- */

function unlockLoosens(a, b) {
  return b.unlock.waitMinutes < a.unlock.waitMinutes || b.unlock.durationMinutes > a.unlock.durationMinutes;
}

async function apply(next, what = "configuración") {
  const clean = sanitizeSettings(next);
  const needsGate = loosens(cur, clean, adult) || (focusActive(cur) && unlockLoosens(cur, clean));
  if (needsGate) {
    const reason = await gate();
    if (!reason) { renderAll(); return false; }
    await updateStats(s => s.reasons.push({ at: Date.now(), entry: what, method: "config", text: reason.slice(0, 500) }));
  }
  cur = clean;
  await saveSettings(clean);
  renderAll();
  return true;
}

function gate() {
  const dlg = $("#gate");
  const ta = $("#gate-reason");
  const ok = $("#gate-ok");
  const count = $("#gate-count");
  const msg = $("#gate-msg");
  ta.value = "";
  ok.disabled = true;
  count.textContent = `0 / ${REASON_MIN_CHARS}`;
  msg.textContent = "";
  const onInput = () => {
    const n = ta.value.trim().length;
    const valid = reasonIsValid(ta.value);
    count.textContent = `${n} / ${REASON_MIN_CHARS}`;
    ok.disabled = !valid;
    msg.textContent = n >= REASON_MIN_CHARS && !valid ? "Escribe una frase con sentido, de al menos seis palabras." : "";
  };
  ta.addEventListener("input", onInput);
  return new Promise(resolve => {
    dlg.addEventListener("close", () => {
      ta.removeEventListener("input", onInput);
      resolve(dlg.returnValue === "ok" && reasonIsValid(ta.value) ? ta.value.trim() : null);
    }, { once: true });
    dlg.returnValue = "";
    dlg.showModal();
    ta.focus();
  });
}

/* ---------- Categorías ---------- */

function switchRow(cat, extra) {
  const meta = CATEGORY_META[cat];
  const id = `cat-${cat}`;
  return h("article", { class: "cat" },
    h("div", { class: "cat-head" },
      h("div", {},
        h("h3", {}, h("label", { for: id, text: meta.label })),
        h("p", { id: id + "-desc", text: meta.desc }),
        extra.meta ? h("p", { class: "cat-meta", text: extra.meta }) : null
      ),
      h("input", {
        type: "checkbox", role: "switch", class: "switch", id,
        "aria-describedby": id + "-desc", checked: cur.categories[cat],
        onchange: e => apply({ ...cur, categories: { ...cur.categories, [cat]: e.target.checked } }, `categoría ${meta.label}`)
      })
    ),
    extra.body || null
  );
}

function renderCats() {
  const redesBody = h("fieldset", { class: "redes-list", disabled: !cur.categories.redes },
    h("legend", { text: "Sitios incluidos" }),
    ...REDES.map(r => h("label", { class: "check" },
      h("input", {
        type: "checkbox", checked: !cur.redesOff.includes(r.entry),
        onchange: e => {
          const off = new Set(cur.redesOff);
          e.target.checked ? off.delete(r.entry) : off.add(r.entry);
          apply({ ...cur, redesOff: [...off] }, r.entry);
        }
      }),
      h("span", {}, r.label, " ", h("small", { text: r.entry }))
    ))
  );
  $("#cats").replaceChildren(
    switchRow("adultos", { meta: `${adult.length} dominios, más cualquier sitio .xxx, .porn, .adult o .sex` }),
    switchRow("redes", { meta: `${activeRedes(cur).length} de ${REDES.length} activos`, body: redesBody }),
    switchRow("propia", { meta: `${cur.custom.length} ${cur.custom.length === 1 ? "sitio" : "sitios"}` })
  );
}

/* ---------- Horario ---------- */

function renderSchedule() {
  for (const r of document.querySelectorAll('input[name="mode"]')) r.checked = r.value === cur.mode;
  const off = cur.mode === "siempre";
  $("#schedule").setAttribute("aria-disabled", String(off));

  $("#days").replaceChildren(...DAY_ORDER.map(d => h("label", { class: "day" },
    h("input", {
      type: "checkbox", value: String(d), checked: cur.schedule.days.includes(d), disabled: off,
      "aria-label": DAY_NAMES[d],
      onchange: e => {
        const days = new Set(cur.schedule.days);
        e.target.checked ? days.add(d) : days.delete(d);
        apply({ ...cur, schedule: { ...cur.schedule, days: [...days] } }, "horario");
      }
    }),
    h("span", { "aria-hidden": "true", text: DAY_SHORT[d] })
  )));

  $("#start").value = cur.schedule.start;
  $("#end").value = cur.schedule.end;
  $("#start").disabled = off;
  $("#end").disabled = off;

  const now = new Date();
  let hint;
  if (off) hint = "Ahora mismo: bloqueo activo a toda hora.";
  else if (!cur.schedule.days.length) hint = "Sin días elegidos: redes y tu lista no se bloquean nunca.";
  else {
    const next = nextScheduleChange(cur, now);
    const active = focusActive(cur, now);
    hint = active
      ? `Ahora mismo: bloqueo activo. Termina ${next ? describeWhen(next, now) : "pronto"}.`
      : `Ahora mismo: fuera de horario. Empieza ${next ? describeWhen(next, now) : "pronto"}.`;
    if (cur.schedule.start > cur.schedule.end) hint += " Es un horario nocturno: cruza la medianoche.";
  }
  $("#schedule-hint").textContent = hint;
}

/* ---------- Tu lista ---------- */

function missingAccess() {
  const all = [
    ...(cur.categories.adultos ? adult : []),
    ...(cur.categories.redes ? activeRedes(cur) : []),
    ...cur.custom
  ];
  return [...new Set(all.map(e => entryParts(e).host))].filter(hst => !hostHasAccess(hst, origins));
}

function renderList() {
  const ul = $("#sites");
  if (!cur.custom.length) {
    ul.replaceChildren(h("li", { class: "empty", text: "Todavía no agregas sitios propios." }));
  } else {
    ul.replaceChildren(...cur.custom.map(entry => h("li", {},
      h("span", { text: entry }),
      h("button", {
        type: "button", class: "note-del", "aria-label": `Quitar ${entry} de tu lista`, title: "Quitar",
        onclick: () => apply({ ...cur, custom: cur.custom.filter(e => e !== entry) }, entry)
      }, "×")
    )));
  }

  const missing = missingAccess();
  const box = $("#perm");
  box.hidden = !missing.length;
  if (missing.length) {
    $("#perm-text").textContent = missing.length === 1
      ? `${missing[0]} se bloquea, pero con la página de error del navegador: falta el permiso para mostrar la página de FocusPocus.`
      : `${missing.length} sitios se bloquean con la página de error del navegador: falta el permiso para mostrar la página de FocusPocus.`;
  }
}

$("#perm-btn").addEventListener("click", () => {
  const list = missingAccess().map(hst => `*://*.${hst}/*`);
  if (list.length) chrome.permissions.request({ origins: list }).catch(() => false);
});

$("#add-site").addEventListener("submit", e => {
  e.preventDefault();
  const input = $("#site-input");
  const msg = $("#site-msg");
  msg.classList.remove("is-error");
  const entry = normalizeEntry(input.value);
  if (!entry) {
    msg.classList.add("is-error");
    msg.textContent = "Eso no parece un sitio web. Prueba con algo como ejemplo.com.";
    return;
  }
  if (cur.custom.includes(entry)) {
    msg.textContent = `${entry} ya está en tu lista.`;
    return;
  }
  // Se pide el permiso dentro del mismo gesto, antes de cualquier espera.
  if (!hostHasAccess(entryParts(entry).host, origins)) {
    chrome.permissions.request({ origins: [originFor(entry)] }).catch(() => false);
  }
  input.value = "";
  apply({ ...cur, custom: [...cur.custom, entry] }, entry).then(() => {
    msg.textContent = `${entry} agregado.`;
  });
});

/* ---------- Desbloqueo ---------- */

function renderUnlock() {
  $("#wait").value = cur.unlock.waitMinutes;
  $("#duration").value = cur.unlock.durationMinutes;
}

$("#wait").addEventListener("change", e => {
  apply({ ...cur, unlock: { ...cur.unlock, waitMinutes: clamp(e.target.value, LIMITS.waitMinutes) } }, "minutos de espera");
});
$("#duration").addEventListener("change", e => {
  apply({ ...cur, unlock: { ...cur.unlock, durationMinutes: clamp(e.target.value, LIMITS.durationMinutes) } }, "minutos de acceso");
});

/* ---------- Horario: eventos ---------- */

for (const r of document.querySelectorAll('input[name="mode"]')) {
  r.addEventListener("change", e => apply({ ...cur, mode: e.target.value }, "modo de horario"));
}
$("#start").addEventListener("change", e => {
  if (e.target.value) apply({ ...cur, schedule: { ...cur.schedule, start: e.target.value } }, "horario");
});
$("#end").addEventListener("change", e => {
  if (e.target.value) apply({ ...cur, schedule: { ...cur.schedule, end: e.target.value } }, "horario");
});

/* ---------- Datos ---------- */

async function renderReasons() {
  const { stats } = await getState();
  const ul = $("#reasons");
  const items = stats.reasons.slice().reverse().slice(0, 10);
  if (!items.length) {
    ul.replaceChildren(h("li", { class: "empty", text: "Sin desbloqueos todavía." }));
    return;
  }
  ul.replaceChildren(...items.map(r => {
    const when = new Date(r.at).toLocaleString("es", { dateStyle: "medium", timeStyle: "short" });
    const how = r.method === "wait" ? "esperó" : r.method === "config" ? "cambió la configuración" : "escribió";
    return h("li", {},
      h("small", { text: `${when} · ${r.entry} · ${how}` }),
      r.text ? r.text : "Desbloqueo tras la espera."
    );
  }));
}

$("#export").addEventListener("click", async () => {
  const { settings, tasks, dreams } = await getState();
  const data = { app: "FocusPocus", format: 1, exportedAt: new Date().toISOString(), settings, tasks, dreams };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = h("a", { href: url, download: `focuspocus-${new Date().toISOString().slice(0, 10)}.json` });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  $("#data-msg").textContent = "Configuración exportada.";
});

$("#import").addEventListener("change", async e => {
  const file = e.target.files[0];
  e.target.value = "";
  const msg = $("#data-msg");
  msg.classList.remove("is-error");
  if (!file) return;
  try {
    if (file.size > 1024 * 1024) throw new Error("El archivo es demasiado grande.");
    const data = JSON.parse(await file.text());
    if (!data || data.app !== "FocusPocus" || !data.settings) throw new Error("No es un archivo exportado desde FocusPocus.");
    const applied = await apply(data.settings, "importación");
    if (!applied) { msg.textContent = "Importación cancelada."; return; }
    const patch = {};
    if (Array.isArray(data.tasks)) patch.tasks = sanitizeNotes(data.tasks);
    if (Array.isArray(data.dreams)) patch.dreams = sanitizeNotes(data.dreams);
    await chrome.storage.local.set(patch);
    msg.textContent = "Configuración importada.";
  } catch (err) {
    msg.classList.add("is-error");
    msg.textContent = err instanceof SyntaxError ? "El archivo no es un JSON válido." : err.message;
  }
});

/* ---------- Inicio ---------- */

function renderAll() {
  renderCats();
  renderSchedule();
  renderList();
  renderUnlock();
}

async function main() {
  const [state, adultList, perms] = await Promise.all([getState(), loadAdultDomains(), chrome.permissions.getAll()]);
  cur = state.settings;
  adult = adultList;
  origins = perms.origins || [];
  renderAll();
  renderReasons();

  const { showWelcome } = await chrome.storage.local.get("showWelcome");
  if (showWelcome) {
    $("#welcome").hidden = false;
    chrome.storage.local.remove("showWelcome");
  }

  mountNotes($("#tasks"), { key: "tasks", title: "Tareas", placeholder: "Algo que quieres terminar", checkable: true, emptyText: "Sin tareas.", headingLevel: "h3" });
  mountNotes($("#dreams"), { key: "dreams", title: "Sueños", placeholder: "Algo grande que quieres lograr", emptyText: "Sin sueños anotados.", headingLevel: "h3" });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "local") return;
    if (changes.settings) { cur = sanitizeSettings(changes.settings.newValue); renderAll(); }
    if (changes.stats) renderReasons();
  });
  const refreshPerms = async () => { origins = (await chrome.permissions.getAll()).origins || []; renderList(); };
  chrome.permissions.onAdded.addListener(refreshPerms);
  chrome.permissions.onRemoved.addListener(refreshPerms);
  // El estado del horario cambia con la hora.
  setInterval(renderSchedule, 60 * 1000);
}

main();
