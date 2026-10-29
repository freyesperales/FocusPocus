/*
 * The Fun Dude — catálogo de la buena internet
 * ---------------------------------------------
 * Cada categoría: { id, label, icon, color, intro, sites: [...] }
 * Cada sitio: { name, url, desc, emoji }
 * El "intro" es la voz del Fun Dude presentando la sección.
 */

const CATEGORIES = [
  {
    id: "aleatorio", label: "Descubrir al azar", icon: "🎲", color: "#ff5a1f",
    intro: "Cierra los ojos, pulsa el dado y déjate llevar. Aquí no se busca: uno se tropieza con maravillas.",
    sites: [
      { name: "Wikipedia aleatoria", url: "https://es.wikipedia.org/wiki/Especial:Aleatoria", desc: "Un artículo al azar. Haz clic en todo lo que no entiendas.", emoji: "📖", random: true },
      { name: "Wiby — Surprise Me", url: "https://wiby.me/surprise/", desc: "Te lanza a una web pequeña y antigua al azar.", emoji: "🎁", random: true },
      { name: "Marginalia Search", url: "https://search.marginalia.nu/", desc: "Buscador que premia lo raro, personal y sin SEO.", emoji: "🔦" },
      { name: "The Useless Web", url: "https://theuselessweb.com/", desc: "Un botón que te teletransporta a un rincón absurdo de internet.", emoji: "🌀", random: true },
      { name: "Cloudhiker", url: "https://cloudhiker.net/", desc: "Heredero de StumbleUpon: descubre webs curadas al azar.", emoji: "🥾", random: true },
      { name: "Depths of Wikipedia", url: "https://www.instagram.com/depthsofwikipedia/", desc: "Los rincones más absurdos y hermosos de la enciclopedia.", emoji: "🌊" },
      { name: "Six Degrees of Wikipedia", url: "https://www.sixdegreesofwikipedia.com/", desc: "El camino más corto entre dos artículos cualesquiera.", emoji: "🕸️" }
    ]
  },
  {
    id: "mundo", label: "Sentir el mundo", icon: "🌍", color: "#0f9d94",
    intro: "Un billete gratis a cualquier rincón del planeta. Sin aeropuertos, sin colas, sin equipaje.",
    sites: [
      { name: "Radio Garden", url: "https://radio.garden/", desc: "Un globo con miles de radios en vivo. Escucha Ulán Bator.", emoji: "📻" },
      { name: "Radiooooo", url: "https://radiooooo.com/", desc: "Como Radio Garden pero viajando en el tiempo: país + década.", emoji: "⏳" },
      { name: "Window Swap", url: "https://www.window-swap.com/", desc: "Mira por la ventana de un desconocido durante un minuto.", emoji: "🪟" },
      { name: "earth.nullschool", url: "https://earth.nullschool.net/", desc: "El viento y las corrientes del planeta moviéndose en vivo.", emoji: "🌬️" },
      { name: "Drive & Listen", url: "https://driveandlisten.herokuapp.com/", desc: "Conduce por Tokio o Praga con la radio local de fondo.", emoji: "🚗" },
      { name: "Flightradar24", url: "https://www.flightradar24.com/", desc: "Cada avión del planeta volando ahora mismo.", emoji: "✈️" },
      { name: "Atlas Obscura", url: "https://www.atlasobscura.com/", desc: "Los lugares más extraños y hermosos del planeta.", emoji: "🗺️" }
    ]
  },
  {
    id: "aprender", label: "Aprender", icon: "🧠", color: "#2f6bff",
    intro: "Estos sitios te van a hacer sentir más listo saliendo que entrando. Palabra del Dude.",
    sites: [
      { name: "Neal.fun", url: "https://neal.fun/", desc: "Ensayos-juego que hacen tangible lo inimaginable. Empieza aquí.", emoji: "✨" },
      { name: "Bartosz Ciechanowski", url: "https://ciechanow.ski/", desc: "Ensayos interactivos sobre cómo funciona todo. Son arte.", emoji: "⚙️" },
      { name: "Nicky Case", url: "https://ncase.me/", desc: "Juegos-ensayo para entender ideas complejas jugando.", emoji: "🎮" },
      { name: "Explorable Explanations", url: "https://explorabl.es/", desc: "La colección madre de ensayos interactivos jugables.", emoji: "🧩" },
      { name: "Red Blob Games", url: "https://www.redblobgames.com/", desc: "Algoritmos y matemáticas con diagramas que puedes tocar.", emoji: "🔺" },
      { name: "Seeing Theory", url: "https://seeing-theory.brown.edu/", desc: "Estadística y probabilidad explicadas visualmente.", emoji: "📊" },
      { name: "The Pudding", url: "https://pudding.cool/", desc: "Ensayos visuales de datos sobre cultura.", emoji: "🍮" },
      { name: "Quanta Magazine", url: "https://www.quantamagazine.org/", desc: "La mejor divulgación de matemáticas y física de hoy.", emoji: "🔬" },
      { name: "Khan Academy", url: "https://es.khanacademy.org/", desc: "Matemáticas, ciencia y economía desde cero, gratis.", emoji: "🎓" }
    ]
  },
  {
    id: "lectura", label: "Lectura larga", icon: "✍️", color: "#7d4bd0",
    intro: "Para cuando estás harto de textos de 280 caracteres y quieres algo con alma y respiración.",
    sites: [
      { name: "Aeon", url: "https://aeon.co/", desc: "Ensayos largos sobre filosofía, ciencia y cultura.", emoji: "🏛️" },
      { name: "Nautilus", url: "https://nautil.us/", desc: "Ciencia contada como historias, no como titulares.", emoji: "🐚" },
      { name: "Works in Progress", url: "https://worksinprogress.co/", desc: "Ideas sobre progreso, ciencia y cómo mejora el mundo.", emoji: "🛠️" },
      { name: "The Marginalian", url: "https://www.themarginalian.org/", desc: "Maria Popova destilando lo mejor de la humanidad.", emoji: "🕯️" },
      { name: "Wait But Why", url: "https://waitbutwhy.com/", desc: "30 páginas y monigotes para explicarte el universo.", emoji: "🤔" },
      { name: "Kottke.org", url: "https://kottke.org/", desc: "Uno de los blogs más antiguos, aún vivo. Curiosidad diaria.", emoji: "📰" },
      { name: "Low-Tech Magazine", url: "https://solar.lowtechmagazine.com/", desc: "Revista alojada con energía solar. A veces offline. Poesía.", emoji: "🔆" }
    ]
  },
  {
    id: "historia", label: "Rescatado del pasado", icon: "📚", color: "#b7791f",
    intro: "El desván de la humanidad, con la puerta abierta de par en par. Pasa y fisgonea sin miedo.",
    sites: [
      { name: "Internet Archive", url: "https://archive.org/", desc: "La biblioteca de todo: libros, sonidos, webs, software.", emoji: "🏛️" },
      { name: "Public Domain Review", url: "https://publicdomainreview.org/", desc: "Arte, mapas y curiosidades rescatados de la historia.", emoji: "🖼️" },
      { name: "David Rumsey Maps", url: "https://www.davidrumsey.com/", desc: "Cientos de miles de mapas antiguos en alta resolución.", emoji: "🧭" },
      { name: "Letters of Note", url: "https://lettersofnote.com/", desc: "Cartas reales de gente real a lo largo de la historia.", emoji: "✉️" },
      { name: "Europeana", url: "https://www.europeana.eu/", desc: "El patrimonio cultural de Europa, digitalizado y abierto.", emoji: "🏺" }
    ]
  },
  {
    id: "buscadores", label: "Buscadores curiosos", icon: "🔍", color: "#2e9e5b",
    intro: "Google te enseña tiendas. Estos te enseñan personas. Nota la diferencia y no vuelvas atrás.",
    sites: [
      { name: "Marginalia Search", url: "https://search.marginalia.nu/", desc: "Premia páginas raras, personales, sin SEO.", emoji: "🔦" },
      { name: "Wiby", url: "https://wiby.me/", desc: "Busca en la 'web pequeña' y antigua.", emoji: "🕰️" },
      { name: "Stract", url: "https://stract.com/", desc: "Buscador open source con filtros para la web no comercial.", emoji: "🧪" },
      { name: "Mwmbl", url: "https://mwmbl.org/", desc: "Buscador sin ánimo de lucro, curado por su comunidad.", emoji: "🐝" },
      { name: "Search My Site", url: "https://searchmysite.net/", desc: "Indexa solo webs personales e independientes.", emoji: "🏠" }
    ]
  },
  {
    id: "alma", label: "El barrio con alma", icon: "🏘️", color: "#e0609a",
    intro: "La internet hecha a mano, de barrio, antes de que todo fuera una valla publicitaria gigante.",
    sites: [
      { name: "Neocities", url: "https://neocities.org/browse", desc: "Miles de webs personales hechas a mano, como los 2000.", emoji: "🌸" },
      { name: "Midnight.pub", url: "https://midnight.pub/", desc: "Un 'bar' nocturno de la web pequeña donde la gente escribe.", emoji: "🍺" },
      { name: "Bear Blog — Discover", url: "https://bearblog.dev/discover/", desc: "Blogs minimalistas y sin rastreo. Gente escribiendo de verdad.", emoji: "🐻" },
      { name: "Hacker News", url: "https://news.ycombinator.com/", desc: "Comunidad donde la gente todavía piensa en voz alta.", emoji: "💬" },
      { name: "Lobsters", url: "https://lobste.rs/", desc: "Como HN pero más pequeño y cuidado. Tecnología y cómputo.", emoji: "🦞" },
      { name: "MetaFilter", url: "https://www.metafilter.com/", desc: "Una de las comunidades más antiguas y humanas de la web.", emoji: "🧵" },
      { name: "512kb.club", url: "https://512kb.club/", desc: "Webs tan ligeras que pesan menos que una foto.", emoji: "🪶" }
    ]
  },
  {
    id: "ambiente", label: "Ambiente y enfoque", icon: "🎧", color: "#4756c9",
    intro: "Sube el volumen, baja el mundo. Sonidos para concentrarte, respirar o simplemente estar.",
    sites: [
      { name: "A Soft Murmur", url: "https://asoftmurmur.com/", desc: "Mezcla tu propia lluvia, fuego y truenos para concentrarte.", emoji: "🌧️" },
      { name: "Noisli", url: "https://www.noisli.com/", desc: "Sonidos de fondo para trabajar o relajarte.", emoji: "🍃" },
      { name: "SomaFM", url: "https://somafm.com/", desc: "Radio independiente, sin anuncios, curada por humanos.", emoji: "📡" },
      { name: "Poolsuite FM", url: "https://poolsuite.net/", desc: "Radio retro veraniega. Una máquina del tiempo sonora.", emoji: "🌴" }
    ]
  },
  {
    id: "ciberseguridad", label: "Ciberseguridad y hacking", icon: "🛡️", color: "#d13b3b",
    intro: "Aprende a defender —y a entender— el lado hacker de la red. Con ética, colega. Siempre con ética.",
    sites: [
      { name: "TryHackMe", url: "https://tryhackme.com/", desc: "Aprende hacking ético paso a paso, en el navegador.", emoji: "🧑‍💻" },
      { name: "Hack The Box", url: "https://www.hackthebox.com/", desc: "Laboratorios para practicar pentesting real.", emoji: "📦" },
      { name: "OverTheWire", url: "https://overthewire.org/wargames/", desc: "Wargames clásicos para aprender seguridad jugando.", emoji: "🎯" },
      { name: "PortSwigger Academy", url: "https://portswigger.net/web-security", desc: "El curso gratuito de seguridad web más respetado.", emoji: "🕷️" },
      { name: "picoCTF", url: "https://picoctf.org/", desc: "Retos de captura-la-bandera para empezar en CTFs.", emoji: "🚩" },
      { name: "CTFtime", url: "https://ctftime.org/", desc: "Calendario mundial de competiciones de hacking.", emoji: "📅" },
      { name: "The Hacker News", url: "https://thehackernews.com/", desc: "Noticias de ciberseguridad al día.", emoji: "📰" },
      { name: "Krebs on Security", url: "https://krebsonsecurity.com/", desc: "Investigación profunda sobre cibercrimen.", emoji: "🔎" },
      { name: "Have I Been Pwned", url: "https://haveibeenpwned.com/", desc: "¿Tu correo ha sido filtrado? Compruébalo.", emoji: "🔓" }
    ]
  },
  {
    id: "codejuegos", label: "Jugar programando", icon: "👾", color: "#6aa923",
    intro: "Programar puede ser un juego. Literalmente. Sube de nivel escribiendo código y ni lo notas.",
    sites: [
      { name: "Advent of Code", url: "https://adventofcode.com/", desc: "Puzzles de programación con historia, cada diciembre.", emoji: "🎄" },
      { name: "Codewars", url: "https://www.codewars.com/", desc: "Sube de nivel resolviendo katas de código.", emoji: "🥋" },
      { name: "Exercism", url: "https://exercism.org/", desc: "Practica más de 70 lenguajes con mentores humanos.", emoji: "🏋️" },
      { name: "CodinGame", url: "https://www.codingame.com/", desc: "Programa bots y resuelve juegos con código.", emoji: "🤖" },
      { name: "Project Euler", url: "https://projecteuler.net/", desc: "Problemas matemáticos que se resuelven programando.", emoji: "➗" },
      { name: "CSS Diner", url: "https://flukeout.github.io/", desc: "Aprende selectores CSS jugando.", emoji: "🍽️" },
      { name: "Flexbox Froggy", url: "https://flexboxfroggy.com/", desc: "Domina Flexbox moviendo ranas.", emoji: "🐸" },
      { name: "Regex Crossword", url: "https://regexcrossword.com/", desc: "Crucigramas resueltos con expresiones regulares.", emoji: "🔤" },
      { name: "Vim Adventures", url: "https://vim-adventures.com/", desc: "Aprende Vim como si fuera un Zelda.", emoji: "⌨️" }
    ]
  },
  {
    id: "ocio", label: "Ocio y juegos rápidos", icon: "🕹️", color: "#c23bb8",
    intro: "Diez minutos de diversión honesta. Ni feeds infinitos ni trampas: juegas, sonríes y te vas.",
    sites: [
      { name: "Lichess", url: "https://lichess.org/", desc: "Ajedrez libre y gratis, con puzzles diarios.", emoji: "♟️" },
      { name: "OpenGuessr", url: "https://openguessr.com/", desc: "Adivina dónde estás en el mundo por Street View.", emoji: "🗺️" },
      { name: "La palabra del día", url: "https://lapalabradeldia.com/", desc: "El Wordle en español: una palabra cada día.", emoji: "🔡" },
      { name: "Globle", url: "https://globle-game.com/", desc: "Adivina el país misterioso por cercanía.", emoji: "🌐" },
      { name: "2048", url: "https://play2048.co/", desc: "El clásico adictivo de sumar hasta 2048.", emoji: "🔢" },
      { name: "Wikitrivia", url: "https://wikitrivia.tomjwatson.com/", desc: "Ordena eventos históricos en una línea de tiempo.", emoji: "🃏" },
      { name: "Higher Lower Game", url: "https://www.higherlowergame.com/", desc: "¿Qué se busca más en Google? Adivina.", emoji: "📈" },
      { name: "Sudoku", url: "https://sudoku.com/", desc: "Sudoku para despejar la mente.", emoji: "🔟" }
    ]
  },
  {
    id: "pensamiento", label: "Pensar mejor", icon: "💡", color: "#c9971f",
    intro: "Gimnasio para la cabeza. Sales pensando mejor, decidiendo mejor y, con suerte, viviendo mejor.",
    sites: [
      { name: "Farnam Street", url: "https://fs.blog/", desc: "Modelos mentales para pensar con más claridad.", emoji: "🧠" },
      { name: "Paul Graham", url: "https://www.paulgraham.com/articles.html", desc: "Ensayos sobre ideas, trabajo y vida.", emoji: "✒️" },
      { name: "Gwern", url: "https://gwern.net/", desc: "Ensayos larguísimos y rigurosos sobre casi todo.", emoji: "📜" },
      { name: "Daily Stoic", url: "https://dailystoic.com/", desc: "Estoicismo aplicado a la vida diaria.", emoji: "🏛️" },
      { name: "Psyche", url: "https://psyche.co/", desc: "Guías para vivir con más sentido y profundidad.", emoji: "🦋" },
      { name: "LessWrong", url: "https://www.lesswrong.com/", desc: "Comunidad sobre racionalidad y buenas decisiones.", emoji: "🤨" },
      { name: "Clearer Thinking", url: "https://www.clearerthinking.org/", desc: "Tests y herramientas para decidir mejor.", emoji: "⚖️" }
    ]
  },
  {
    id: "noticias", label: "Informarse con cabeza", icon: "🗞️", color: "#547089",
    intro: "Enterarte del mundo sin que te suba la tensión. Hechos, no gritos. Contexto, no titulares cebo.",
    sites: [
      { name: "DW en español", url: "https://www.dw.com/es/", desc: "Noticias internacionales desde Alemania.", emoji: "🇩🇪" },
      { name: "Reuters", url: "https://www.reuters.com/", desc: "Agencia de noticias: hechos, sin ruido.", emoji: "📡" },
      { name: "AP News", url: "https://apnews.com/", desc: "Periodismo de agencia, directo y sobrio.", emoji: "🗽" },
      { name: "BBC Mundo", url: "https://www.bbc.com/mundo", desc: "Actualidad global en español.", emoji: "🌍" },
      { name: "The Conversation", url: "https://theconversation.com/global", desc: "Académicos explican la actualidad.", emoji: "🎓" },
      { name: "France 24", url: "https://www.france24.com/es/", desc: "Noticias internacionales en español.", emoji: "🇫🇷" },
      { name: "Ground News", url: "https://ground.news/", desc: "Compara el sesgo de cada medio en una noticia.", emoji: "⚖️" }
    ]
  },
  {
    id: "herramientas", label: "Herramientas que ahorran horas", icon: "🛠️", color: "#1f7a8c",
    intro: "Menos fricción, más magia: estas apps hacen el trabajo aburrido para que tú brilles en lo bueno.",
    sites: [
      { name: "Notion", url: "https://www.notion.com/", desc: "Notas, docs y bases de datos en un solo lugar bonito", emoji: "📝" },
      { name: "Obsidian", url: "https://obsidian.md/", desc: "Tu segundo cerebro en notas enlazadas y locales", emoji: "🧠" },
      { name: "Figma", url: "https://www.figma.com/", desc: "Diseña y prototipa en equipo, todo en el navegador", emoji: "🎨" },
      { name: "Canva", url: "https://www.canva.com/", desc: "Diseños que lucen pro sin ser diseñador", emoji: "✨" },
      { name: "Excalidraw", url: "https://excalidraw.com/", desc: "Diagramas a mano alzada, rápidos y sin cuenta", emoji: "✏️" },
      { name: "tldraw", url: "https://www.tldraw.com/", desc: "Pizarra infinita para pensar dibujando", emoji: "⬜" },
      { name: "Photopea", url: "https://www.photopea.com/", desc: "El editor de imágenes gratis que corre en tu pestaña", emoji: "🖼️" },
      { name: "remove.bg", url: "https://www.remove.bg/", desc: "Quita el fondo de cualquier foto en un clic", emoji: "🪄" },
      { name: "iLovePDF", url: "https://www.ilovepdf.com/", desc: "Une, divide y comprime PDFs sin dramas", emoji: "📄" },
      { name: "TinyWow", url: "https://tinywow.com/", desc: "Decenas de utilidades gratis para archivos y PDFs", emoji: "🧰" },
      { name: "Cleanup.pictures", url: "https://cleanup.pictures/", desc: "Borra objetos molestos de tus fotos con IA", emoji: "🧽" },
      { name: "Carrd", url: "https://carrd.co/", desc: "Tu landing de una página lista en minutos", emoji: "🌐" },
      { name: "Raycast", url: "https://www.raycast.com/", desc: "Lanzador que acelera todo tu equipo con atajos", emoji: "🚀" },
      { name: "Miro", url: "https://miro.com/", desc: "Pizarra colaborativa para lluvias de ideas sin límite", emoji: "🧩" },
      { name: "Trello", url: "https://trello.com/", desc: "Organiza proyectos con tarjetas que se arrastran solas", emoji: "📋" }
    ]
  },
  {
    id: "ia", label: "Inteligencia artificial útil", icon: "🤖", color: "#7b3fe4",
    intro: "La IA no viene a quitarte el trabajo, viene a hacerte imparable: aquí las que de verdad valen la pena.",
    sites: [
      { name: "ChatGPT", url: "https://chatgpt.com/", desc: "El asistente que responde, redacta y resuelve al vuelo", emoji: "💬" },
      { name: "Claude", url: "https://claude.ai/", desc: "IA brillante para escribir, analizar y programar con calma", emoji: "🧡" },
      { name: "Perplexity", url: "https://www.perplexity.ai/", desc: "Buscador con IA que cita sus fuentes de verdad", emoji: "🔎" },
      { name: "Hugging Face", url: "https://huggingface.co/", desc: "La casa abierta de los modelos de IA del mundo", emoji: "🤗" },
      { name: "Midjourney", url: "https://www.midjourney.com/", desc: "Imágenes de otro planeta a partir de tus palabras", emoji: "🌌" },
      { name: "Suno", url: "https://suno.com/", desc: "Crea canciones completas describiendo lo que imaginas", emoji: "🎵" },
      { name: "ElevenLabs", url: "https://elevenlabs.io/", desc: "Voces con IA tan reales que engañan al oído", emoji: "🎙️" },
      { name: "NotebookLM", url: "https://notebooklm.google.com/", desc: "Convierte tus documentos en resúmenes y pódcast", emoji: "📓" },
      { name: "Ideogram", url: "https://ideogram.ai/", desc: "IA que por fin escribe texto legible en imágenes", emoji: "🔤" },
      { name: "Krea", url: "https://www.krea.ai/", desc: "Genera y edita imágenes en tiempo real, jugando", emoji: "⚡" },
      { name: "Gamma", url: "https://gamma.app/", desc: "Presentaciones y webs que se arman solas con IA", emoji: "📊" },
      { name: "Poe", url: "https://poe.com/", desc: "Muchos modelos de IA reunidos en una sola app", emoji: "🐦" },
      { name: "DeepL", url: "https://www.deepl.com/", desc: "El traductor con el toque más natural que existe", emoji: "🌍" },
      { name: "Runway", url: "https://runwayml.com/", desc: "Estudio de video con IA para crear escenas de cine", emoji: "🎬" }
    ]
  },
  {
    id: "programar", label: "Aprender a programar", icon: "💻", color: "#2b8a3e",
    intro: "Del primer «hola mundo» a construir lo que sueñas: aquí se aprende a programar en serio y gratis.",
    sites: [
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org/", desc: "Aprende a programar gratis con proyectos y certificados", emoji: "🔥" },
      { name: "The Odin Project", url: "https://www.theodinproject.com/", desc: "Ruta completa y gratis para ser dev full-stack", emoji: "⚔️" },
      { name: "MDN Web Docs", url: "https://developer.mozilla.org/", desc: "La biblia de la web: HTML, CSS y JavaScript", emoji: "📚" },
      { name: "roadmap.sh", url: "https://roadmap.sh/", desc: "Mapas visuales para saber qué aprender y cuándo", emoji: "🗺️" },
      { name: "GitHub", url: "https://github.com/", desc: "Donde vive, se comparte y crece todo el código", emoji: "🐙" },
      { name: "Stack Overflow", url: "https://stackoverflow.com/", desc: "La comunidad que resuelve cualquier error que tengas", emoji: "💡" },
      { name: "Frontend Mentor", url: "https://www.frontendmentor.io/", desc: "Practica maquetando retos reales de diseño", emoji: "🎯" },
      { name: "CodePen", url: "https://codepen.io/", desc: "Prueba y presume tus ideas de frontend al instante", emoji: "🖊️" },
      { name: "Replit", url: "https://replit.com/", desc: "Programa en el navegador sin instalar nada", emoji: "🌀" },
      { name: "Regex101", url: "https://regex101.com/", desc: "Prueba y entiende tus expresiones regulares sin sufrir", emoji: "🔣" },
      { name: "Can I Use", url: "https://caniuse.com/", desc: "Comprueba qué navegadores soportan cada función", emoji: "✅" },
      { name: "JavaScript.info", url: "https://javascript.info/", desc: "El tutorial moderno de JavaScript, de cero a experto", emoji: "📘" },
      { name: "W3Schools", url: "https://www.w3schools.com/", desc: "Referencias y ejemplos rápidos para empezar ya", emoji: "🏫" },
      { name: "Josh Comeau", url: "https://www.joshwcomeau.com/", desc: "CSS y React explicados con cariño e interactividad", emoji: "🌈" },
      { name: "CSS-Tricks", url: "https://css-tricks.com/", desc: "Trucos y guías para dominar el CSS a fondo", emoji: "🎩" },
      { name: "Scrimba", url: "https://scrimba.com/", desc: "Cursos interactivos donde editas el código del profe", emoji: "▶️" }
    ]
  },
  {
    id: "diseno", label: "Diseño e inspiración", icon: "🎨", color: "#d6336c",
    intro: "Alimenta tu ojo y roba como artista: aquí vive lo más bonito de la web para inspirarte sin culpa.",
    sites: [
      { name: "Awwwards", url: "https://www.awwwards.com/", desc: "Los sitios web mejor diseñados del planeta", emoji: "🏆" },
      { name: "Dribbble", url: "https://dribbble.com/", desc: "El escaparate donde los diseñadores presumen ideas", emoji: "🏀" },
      { name: "Behance", url: "https://www.behance.net/", desc: "Portafolios creativos de todo el mundo en un lugar", emoji: "🖌️" },
      { name: "Godly", url: "https://godly.website/", desc: "Inspiración web curada de altísimo nivel", emoji: "😇" },
      { name: "Land-book", url: "https://land-book.com/", desc: "Galería enorme de landing pages que convierten", emoji: "📖" },
      { name: "Mobbin", url: "https://mobbin.com/", desc: "Miles de pantallas reales de apps para inspirarte", emoji: "📱" },
      { name: "Refactoring UI", url: "https://www.refactoringui.com/", desc: "Aprende diseño de interfaces con reglas prácticas", emoji: "🔧" },
      { name: "Coolors", url: "https://coolors.co/", desc: "Genera paletas de color perfectas en segundos", emoji: "🎨" },
      { name: "Realtime Colors", url: "https://www.realtimecolors.com/", desc: "Prueba tus colores sobre una web real al instante", emoji: "🌈" },
      { name: "Type Scale", url: "https://typescale.com/", desc: "Arma jerarquías tipográficas con proporciones justas", emoji: "🔠" },
      { name: "Fonts In Use", url: "https://fontsinuse.com/", desc: "Descubre qué tipografías usan los grandes diseños", emoji: "🔡" },
      { name: "Google Fonts", url: "https://fonts.google.com/", desc: "Cientos de tipografías gratis listas para usar", emoji: "🅰️" },
      { name: "Unsplash", url: "https://unsplash.com/", desc: "Fotos preciosas y gratuitas para lo que imagines", emoji: "📷" },
      { name: "Pexels", url: "https://www.pexels.com/", desc: "Fotos y videos libres de derechos, de sobra", emoji: "🎞️" },
      { name: "The Noun Project", url: "https://thenounproject.com/", desc: "Iconos para absolutamente cualquier concepto", emoji: "🔷" },
      { name: "Lucide", url: "https://lucide.dev/", desc: "Iconos abiertos, limpios y bellísimos para tu UI", emoji: "🪶" }
    ]
  },
  {
    id: "productos", label: "Descubrir productos y startups", icon: "🚀", color: "#e8590c",
    intro: "Aquí huele a idea recién horneada: asómate y roba inspiración de quienes ya se lanzaron.",
    sites: [
      { name: "Product Hunt", url: "https://www.producthunt.com/", desc: "Los lanzamientos del día votados por la comunidad tech mundial.", emoji: "😺" },
      { name: "Indie Hackers", url: "https://www.indiehackers.com/", desc: "Historias reales de gente que construye negocios en solitario.", emoji: "🛠️" },
      { name: "BetaList", url: "https://betalist.com/", desc: "Startups en fase beta antes de que sean famosas.", emoji: "🐣" },
      { name: "There Is An AI For That", url: "https://theresanaiforthat.com/", desc: "El buscador que te encuentra una IA para cualquier antojo.", emoji: "🤖" },
      { name: "AlternativeTo", url: "https://alternativeto.net/", desc: "Cambia cualquier app por una alternativa mejor o gratis.", emoji: "🔁" },
      { name: "SaaSHub", url: "https://www.saashub.com/", desc: "Directorio de software con alternativas y reseñas honestas.", emoji: "📚" },
      { name: "Futurepedia", url: "https://www.futurepedia.io/", desc: "Enciclopedia viva de herramientas de inteligencia artificial.", emoji: "🔮" },
      { name: "Toolfinder", url: "https://toolfinder.co/", desc: "Herramientas de productividad elegidas a mano, sin relleno.", emoji: "🧰" },
      { name: "Uneed", url: "https://www.uneed.best/", desc: "Los mejores productos digitales curados cada día.", emoji: "✨" },
      { name: "Y Combinator", url: "https://www.ycombinator.com/", desc: "La aceleradora legendaria y su tesoro de ensayos startuperos.", emoji: "🟠" },
      { name: "Startup School", url: "https://www.startupschool.org/", desc: "Curso gratis de YC para pasar de idea a empresa.", emoji: "🎒" },
      { name: "Failory", url: "https://www.failory.com/", desc: "Autopsias de startups que fracasaron para que tú no repitas.", emoji: "💀" },
      { name: "Starter Story", url: "https://www.starterstory.com/", desc: "Cómo fundadores reales llegaron a sus primeros ingresos.", emoji: "📈" },
      { name: "Trends.vc", url: "https://trends.vc/", desc: "Reportes de tendencias y oportunidades de negocio emergentes.", emoji: "🌊" }
    ]
  },
  {
    id: "cursos", label: "Cursos y universidad gratis", icon: "🎓", color: "#1c7ed6",
    intro: "La mejor universidad del mundo está abierta, es gratis y no pide examen de admisión.",
    sites: [
      { name: "Coursera", url: "https://www.coursera.org/", desc: "Cursos de universidades top, muchos gratis para auditar.", emoji: "🎓" },
      { name: "edX", url: "https://www.edx.org/", desc: "Clases de Harvard, MIT y más, abiertas para todo el mundo.", emoji: "🏛️" },
      { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu/", desc: "Todo el MIT publicado gratis: apuntes, exámenes y vídeos.", emoji: "🧠" },
      { name: "CS50", url: "https://cs50.harvard.edu/", desc: "La mítica intro a la informática de Harvard, adictiva y gratis.", emoji: "💻" },
      { name: "Class Central", url: "https://www.classcentral.com/", desc: "Buscador de miles de cursos online gratis en un solo sitio.", emoji: "🔎" },
      { name: "Open Yale Courses", url: "https://oyc.yale.edu/", desc: "Clases completas de Yale en vídeo, sin coste ni registro.", emoji: "🐶" },
      { name: "Saylor Academy", url: "https://www.saylor.org/", desc: "Cursos gratis con certificado y créditos universitarios.", emoji: "📜" },
      { name: "Codecademy", url: "https://www.codecademy.com/", desc: "Aprende a programar tecleando código desde el navegador.", emoji: "⌨️" },
      { name: "Brilliant", url: "https://brilliant.org/", desc: "Mates y ciencia que se aprenden jugando y razonando.", emoji: "💡" },
      { name: "Stanford Online", url: "https://online.stanford.edu/", desc: "Cursos y charlas abiertas directas desde Stanford.", emoji: "🌲" },
      { name: "FutureLearn", url: "https://www.futurelearn.com/", desc: "Cursos sociales de universidades británicas y del mundo.", emoji: "🌍" },
      { name: "OpenLearn", url: "https://www.open.edu/openlearn/", desc: "La Open University británica regala cientos de cursos.", emoji: "📖" },
      { name: "Kaggle Learn", url: "https://www.kaggle.com/learn", desc: "Micro-cursos rápidos de datos e IA con práctica real.", emoji: "📊" },
      { name: "Sololearn", url: "https://www.sololearn.com/", desc: "Programación en píldoras diarias desde el móvil.", emoji: "📱" },
      { name: "Google Skillshop", url: "https://skillshop.withgoogle.com/", desc: "Formación oficial de Google con certificados gratis.", emoji: "🅶" }
    ]
  },
  {
    id: "idiomas", label: "Aprender idiomas", icon: "🗣️", color: "#f08c00",
    intro: "Un idioma nuevo son unos ojos nuevos: aquí tienes con qué destrabar la lengua sin gastar.",
    sites: [
      { name: "Duolingo", url: "https://www.duolingo.com/", desc: "El búho que te engancha a practicar idiomas cada día.", emoji: "🦉" },
      { name: "Anki", url: "https://apps.ankiweb.net/", desc: "Tarjetas con repetición espaciada para no olvidar nada.", emoji: "🃏" },
      { name: "Language Reactor", url: "https://www.languagereactor.com/", desc: "Aprende con subtítulos dobles en Netflix y YouTube.", emoji: "⚛️" },
      { name: "LingQ", url: "https://www.lingq.com/", desc: "Aprende leyendo y escuchando contenido real que te gusta.", emoji: "📗" },
      { name: "italki", url: "https://www.italki.com/", desc: "Clases con profes nativos de todo el mundo a tu ritmo.", emoji: "👩‍🏫" },
      { name: "Tandem", url: "https://www.tandem.net/", desc: "Intercambia idiomas charlando con nativos de verdad.", emoji: "🤝" },
      { name: "Clozemaster", url: "https://www.clozemaster.com/", desc: "Gana vocabulario rellenando huecos en frases reales.", emoji: "🎮" },
      { name: "Forvo", url: "https://forvo.com/", desc: "Escucha cómo pronuncian cualquier palabra los nativos.", emoji: "🔊" },
      { name: "Refold", url: "https://refold.la/", desc: "El método de inmersión para llegar a la fluidez de verdad.", emoji: "🧭" },
      { name: "Busuu", url: "https://www.busuu.com/", desc: "Cursos completos con correcciones de la comunidad nativa.", emoji: "🐝" },
      { name: "Memrise", url: "https://www.memrise.com/", desc: "Memoriza vocabulario con vídeos de gente real hablando.", emoji: "🚀" },
      { name: "Speechling", url: "https://speechling.com/", desc: "Mejora tu acento con feedback humano gratis.", emoji: "🎙️" },
      { name: "Readlang", url: "https://readlang.com/", desc: "Lee la web y traduce cualquier palabra con un clic.", emoji: "📕" },
      { name: "LyricsTraining", url: "https://lyricstraining.com/", desc: "Aprende idiomas cantando y rellenando letras de canciones.", emoji: "🎵" },
      { name: "News in Slow", url: "https://www.newsinslow.com/", desc: "Noticias narradas despacio para entenderlo todo.", emoji: "📰" }
    ]
  },
  {
    id: "escribir", label: "Escribir y publicar", icon: "✒️", color: "#5f3dc4",
    intro: "Tienes cosas que decir: aquí están las herramientas para escribirlas y soltarlas al mundo.",
    sites: [
      { name: "Substack", url: "https://substack.com/", desc: "Publica tu newsletter y hasta cóbrala, sin complicaciones.", emoji: "✉️" },
      { name: "Ghost", url: "https://ghost.org/", desc: "Blog y newsletter minimalista, abierto y sin ruido.", emoji: "👻" },
      { name: "Medium", url: "https://medium.com/", desc: "Publica tus textos y llega a lectores de todo el mundo.", emoji: "Ⓜ️" },
      { name: "Hemingway Editor", url: "https://hemingwayapp.com/", desc: "Detecta frases enredadas y te obliga a escribir claro.", emoji: "🖊️" },
      { name: "Grammarly", url: "https://www.grammarly.com/", desc: "Corrige gramática y estilo mientras escribes en inglés.", emoji: "✅" },
      { name: "750 Words", url: "https://750words.com/", desc: "El hábito diario de escribir tres páginas para vaciar la mente.", emoji: "🌅" },
      { name: "Reedsy", url: "https://reedsy.com/", desc: "Escribe y maqueta tu libro gratis, listo para publicar.", emoji: "📘" },
      { name: "Write.as", url: "https://write.as/", desc: "Publica textos sin cuenta, sin rastreo y sin distracciones.", emoji: "🕊️" },
      { name: "Hey World", url: "https://world.hey.com/", desc: "Blogueá simplemente enviando un correo, así de fácil.", emoji: "📮" },
      { name: "Cold Turkey Writer", url: "https://getcoldturkey.com/writer/", desc: "Bloquea todo hasta que cumplas tu cuota de palabras.", emoji: "🦃" },
      { name: "OneLook Thesaurus", url: "https://www.onelook.com/thesaurus/", desc: "Encuentra esa palabra que tienes en la punta de la lengua.", emoji: "🔤" },
      { name: "Wordtune", url: "https://www.wordtune.com/", desc: "Reescribe tus frases con más claridad y estilo al instante.", emoji: "🪄" },
      { name: "Zettelkasten", url: "https://zettelkasten.de/", desc: "El método de notas conectadas para pensar mejor.", emoji: "🗂️" },
      { name: "The StoryGraph", url: "https://www.thestorygraph.com/", desc: "Lleva tus lecturas y descubre tu próximo libro favorito.", emoji: "📚" }
    ]
  },
  {
    id: "bienestar", label: "Hábitos, mente y bienestar", icon: "🌱", color: "#2f9e44",
    intro: "Tu cerebro y tu cuerpo también merecen buena internet. Aquí se cultiva la calma y se riega el hábito.",
    sites: [
      { name: "Insight Timer", url: "https://insighttimer.com/", desc: "La mayor biblioteca gratis de meditaciones guiadas del mundo.", emoji: "🧘" },
      { name: "Headspace", url: "https://headspace.com/", desc: "Meditación con carita amable para empezar sin excusas.", emoji: "🟠" },
      { name: "Calm", url: "https://calm.com/", desc: "Sueño, respiración y paisajes sonoros para bajar revoluciones.", emoji: "🌙" },
      { name: "Waking Up", url: "https://wakingup.com/", desc: "Meditación con cabeza, de la mano de Sam Harris.", emoji: "🌅" },
      { name: "Medito", url: "https://meditofoundation.org/", desc: "Meditación 100% gratis y sin ánimo de lucro. Sin trampa.", emoji: "🕯️" },
      { name: "Fabulous", url: "https://thefabulous.co/", desc: "Construye rutinas sanas paso a paso, con base científica.", emoji: "✨" },
      { name: "Habitica", url: "https://habitica.com/", desc: "Convierte tus hábitos en un videojuego de rol. Sube de nivel.", emoji: "⚔️" },
      { name: "Nerd Fitness", url: "https://nerdfitness.com/", desc: "Ponerte en forma para gente rara y de gimnasio-fobia.", emoji: "💪" },
      { name: "Yoga with Adriene", url: "https://yogawithadriene.com/", desc: "Yoga cercano y gratis en YouTube para todo el mundo.", emoji: "🧎" },
      { name: "Wim Hof Method", url: "https://wimhofmethod.com/", desc: "Respiración y frío para despertar al bicho interior.", emoji: "❄️" },
      { name: "Sleep Foundation", url: "https://sleepfoundation.org/", desc: "Todo sobre dormir bien, con ciencia y sin cuentos.", emoji: "😴" },
      { name: "Zen Habits", url: "https://zenhabits.net/", desc: "El blog minimalista para hacer menos y vivir mejor.", emoji: "🍃" },
      { name: "Tiny Buddha", url: "https://tinybuddha.com/", desc: "Sabiduría sencilla para el lío de cada día.", emoji: "☸️" },
      { name: "Ness Labs", url: "https://nesslabs.com/", desc: "Productividad sana y neurociencia para mentes curiosas.", emoji: "🧠" }
    ]
  },
  {
    id: "finanzas", label: "Dinero y finanzas sanas", icon: "💰", color: "#087f5b",
    intro: "El dinero da menos miedo cuando lo entiendes. Aquí se aprende a ganarlo, guardarlo y hacerlo crecer con cabeza.",
    sites: [
      { name: "Investopedia", url: "https://investopedia.com/", desc: "La enciclopedia de finanzas: cualquier término, explicado claro.", emoji: "📚" },
      { name: "NerdWallet", url: "https://nerdwallet.com/", desc: "Compara tarjetas, préstamos y decisiones de dinero sin marear.", emoji: "🤓" },
      { name: "Mr Money Mustache", url: "https://mrmoneymustache.com/", desc: "El profeta del ahorro y la libertad financiera anticipada.", emoji: "🥸" },
      { name: "Bogleheads", url: "https://bogleheads.org/", desc: "La comunidad que invierte simple, barato y a largo plazo.", emoji: "🐢" },
      { name: "JL Collins", url: "https://jlcollinsnh.com/", desc: "La famosa senda hacia la riqueza, en cartas a su hija.", emoji: "🛤️" },
      { name: "I Will Teach You To Be Rich", url: "https://iwillteachyoutoberich.com/", desc: "Ramit Sethi y su sistema para una vida rica sin culpa.", emoji: "💸" },
      { name: "The Financial Diet", url: "https://thefinancialdiet.com/", desc: "Finanzas personales sin humos y con mucha vida real.", emoji: "🥗" },
      { name: "Afford Anything", url: "https://affordanything.com/", desc: "Puedes pagar cualquier cosa, pero no todo. Elige bien.", emoji: "⚖️" },
      { name: "Get Rich Slowly", url: "https://getrichslowly.org/", desc: "Riqueza a fuego lento: hábitos que suman durante años.", emoji: "🐌" },
      { name: "Money Under 30", url: "https://moneyunder30.com/", desc: "Finanzas para jóvenes que empiezan de cero. Sin jerga.", emoji: "🌱" },
      { name: "Financial Samurai", url: "https://financialsamurai.com/", desc: "Análisis afilado sobre invertir, ahorrar y jubilarse.", emoji: "🥷" },
      { name: "ChooseFI", url: "https://choosefi.com/", desc: "Comunidad y podcast sobre independencia financiera.", emoji: "🔥" },
      { name: "Morningstar", url: "https://morningstar.com/", desc: "Análisis serio de fondos y acciones para decidir mejor.", emoji: "⭐" },
      { name: "The Motley Fool", url: "https://fool.com/", desc: "Ideas de inversión en bolsa explicadas con humor.", emoji: "🎭" },
      { name: "Wise", url: "https://wise.com/", desc: "Enviar y cambiar divisas al tipo real, sin sablazos ocultos.", emoji: "🌍" }
    ]
  },
  {
    id: "privacidad", label: "Privacidad y vida digital sana", icon: "🔒", color: "#495057",
    intro: "Tu atención y tus datos valen oro; que no te los roben gratis. Aquí aprendes a poner puertas y recuperar el foco.",
    sites: [
      { name: "Privacy Guides", url: "https://privacyguides.org/", desc: "La guía de referencia para proteger tu vida digital, paso a paso.", emoji: "🛡️" },
      { name: "EFF", url: "https://eff.org/", desc: "Los abogados de tus derechos digitales desde hace décadas.", emoji: "⚖️" },
      { name: "Proton", url: "https://proton.me/", desc: "Correo, calendario y VPN cifrados, hechos en Suiza.", emoji: "🔐" },
      { name: "Signal", url: "https://signal.org/", desc: "Mensajería cifrada de verdad, sin anuncios ni cotilleos.", emoji: "💬" },
      { name: "Bitwarden", url: "https://bitwarden.com/", desc: "Gestor de contraseñas gratis, abierto y para todo dispositivo.", emoji: "🗝️" },
      { name: "uBlock Origin", url: "https://ublockorigin.com/", desc: "El bloqueador de anuncios ligero que limpia la web entera.", emoji: "🚫" },
      { name: "Firefox", url: "https://mozilla.org/firefox/", desc: "El navegador independiente que trabaja para ti, no para venderte.", emoji: "🦊" },
      { name: "DuckDuckGo", url: "https://duckduckgo.com/", desc: "Buscar en internet sin que te sigan el rastro.", emoji: "🦆" },
      { name: "Freedom", url: "https://freedom.to/", desc: "Bloquea apps y webs que te roban las horas. Recupera el foco.", emoji: "🕊️" },
      { name: "Cold Turkey", url: "https://getcoldturkey.com/", desc: "El bloqueador más duro para dejar la distracción de golpe.", emoji: "🦃" },
      { name: "Center for Humane Technology", url: "https://humanetech.com/", desc: "Los que destaparon cómo la tecnología engancha, y cómo escapar.", emoji: "🧭" },
      { name: "ToS Didnt Read", url: "https://tosdr.org/", desc: "Traduce esos términos que nadie lee y te avisa de la letra pequeña.", emoji: "📄" },
      { name: "Exodus Privacy", url: "https://exodus-privacy.eu.org/", desc: "Descubre qué rastreadores esconden las apps de tu móvil.", emoji: "🔎" },
      { name: "Mullvad", url: "https://mullvad.net/", desc: "VPN que no pide ni tu correo. Anonimato de verdad.", emoji: "🐭" },
      { name: "Tor Project", url: "https://torproject.org/", desc: "Navega anónimo por internet cuando de verdad lo necesitas.", emoji: "🧅" }
    ]
  },
  {
    id: "hacerbien", label: "Usar internet para el bien", icon: "🤝", color: "#e64980",
    intro: "Cada clic puede sumar algo bueno al mundo, y aquí lo comprobarás. Regala tiempo, datos o unos euros y siente el subidón.",
    sites: [
      { name: "Freerice", url: "https://freerice.com/", desc: "Acierta preguntas y donas arroz real a quien lo necesita.", emoji: "🍚" },
      { name: "GiveWell", url: "https://givewell.org/", desc: "Investiga qué ONG salvan más vidas por cada euro donado.", emoji: "🔬" },
      { name: "80000 Hours", url: "https://80000hours.org/", desc: "Orienta tu carrera para que tu trabajo cambie el mundo.", emoji: "⏳" },
      { name: "Kiva", url: "https://kiva.org/", desc: "Presta desde 25 euros a emprendedores de todo el planeta.", emoji: "🤲" },
      { name: "Be My Eyes", url: "https://bemyeyes.com/", desc: "Presta tus ojos por videollamada a una persona ciega.", emoji: "👁️" },
      { name: "Zooniverse", url: "https://zooniverse.org/", desc: "Ayuda a la ciencia real clasificando galaxias o animales.", emoji: "🔭" },
      { name: "Folding@home", url: "https://foldingathome.org/", desc: "Presta tu ordenador para investigar enfermedades mientras duermes.", emoji: "🧬" },
      { name: "Tarjimly", url: "https://tarjimly.org/", desc: "Traduce en directo para refugiados que necesitan tu idioma.", emoji: "🗣️" },
      { name: "GlobalGiving", url: "https://globalgiving.org/", desc: "Miles de proyectos solidarios verificados en todo el mundo.", emoji: "🌐" },
      { name: "DonorsChoose", url: "https://donorschoose.org/", desc: "Financia el aula concreta de un profe que lo necesita.", emoji: "🍎" },
      { name: "Idealist", url: "https://idealist.org/", desc: "Voluntariados, empleos y prácticas con propósito social.", emoji: "💡" },
      { name: "VolunteerMatch", url: "https://volunteermatch.org/", desc: "Encuentra dónde echar una mano según lo que te mueve.", emoji: "🙋" },
      { name: "Effective Altruism", url: "https://effectivealtruism.org/", desc: "El movimiento que busca hacer el mayor bien posible con datos.", emoji: "❤️" },
      { name: "Ecosia", url: "https://ecosia.org/", desc: "El buscador que planta árboles con sus ingresos. Busca y reforesta.", emoji: "🌳" }
    ]
  },
  {
    id: "datos", label: "Datos para entender el mundo", icon: "📊", color: "#1971c2",
    intro: "Deja que los números te cuenten la historia real del mundo, sin dramas ni titulares baratos.",
    sites: [
      { name: "Our World in Data", url: "https://ourworldindata.org/", desc: "El mundo explicado con datos sobre salud, clima, pobreza y progreso.", emoji: "🌍" },
      { name: "Gapminder", url: "https://www.gapminder.org/", desc: "Rompe tus ideas equivocadas del mundo con datos que sorprenden.", emoji: "🫧" },
      { name: "Information is Beautiful", url: "https://informationisbeautiful.net/", desc: "Datos convertidos en arte visual que da gusto mirar.", emoji: "🎨" },
      { name: "FlowingData", url: "https://flowingdata.com/", desc: "Visualizaciones y tutoriales para amantes de los datos.", emoji: "📈" },
      { name: "Observable", url: "https://observablehq.com/", desc: "Cuadernos vivos para explorar y crear visualizaciones interactivas.", emoji: "🔭" },
      { name: "Wolfram Alpha", url: "https://www.wolframalpha.com/", desc: "El buscador que calcula y responde con conocimiento, no con enlaces.", emoji: "🧮" },
      { name: "USAFacts", url: "https://usafacts.org/", desc: "Cifras oficiales de EE. UU. sin opinión, solo hechos.", emoji: "🏛️" },
      { name: "Visual Capitalist", url: "https://www.visualcapitalist.com/", desc: "Infografías que explican economía y tendencias de un vistazo.", emoji: "💹" },
      { name: "World Bank Open Data", url: "https://data.worldbank.org/", desc: "Indicadores libres de todos los países del planeta.", emoji: "🌐" },
      { name: "Data Is Plural", url: "https://www.data-is-plural.com/", desc: "Boletín semanal con datasets curiosos que no sabías que existían.", emoji: "📬" },
      { name: "Flourish", url: "https://flourish.studio/", desc: "Crea gráficos y mapas animados sin escribir código.", emoji: "🌸" },
      { name: "Datawrapper", url: "https://www.datawrapper.de/", desc: "Gráficos limpios y publicables en minutos.", emoji: "📊" },
      { name: "Google Dataset Search", url: "https://datasetsearch.research.google.com/", desc: "El buscador para encontrar datasets sobre casi todo.", emoji: "🔎" },
      { name: "Kaggle", url: "https://www.kaggle.com/", desc: "Datasets, competencias y notebooks para practicar ciencia de datos.", emoji: "🏆" },
      { name: "Statista", url: "https://www.statista.com/", desc: "Estadísticas y estudios de mercado sobre miles de temas.", emoji: "📶" }
    ]
  },
  {
    id: "libros", label: "Libros y lectura libre", icon: "📚", color: "#a9541f",
    intro: "Miles de libros esperándote gratis; tu única excusa para no leer se acaba de esfumar.",
    sites: [
      { name: "Project Gutenberg", url: "https://www.gutenberg.org/", desc: "Más de 70 mil clásicos de dominio público, gratis y para siempre.", emoji: "📜" },
      { name: "Standard Ebooks", url: "https://standardebooks.org/", desc: "Clásicos libres cuidados al detalle, bellos de leer.", emoji: "✨" },
      { name: "Open Library", url: "https://openlibrary.org/", desc: "Una ficha por cada libro publicado y préstamos digitales gratis.", emoji: "🗂️" },
      { name: "LibriVox", url: "https://librivox.org/", desc: "Audiolibros gratuitos leídos por voluntarios de todo el mundo.", emoji: "🎧" },
      { name: "Goodreads", url: "https://www.goodreads.com/", desc: "Registra lo que lees y descubre tu próxima obsesión literaria.", emoji: "⭐" },
      { name: "Five Books", url: "https://fivebooks.com/", desc: "Expertos eligen los cinco mejores libros de cada tema.", emoji: "🖐️" },
      { name: "Derek Sivers Book Notes", url: "https://sive.rs/book", desc: "Resúmenes honestos de cientos de libros que Derek leyó.", emoji: "📝" },
      { name: "Wikibooks", url: "https://www.wikibooks.org/", desc: "Manuales y libros de texto abiertos escritos en comunidad.", emoji: "🧩" },
      { name: "Most Recommended Books", url: "https://mostrecommendedbooks.com/", desc: "Los libros que la gente brillante recomienda una y otra vez.", emoji: "🏅" },
      { name: "ManyBooks", url: "https://manybooks.net/", desc: "Miles de ebooks gratuitos listos para tu dispositivo.", emoji: "📖" },
      { name: "Blinkist", url: "https://www.blinkist.com/", desc: "Las ideas clave de un libro de no ficción en 15 minutos.", emoji: "⚡" },
      { name: "Poetry Foundation", url: "https://www.poetryfoundation.org/", desc: "Un océano de poesía para leer y sentir sin pagar nada.", emoji: "🪶" }
    ]
  },
  {
    id: "ver", label: "Ver algo que valga la pena", icon: "🎬", color: "#c2255c",
    intro: "Cambia el scroll infinito por algo que te deje más listo y curioso que antes.",
    sites: [
      { name: "TED", url: "https://www.ted.com/", desc: "Charlas que expanden tu mente en menos de veinte minutos.", emoji: "🎤" },
      { name: "TED-Ed", url: "https://ed.ted.com/", desc: "Lecciones animadas que responden preguntas que ni sabías tener.", emoji: "💡" },
      { name: "Open Culture", url: "https://www.openculture.com/", desc: "Cine, cursos y cultura gratis reunidos en un solo lugar.", emoji: "🎞️" },
      { name: "Kanopy", url: "https://www.kanopy.com/", desc: "Cine de autor y documentales gratis con tu carnet de biblioteca.", emoji: "📽️" },
      { name: "CrashCourse", url: "https://www.youtube.com/@crashcourse", desc: "Cursos rápidos y divertidos de casi cualquier materia.", emoji: "🚀" },
      { name: "Kurzgesagt", url: "https://www.youtube.com/@kurzgesagt", desc: "Ciencia enorme explicada con animaciones preciosas.", emoji: "🐤" },
      { name: "Veritasium", url: "https://www.youtube.com/@veritasium", desc: "Física y curiosidades que te dejan pensando durante días.", emoji: "🧪" },
      { name: "3Blue1Brown", url: "https://www.youtube.com/@3blue1brown", desc: "Las matemáticas nunca fueron tan visuales ni tan bellas.", emoji: "🔵" },
      { name: "The School of Life", url: "https://www.youtube.com/@theschooloflifetv", desc: "Filosofía y emociones para vivir un poco mejor.", emoji: "🌱" },
      { name: "Nebula", url: "https://nebula.tv/", desc: "Creadores educativos sin anuncios ni algoritmo que manipule.", emoji: "🌌" },
      { name: "CuriosityStream", url: "https://www.curiositystream.com/", desc: "Documentales de calidad sobre ciencia, historia y naturaleza.", emoji: "🦉" },
      { name: "PBS", url: "https://www.pbs.org/", desc: "Documentales y programas educativos de la TV pública de EE. UU.", emoji: "📺" },
      { name: "Every Frame a Painting", url: "https://www.youtube.com/@everyframeapainting", desc: "Ensayos que te enseñan a mirar el cine de verdad.", emoji: "🖼️" },
      { name: "Vsauce", url: "https://www.youtube.com/@vsauce", desc: "Preguntas raras y fascinantes con respuestas que enganchan.", emoji: "❓" },
      { name: "MIT OpenCourseWare (vídeo)", url: "https://www.youtube.com/@mitocw", desc: "Clases reales del MIT para aprender de los mejores.", emoji: "🎓" }
    ]
  },
  {
    id: "crearmusica", label: "Crear música y arte jugando", icon: "🎵", color: "#6741d9",
    intro: "No necesitas talento ni instrumentos, solo ganas de jugar y ensuciarte las manos de color.",
    sites: [
      { name: "Chrome Music Lab", url: "https://musiclab.chromeexperiments.com/", desc: "Experimentos musicales para entender el sonido jugando.", emoji: "🎹" },
      { name: "Song Maker", url: "https://musiclab.chromeexperiments.com/Song-Maker/", desc: "Compón una melodía en segundos pintando notas.", emoji: "🎶" },
      { name: "Incredibox", url: "https://www.incredibox.com/", desc: "Crea beats arrastrando sonidos sobre simpáticos personajes.", emoji: "🎤" },
      { name: "Patatap", url: "https://www.patatap.com/", desc: "Cada tecla dispara sonido y color; pura magia instantánea.", emoji: "🌈" },
      { name: "Blob Opera", url: "https://artsandculture.google.com/experiment/blob-opera/AAHWrq360NcGbw", desc: "Cuatro blobs cantan ópera al ritmo que tú marcas.", emoji: "🎭" },
      { name: "Learning Synths", url: "https://learningsynths.ableton.com/", desc: "Aprende cómo funciona un sintetizador tocándolo tú mismo.", emoji: "🎛️" },
      { name: "Learning Music", url: "https://learningmusic.ableton.com/", desc: "Descubre cómo se hace la música moderna paso a paso.", emoji: "🥁" },
      { name: "Soundtrap", url: "https://www.soundtrap.com/", desc: "Estudio de grabación en el navegador para crear con otros.", emoji: "🎚️" },
      { name: "BandLab", url: "https://www.bandlab.com/", desc: "Crea, mezcla y comparte canciones gratis desde cualquier lugar.", emoji: "🎸" },
      { name: "Musicca", url: "https://www.musicca.com/", desc: "Ejercicios y herramientas para aprender teoría musical jugando.", emoji: "🎼" },
      { name: "Quick, Draw!", url: "https://quickdraw.withgoogle.com/", desc: "Dibuja y deja que una IA adivine tus garabatos.", emoji: "✏️" },
      { name: "Weavesilk", url: "https://weavesilk.com/", desc: "Pinta hipnóticos trazos simétricos que parecen seda de luz.", emoji: "🕸️" },
      { name: "Sketchpad", url: "https://sketchpad.app/", desc: "Un lienzo digital completo para dibujar sin instalar nada.", emoji: "🖌️" }
    ]
  },
  {
    id: "referencia", label: "Referencia rápida", icon: "📖", color: "#364fc7",
    intro: "Esas joyas que consultas en cinco segundos y te salvan el día una y otra vez.",
    sites: [
      { name: "Wiktionary", url: "https://www.wiktionary.org/", desc: "El diccionario libre y colaborativo en cientos de idiomas.", emoji: "📔" },
      { name: "Etymonline", url: "https://www.etymonline.com/", desc: "El origen y la historia secreta de cada palabra.", emoji: "🌳" },
      { name: "OneLook", url: "https://www.onelook.com/", desc: "Busca en muchos diccionarios a la vez y encuentra la palabra exacta.", emoji: "🔍" },
      { name: "tldr pages", url: "https://tldr.sh/", desc: "Ejemplos prácticos de comandos sin leer manuales eternos.", emoji: "⌨️" },
      { name: "cheat.sh", url: "https://cheat.sh/", desc: "Chuletas de programación al instante desde la terminal.", emoji: "📄" },
      { name: "ExplainShell", url: "https://explainshell.com/", desc: "Pega un comando y te explica cada parte que lo compone.", emoji: "🐚" },
      { name: "Stack Exchange", url: "https://stackexchange.com/", desc: "Preguntas y respuestas expertas sobre casi todo lo imaginable.", emoji: "💬" },
      { name: "DevDocs", url: "https://devdocs.io/", desc: "Toda la documentación de programación en un solo buscador rápido.", emoji: "📚" },
      { name: "Emojipedia", url: "https://emojipedia.org/", desc: "El significado y la historia de cada emoji que usas.", emoji: "😄" },
      { name: "Regexr", url: "https://regexr.com/", desc: "Prueba y aprende expresiones regulares sin volverte loco.", emoji: "🧵" },
      { name: "Compiler Explorer", url: "https://godbolt.org/", desc: "Mira en vivo el código máquina que genera tu programa.", emoji: "⚙️" },
      { name: "WordHippo", url: "https://www.wordhippo.com/", desc: "Sinónimos, rimas y definiciones para nunca quedarte sin palabras.", emoji: "🦛" },
      { name: "Wolfram MathWorld", url: "https://mathworld.wolfram.com/", desc: "La enciclopedia matemática más completa de la web.", emoji: "➗" }
    ]
  },
  {
    id: "imagenes", label: "Imágenes libres y arte antiguo", icon: "🖼️", color: "#7f5539",
    intro: "Tesoros visuales de dominio público: ilustraciones de libros viejos, láminas y grabados libres para mirar, descargar y usar como inspiración.",
    sites: [
      { name: "Old Book Illustrations", url: "https://www.oldbookillustrations.com/", desc: "Ilustraciones escaneadas de libros antiguos, listas para reutilizar.", emoji: "🖼️" },
      { name: "Rawpixel Public Domain", url: "https://www.rawpixel.com/public-domain", desc: "Miles de láminas e ilustraciones vintage restauradas y libres.", emoji: "🎨" },
      { name: "Public Domain Image Archive", url: "https://pdimagearchive.org/", desc: "Buscador de imágenes históricas de dominio público.", emoji: "🔎" },
      { name: "Biodiversity Heritage Library", url: "https://www.biodiversitylibrary.org/", desc: "Láminas naturalistas antiguas de plantas y animales, libres.", emoji: "🌿" },
      { name: "NYPL Digital Collections", url: "https://digitalcollections.nypl.org/", desc: "Cientos de miles de imágenes históricas de la Biblioteca de Nueva York.", emoji: "🗽" },
      { name: "Smithsonian Open Access", url: "https://www.si.edu/openaccess", desc: "Millones de imágenes del Smithsonian libres para cualquier uso.", emoji: "🏛️" },
      { name: "The Met Open Access", url: "https://www.metmuseum.org/art/collection", desc: "Obras del Met en alta resolución, muchas de libre uso.", emoji: "🖌️" },
      { name: "Rijksmuseum", url: "https://www.rijksmuseum.nl/en/rijksstudio", desc: "Descarga obras maestras holandesas en altísima resolución.", emoji: "🇳🇱" },
      { name: "Getty Open Content", url: "https://www.getty.edu/art/collection/", desc: "Miles de obras del Getty libres para descargar.", emoji: "🏺" },
      { name: "Flickr Commons", url: "https://www.flickr.com/commons", desc: "Archivos fotográficos históricos de museos del mundo.", emoji: "📷" },
      { name: "Internet Archive Book Images", url: "https://archive.org/details/bookimages", desc: "Millones de ilustraciones extraídas de libros escaneados.", emoji: "📚" },
      { name: "Wikimedia Commons", url: "https://commons.wikimedia.org/", desc: "El almacén libre de imágenes, sonidos y vídeo de Wikipedia.", emoji: "🌐" },
      { name: "Openverse", url: "https://openverse.org/", desc: "Buscador de imágenes y audio de libre uso, todo en uno.", emoji: "♾️" },
      { name: "Library of Congress", url: "https://www.loc.gov/free-to-use/", desc: "Colecciones libres de la mayor biblioteca del mundo.", emoji: "📜" },
      { name: "Reusable Art", url: "https://www.reusableart.com/", desc: "Ilustraciones vintage recortadas y listas para usar.", emoji: "✂️" }
    ]
  },
  {
    id: "podcasts", label: "Pódcasts que valen la pena", icon: "🎙️", color: "#b5179e",
    intro: "Ponte los audífonos y deja que la mejor gente del mundo te llene la cabeza de ideas mientras caminas.",
    sites: [
      { name: "Huberman Lab", url: "https://www.hubermanlab.com/", desc: "Neurociencia práctica para dormir, enfocarte y vivir mejor.", emoji: "🧠" },
      { name: "Lex Fridman Podcast", url: "https://lexfridman.com/", desc: "Charlas larguísimas y profundas con mentes brillantes del planeta.", emoji: "🎧" },
      { name: "The Tim Ferriss Show", url: "https://tim.blog/", desc: "Desmenuza los hábitos y trucos de los mejores en lo suyo.", emoji: "⏱️" },
      { name: "Freakonomics Radio", url: "https://freakonomics.com/", desc: "El lado oculto y curioso de todo lo que creías entender.", emoji: "📈" },
      { name: "99% Invisible", url: "https://99percentinvisible.org/", desc: "El diseño invisible que da forma a tu mundo, contado con arte.", emoji: "🏛️" },
      { name: "Radiolab", url: "https://radiolab.org/", desc: "Ciencia y filosofía convertidas en historias que te vuelan la cabeza.", emoji: "🔊" },
      { name: "This American Life", url: "https://www.thisamericanlife.org/", desc: "Historias reales de gente común, contadas como nadie.", emoji: "📻" },
      { name: "Dan Carlin Hardcore History", url: "https://www.dancarlin.com/", desc: "La historia narrada con una intensidad épica y adictiva.", emoji: "⚔️" },
      { name: "The Knowledge Project", url: "https://fs.blog/knowledge-project/", desc: "Modelos mentales para pensar mejor y decidir con cabeza.", emoji: "🧩" },
      { name: "Philosophize This", url: "https://www.philosophizethis.org/", desc: "Toda la filosofía occidental explicada clarito y sin humo.", emoji: "🤔" },
      { name: "Darknet Diaries", url: "https://darknetdiaries.com/", desc: "Historias verídicas de hackers, espías y el lado oscuro de la red.", emoji: "🕵️" },
      { name: "Acquired", url: "https://www.acquired.fm/", desc: "La historia completa de cómo las grandes empresas se hicieron gigantes.", emoji: "🏢" },
      { name: "Stuff You Should Know", url: "https://www.stuffyoushouldknow.com/", desc: "Explican cómo funciona casi cualquier cosa, con buen humor.", emoji: "💡" },
      { name: "Listen Notes", url: "https://www.listennotes.com/", desc: "El buscador para encontrar cualquier pódcast del universo.", emoji: "🔎" },
      { name: "Pocket Casts", url: "https://pocketcasts.com/", desc: "La app elegante para escuchar y organizar todos tus pódcasts.", emoji: "▶️" }
    ]
  },
  {
    id: "ciencia", label: "Ciencia y naturaleza", icon: "🔬", color: "#0b7285",
    intro: "El mundo real es más raro y hermoso que cualquier ficción; asómate y déjate maravillar como cuando eras niño.",
    sites: [
      { name: "Scientific American", url: "https://www.scientificamerican.com/", desc: "La ciencia de vanguardia contada para curiosos, no para expertos.", emoji: "🧪" },
      { name: "Nature", url: "https://www.nature.com/", desc: "La revista donde se publica lo más grande de la ciencia mundial.", emoji: "📗" },
      { name: "National Geographic", url: "https://www.nationalgeographic.com/", desc: "Fotografía y relatos que te llevan a los rincones vivos del planeta.", emoji: "🌍" },
      { name: "iNaturalist", url: "https://www.inaturalist.org/", desc: "Fotografía un bicho o planta y la comunidad te dice qué es.", emoji: "🐞" },
      { name: "eBird", url: "https://ebird.org/", desc: "Registra aves y explora dónde vuelan por todo el mundo.", emoji: "🦅" },
      { name: "Merlin Bird ID", url: "https://merlin.allaboutbirds.org/", desc: "Identifica pájaros por su canto o su foto al instante.", emoji: "🐦" },
      { name: "PhET Simulations", url: "https://phet.colorado.edu/", desc: "Simulaciones interactivas para jugar con la física y la química.", emoji: "⚛️" },
      { name: "HHMI BioInteractive", url: "https://www.biointeractive.org/", desc: "Recursos y videos brutales para enamorarte de la biología.", emoji: "🧬" },
      { name: "The Kid Should See This", url: "https://thekidshouldseethis.com/", desc: "Videos increíbles del mundo real para mentes de toda edad.", emoji: "🎬" },
      { name: "Encyclopedia of Life", url: "https://eol.org/", desc: "Una ficha para cada especie viva conocida en la Tierra.", emoji: "🦋" },
      { name: "All About Birds", url: "https://www.allaboutbirds.org/", desc: "La guía del Cornell Lab para conocer y amar a las aves.", emoji: "🪶" },
      { name: "Explore.org", url: "https://explore.org/", desc: "Cámaras en vivo de osos, aves y fauna salvaje del planeta.", emoji: "📹" },
      { name: "Monterey Bay Aquarium", url: "https://www.montereybayaquarium.org/", desc: "Cámaras del océano y datos para caer rendido ante el mar.", emoji: "🐙" },
      { name: "Smithsonian Magazine", url: "https://www.smithsonianmag.com/", desc: "Ciencia, historia y naturaleza con la firma del Smithsonian.", emoji: "🏺" }
    ]
  },
  {
    id: "espacio", label: "Espacio y astronomía", icon: "🌌", color: "#3b3b8f",
    intro: "Levanta la mirada: hay un universo entero esperándote y desde tu pantalla puedes recorrerlo sin salir de casa.",
    sites: [
      { name: "NASA", url: "https://www.nasa.gov/", desc: "Misiones, imágenes y noticias directas desde la agencia espacial.", emoji: "🚀" },
      { name: "APOD", url: "https://apod.nasa.gov/", desc: "Una foto astronómica distinta cada día, con su explicación.", emoji: "🌠" },
      { name: "Stellarium Web", url: "https://stellarium-web.org/", desc: "Un planetario en tu navegador para ver el cielo de hoy.", emoji: "✨" },
      { name: "Solar System Scope", url: "https://www.solarsystemscope.com/", desc: "Recorre el sistema solar en 3D y juega con los planetas.", emoji: "🪐" },
      { name: "Heavens-Above", url: "https://www.heavens-above.com/", desc: "Sabe cuándo pasará la Estación Espacial sobre tu cabeza.", emoji: "🛰️" },
      { name: "NASA Eyes", url: "https://eyes.nasa.gov/", desc: "Explora en 3D las misiones y mundos con datos reales de la NASA.", emoji: "👁️" },
      { name: "ESA Hubble", url: "https://esahubble.org/", desc: "El archivo de imágenes más bellas del telescopio Hubble.", emoji: "🔭" },
      { name: "Webb Telescope", url: "https://webbtelescope.org/", desc: "Las imágenes que están reescribiendo lo que sabemos del cosmos.", emoji: "🌟" },
      { name: "Sky and Telescope", url: "https://skyandtelescope.org/", desc: "Guía de qué observar esta noche para astrónomos aficionados.", emoji: "🌙" },
      { name: "In-The-Sky.org", url: "https://in-the-sky.org/", desc: "Calendario de eventos celestes visibles desde tu ubicación.", emoji: "☄️" },
      { name: "Space.com", url: "https://www.space.com/", desc: "Noticias frescas de todo lo que pasa allá arriba.", emoji: "📰" },
      { name: "The Sky Live", url: "https://theskylive.com/", desc: "Rastrea planetas, cometas y objetos del cielo en tiempo real.", emoji: "🌌" },
      { name: "SpaceWeather", url: "https://www.spaceweather.com/", desc: "El clima del Sol, auroras y rocas que rozan la Tierra.", emoji: "🌞" },
      { name: "EarthSky", url: "https://earthsky.org/", desc: "Qué mirar en el cielo cada noche, contado con cariño.", emoji: "🌃" },
      { name: "Time and Date", url: "https://www.timeanddate.com/", desc: "Eclipses, fases lunares y horas de luz para cualquier lugar.", emoji: "⏰" }
    ]
  },
  {
    id: "mapas", label: "Mapas y geografía", icon: "🗺️", color: "#2b6cb0",
    intro: "El planeta es enorme y fascinante; abre un mapa, pierde el rumbo a propósito y descubre lo que no sabías que existía.",
    sites: [
      { name: "OpenStreetMap", url: "https://www.openstreetmap.org/", desc: "El mapa del mundo hecho y editado por gente como tú.", emoji: "🧭" },
      { name: "Google Earth", url: "https://earth.google.com/", desc: "Vuela sobre cualquier rincón del planeta en 3D.", emoji: "🌐" },
      { name: "Old Maps Online", url: "https://www.oldmapsonline.org/", desc: "Miles de mapas antiguos sobre el mapa de hoy.", emoji: "📜" },
      { name: "Zoom Earth", url: "https://zoom.earth/", desc: "Imágenes satelitales en vivo, huracanes y clima al momento.", emoji: "🛰️" },
      { name: "Ventusky", url: "https://www.ventusky.com/", desc: "El viento, la lluvia y la temperatura del mundo en movimiento.", emoji: "🌬️" },
      { name: "MapCrunch", url: "https://www.mapcrunch.com/", desc: "Te teletransporta a un lugar aleatorio del mundo en Street View.", emoji: "🎲" },
      { name: "The True Size Of", url: "https://www.thetruesize.com/", desc: "Arrastra países y descubre qué tan mentiroso es el mapa.", emoji: "📐" },
      { name: "City Roads", url: "https://anvaka.github.io/city-roads/", desc: "Dibuja todas las calles de cualquier ciudad en un solo trazo.", emoji: "🛣️" },
      { name: "OpenTopoMap", url: "https://opentopomap.org/", desc: "Mapas topográficos con relieve para montañeros y curiosos.", emoji: "⛰️" },
      { name: "what3words", url: "https://what3words.com/", desc: "Cada rincón del mundo nombrado con solo tres palabras.", emoji: "📍" },
      { name: "Submarine Cable Map", url: "https://www.submarinecablemap.com/", desc: "Los cables bajo el mar por donde viaja todo internet.", emoji: "🌊" },
      { name: "PeakFinder", url: "https://www.peakfinder.org/", desc: "Identifica el nombre de cada montaña del horizonte.", emoji: "🏔️" },
      { name: "Marble", url: "https://marble.kde.org/", desc: "Un globo terráqueo libre para explorar la Tierra y más allá.", emoji: "🌍" },
      { name: "Windy", url: "https://www.windy.com/", desc: "El mapa del clima más hipnótico y detallado que existe.", emoji: "🌀" }
    ]
  },
  {
    id: "cocina", label: "Cocina y recetas", icon: "🍳", color: "#e67700",
    intro: "Ponte el delantal y suéltate: aquí se aprende a cocinar rico, sano y sin miedo a mancharse.",
    sites: [
      { name: "Serious Eats", url: "https://www.seriouseats.com/", desc: "La ciencia detrás de cada receta para que te salga perfecta siempre.", emoji: "🔬" },
      { name: "Budget Bytes", url: "https://www.budgetbytes.com/", desc: "Comidas riquísimas y baratas con el costo por porción calculado.", emoji: "💸" },
      { name: "BBC Good Food", url: "https://www.bbcgoodfood.com/", desc: "Miles de recetas probadas y fáciles para el día a día.", emoji: "🇬🇧" },
      { name: "RecipeTin Eats", url: "https://www.recipetineats.com/", desc: "Recetas que funcionan a la primera, explicadas con cariño.", emoji: "✅" },
      { name: "Smitten Kitchen", url: "https://smittenkitchen.com/", desc: "Cocina casera con alma desde una cocina pequeña.", emoji: "🏡" },
      { name: "The Woks of Life", url: "https://thewoksoflife.com/", desc: "Cocina china de verdad, de una familia a tu mesa.", emoji: "🥢" },
      { name: "King Arthur Baking", url: "https://www.kingarthurbaking.com/", desc: "La biblia de la repostería: panes y postres que suben seguro.", emoji: "🍞" },
      { name: "Food52", url: "https://food52.com/", desc: "Comunidad foodie con recetas, trucos y utensilios preciosos.", emoji: "🍽️" },
      { name: "Just One Cookbook", url: "https://www.justonecookbook.com/", desc: "Japón en tu cocina: ramen, sushi y más, paso a paso.", emoji: "🍜" },
      { name: "Maangchi", url: "https://www.maangchi.com/", desc: "La reina de la cocina coreana casera en videos alegres.", emoji: "🇰🇷" },
      { name: "SuperCook", url: "https://www.supercook.com/", desc: "Dime qué tienes en la nevera y te digo qué cocinar.", emoji: "🧊" },
      { name: "Sallys Baking Addiction", url: "https://sallysbakingaddiction.com/", desc: "Repostería adictiva y a prueba de fallos para golosos.", emoji: "🧁" },
      { name: "Directo al Paladar", url: "https://www.directoalpaladar.com/", desc: "Recetas en español para todos los días, con fotos que abren el apetito.", emoji: "🥘" },
      { name: "Recetas Gratis", url: "https://www.recetasgratis.net/", desc: "Enorme recetario en español con vídeos y pasos claritos.", emoji: "📖" },
      { name: "NYT Cooking", url: "https://cooking.nytimes.com/", desc: "Recetas cuidadas del New York Times para cocineros curiosos.", emoji: "🗞️" }
    ]
  },
  {
    id: "maker", label: "Hazlo tú mismo", icon: "🔧", color: "#66a80f",
    intro: "Si se puede construir, reparar o inventar, aquí aprendes cómo: enciende el soldador y a jugar.",
    sites: [
      { name: "Instructables", url: "https://www.instructables.com/", desc: "Millones de proyectos paso a paso para construir casi cualquier cosa.", emoji: "🛠️" },
      { name: "iFixit", url: "https://www.ifixit.com/", desc: "Guías gratis para reparar tus aparatos y no tirarlos a la basura.", emoji: "🔩" },
      { name: "Make Magazine", url: "https://makezine.com/", desc: "La revista madre del movimiento maker: proyectos y cultura DIY.", emoji: "📐" },
      { name: "Adafruit", url: "https://www.adafruit.com/", desc: "Electrónica, tutoriales y piezas para tus inventos con luces.", emoji: "💡" },
      { name: "SparkFun", url: "https://www.sparkfun.com/", desc: "Componentes y guías para meterte en la electrónica sin dramas.", emoji: "⚡" },
      { name: "Hackaday", url: "https://hackaday.com/", desc: "Los hacks y proyectos más ingeniosos del planeta, cada día.", emoji: "🤖" },
      { name: "Thingiverse", url: "https://www.thingiverse.com/", desc: "Miles de modelos gratis para imprimir en 3D lo que imagines.", emoji: "🧩" },
      { name: "Printables", url: "https://www.printables.com/", desc: "Modelos 3D de calidad y comunidad activa de impresión.", emoji: "🖨️" },
      { name: "Arduino", url: "https://www.arduino.cc/", desc: "La placa que despertó al maker que llevas dentro.", emoji: "🔌" },
      { name: "Raspberry Pi", url: "https://www.raspberrypi.org/", desc: "El miniordenador para aprender, programar y trastear sin límites.", emoji: "🍓" },
      { name: "wikiHow", url: "https://www.wikihow.com/", desc: "Cómo hacer de todo, explicado con dibujitos simpáticos.", emoji: "📋" },
      { name: "The Spruce Crafts", url: "https://www.thesprucecrafts.com/", desc: "Manualidades y hobbies con tutoriales claros para empezar hoy.", emoji: "✂️" },
      { name: "Open Source Ecology", url: "https://www.opensourceecology.org/", desc: "Planos abiertos de máquinas para construir un mundo mejor.", emoji: "🌍" },
      { name: "Repair Cafe", url: "https://www.repaircafe.org/", desc: "Encuentros para arreglar cosas juntos y darles otra vida.", emoji: "♻️" },
      { name: "Hackster.io", url: "https://www.hackster.io/", desc: "Comunidad de proyectos con hardware, código y buenas ideas.", emoji: "🧠" }
    ]
  },
  {
    id: "fotografia", label: "Fotografía", icon: "📸", color: "#5f6b7a",
    intro: "Aprende a mirar y a disparar con intención: la buena foto se entrena, y aquí tienes el gimnasio.",
    sites: [
      { name: "Cambridge in Colour", url: "https://www.cambridgeincolour.com/", desc: "Tutoriales técnicos claros para entender la luz y la cámara.", emoji: "🎓" },
      { name: "Digital Photography School", url: "https://digital-photography-school.com/", desc: "Consejos prácticos para pasar del automático al manual.", emoji: "📷" },
      { name: "PetaPixel", url: "https://petapixel.com/", desc: "Noticias, reseñas y cultura fotográfica al día.", emoji: "📰" },
      { name: "DPReview", url: "https://www.dpreview.com/", desc: "Reseñas de cámaras a fondo para comprar con cabeza.", emoji: "🔍" },
      { name: "500px", url: "https://500px.com/", desc: "Galería de fotografía de altísimo nivel para inspirarte.", emoji: "🌟" },
      { name: "Flickr", url: "https://www.flickr.com/", desc: "La comunidad clásica para guardar y compartir tus fotos.", emoji: "🖼️" },
      { name: "Magnum Photos", url: "https://www.magnumphotos.com/", desc: "La agencia legendaria del fotoperiodismo con alma.", emoji: "🎞️" },
      { name: "LensCulture", url: "https://www.lensculture.com/", desc: "Fotografía contemporánea del mundo entero, curada con gusto.", emoji: "🌐" },
      { name: "Fstoppers", url: "https://fstoppers.com/", desc: "Tutoriales, retos y comunidad para fotógrafos que quieren más.", emoji: "🎬" },
      { name: "Strobist", url: "https://strobist.blogspot.com/", desc: "La escuela del flash fuera de cámara, gratis y legendaria.", emoji: "💥" },
      { name: "The Great Discontent", url: "https://thegreatdiscontent.com/", desc: "Entrevistas a creativos que encienden las ganas de crear.", emoji: "✨" },
      { name: "Photography Life", url: "https://photographylife.com/", desc: "Guías y reseñas serias para dominar tu equipo.", emoji: "📚" },
      { name: "SLR Lounge", url: "https://www.slrlounge.com/", desc: "Educación fotográfica práctica, sobre todo retrato y boda.", emoji: "💍" },
      { name: "r/photography", url: "https://www.reddit.com/r/photography/", desc: "La comunidad de Reddit para preguntar, aprender y compartir.", emoji: "💬" }
    ]
  }
];
