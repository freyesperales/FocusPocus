/*
 * FocusPocus — listas predefinidas.
 *
 * La categoría «adultos» parte de data/blocklist.json (copiado de Brújula)
 * y suma los dominios de ADULT_EXTRA. Cada dominio de estas listas debe
 * tener su host permission en manifest.json para que el bloqueo pueda
 * llevar a la página de sugerencias (si falta, el sitio se bloquea igual,
 * pero con la página de error del navegador).
 */

// Dominios de primer nivel completos: bloquean cualquier sitio *.xxx, etc.
export const ADULT_TLDS = ["xxx", "porn", "adult", "sex"];

export const ADULT_EXTRA = [
  "eporner.com",
  "txxx.com",
  "hqporner.com",
  "tnaflix.com",
  "motherless.com",
  "beeg.com",
  "porn.com",
  "youjizz.com",
  "tube8.com",
  "fansly.com",
  "livejasmin.com",
  "bongacams.com",
  "cam4.com",
  "camsoda.com",
  "myfreecams.com",
  "nhentai.net",
  "e-hentai.org"
];

// Redes y ocio. «on» indica si viene activado al instalar.
export const REDES = [
  { entry: "tiktok.com", label: "TikTok", on: true },
  { entry: "instagram.com", label: "Instagram", on: true },
  { entry: "youtube.com/shorts", label: "YouTube Shorts", on: true },
  { entry: "facebook.com", label: "Facebook", on: true },
  { entry: "x.com", label: "X", on: true },
  { entry: "twitter.com", label: "Twitter (dominio antiguo de X)", on: true },
  { entry: "threads.com", label: "Threads", on: true },
  { entry: "threads.net", label: "Threads (dominio antiguo)", on: true },
  { entry: "reddit.com", label: "Reddit", on: true },
  { entry: "snapchat.com", label: "Snapchat", on: true },
  { entry: "9gag.com", label: "9GAG", on: true },
  { entry: "twitch.tv", label: "Twitch", on: true },
  { entry: "kick.com", label: "Kick", on: true },
  { entry: "pinterest.com", label: "Pinterest", on: false },
  { entry: "youtube.com", label: "YouTube completo", on: false },
  { entry: "netflix.com", label: "Netflix", on: false },
  { entry: "primevideo.com", label: "Prime Video", on: false },
  { entry: "disneyplus.com", label: "Disney+", on: false }
];

export const CATEGORY_META = {
  adultos: {
    label: "Adultos",
    desc: "Pornografía, webcams y foros extremos. Siempre activa, a toda hora, y no se desbloquea desde la página de bloqueo."
  },
  redes: {
    label: "Redes y ocio",
    desc: "Feeds infinitos y video corto. Sigue el horario que elijas."
  },
  propia: {
    label: "Tu lista",
    desc: "Los sitios que agregues tú. Sigue el horario que elijas."
  }
};

// Categorías del catálogo que no se proponen como alternativa: son ocio puro.
export const DISCOVER_EXCLUDED = ["ocio"];
