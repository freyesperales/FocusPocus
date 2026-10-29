/*
 * FocusPocus — traduce el estado a reglas dinámicas de declarativeNetRequest.
 *
 * Prioridades:
 *   3  adultos  (redirigir o bloquear; nada la anula)
 *   2  desbloqueos temporales (allow)
 *   1  redes y lista propia
 *
 * La acción «redirect» exige host permission sobre el dominio bloqueado.
 * Si falta, se usa «block», que no necesita permisos: el sitio no se abre,
 * aunque el navegador muestre su página de error en vez de la nuestra.
 */

import { activeRedes, entryParts, focusActive, hostHasAccess } from "./core.js";

const MAIN = ["main_frame"];

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function groupRules(cat, entries, priority, ctx, nextId) {
  const rules = [];
  const redirectTo = `${ctx.base}?c=${cat}#\\0`;
  const domainsOk = [];
  const domainsNoAccess = [];

  for (const entry of entries) {
    const { host, path } = entryParts(entry);
    const access = hostHasAccess(host, ctx.origins);
    if (!path) {
      (access ? domainsOk : domainsNoAccess).push(host);
      continue;
    }
    rules.push(access
      ? {
          id: nextId(), priority,
          action: { type: "redirect", redirect: { regexSubstitution: redirectTo } },
          condition: {
            regexFilter: `^https?://([^/]*\\.)?${escapeRe(host)}(:\\d+)?${escapeRe(path)}.*$`,
            resourceTypes: MAIN
          }
        }
      : {
          id: nextId(), priority,
          action: { type: "block" },
          condition: { urlFilter: `||${host}${path}`, resourceTypes: MAIN }
        });
  }

  if (domainsOk.length) {
    rules.push({
      id: nextId(), priority,
      action: { type: "redirect", redirect: { regexSubstitution: redirectTo } },
      condition: { requestDomains: domainsOk, regexFilter: "^.*$", resourceTypes: MAIN }
    });
  }
  if (domainsNoAccess.length) {
    rules.push({
      id: nextId(), priority,
      action: { type: "block" },
      condition: { requestDomains: domainsNoAccess, resourceTypes: MAIN }
    });
  }
  return rules;
}

export function buildRules({ settings, adultDomains, unlocks, origins, base, now = Date.now() }) {
  let id = 0;
  const nextId = () => ++id;
  const ctx = { origins, base };
  const rules = [];
  const active = focusActive(settings, new Date(now));

  if (settings.categories.adultos) rules.push(...groupRules("adultos", adultDomains, 3, ctx, nextId));
  if (active && settings.categories.redes) rules.push(...groupRules("redes", activeRedes(settings), 1, ctx, nextId));
  if (active && settings.categories.propia) rules.push(...groupRules("propia", settings.custom, 1, ctx, nextId));

  for (const [entry, until] of Object.entries(unlocks)) {
    if (!(until > now)) continue;
    const { host, path } = entryParts(entry);
    rules.push({
      id: nextId(), priority: 2,
      action: { type: "allow" },
      condition: path
        ? { urlFilter: `||${host}${path}`, resourceTypes: MAIN }
        : { requestDomains: [host], resourceTypes: MAIN }
    });
  }
  return rules;
}
