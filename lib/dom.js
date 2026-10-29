/* FocusPocus — utilidades mínimas de DOM. Todo texto entra por textContent. */

export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === false || v == null) continue;
    if (k === "class") el.className = v;
    else if (k === "text") el.textContent = v;
    else if (k.startsWith("on") && typeof v === "function") el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, String(v));
  }
  for (const c of children.flat()) {
    if (c == null || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

export function $(sel, root = document) {
  return root.querySelector(sel);
}

/* Anuncia un mensaje a lectores de pantalla y lo muestra si hay un contenedor visible. */
export function announce(el, text) {
  if (!el) return;
  el.textContent = "";
  // Un pequeño retraso garantiza que el cambio se anuncie aunque el texto se repita.
  setTimeout(() => { el.textContent = text; }, 30);
}
