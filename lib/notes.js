/*
 * FocusPocus — listas de tareas y sueños.
 * La idea original de la extensión: al chocar con un bloqueo, ver lo que de
 * verdad quieres hacer. Se usa igual en la página de bloqueo, el popup y las opciones.
 */

import { sanitizeNotes, uid } from "./core.js";
import { h } from "./dom.js";

export function mountNotes(root, { key, title, placeholder, checkable = false, emptyText, headingLevel = "h2" }) {
  const inputId = `${key}-input-${Math.random().toString(36).slice(2, 7)}`;
  const list = h("ul", { class: "notes-list", "aria-label": title });
  const input = h("input", {
    id: inputId, type: "text", maxlength: "300", autocomplete: "off", placeholder
  });
  const form = h("form", { class: "notes-form" },
    h("label", { for: inputId, class: "sr-only", text: `Agregar a ${title.toLowerCase()}` }),
    input,
    h("button", { type: "submit", class: "btn btn-quiet", text: "Agregar" })
  );
  const section = h("section", { class: "notes", "data-key": key },
    h(headingLevel, { class: "notes-title", text: title }),
    form,
    list
  );
  root.replaceChildren(section);

  let items = [];

  async function save(next) {
    items = sanitizeNotes(next);
    await chrome.storage.local.set({ [key]: items });
  }

  function render() {
    list.replaceChildren();
    if (!items.length) {
      list.append(h("li", { class: "notes-empty", text: emptyText }));
      return;
    }
    for (const item of items) {
      const textId = `${key}-${item.id}`;
      const li = h("li", { class: "note" + (item.done ? " is-done" : "") });
      if (checkable) {
        li.append(h("input", {
          type: "checkbox", id: textId + "-c", checked: item.done,
          onchange: e => save(items.map(i => (i.id === item.id ? { ...i, done: e.target.checked } : i)))
        }));
        li.append(h("label", { for: textId + "-c", class: "note-text", text: item.text }));
      } else {
        li.append(h("span", { class: "note-text", text: item.text }));
      }
      li.append(h("button", {
        type: "button", class: "note-del", "aria-label": `Quitar «${item.text}»`, title: "Quitar",
        onclick: () => save(items.filter(i => i.id !== item.id))
      }, "×"));
      list.append(li);
    }
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    input.value = "";
    save([...items, { id: uid(), text, done: false }]);
    input.focus();
  });

  chrome.storage.local.get(key).then(d => { items = sanitizeNotes(d[key]); render(); });
  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes[key]) { items = sanitizeNotes(changes[key].newValue); render(); }
  });
}
