// Archiv-Dienste und Hilfsfunktionen, gemeinsam genutzt von background.js und options.js.

const SERVICES = {
  "archive.org": {
    label: "archive.org (Wayback Machine)",
    build: (url) => "https://web.archive.org/web/" + url,
  },
  "archive.ph": {
    label: "archive.ph (archive.today)",
    build: (url) => "https://archive.ph/newest/" + url,
  },
};

const DEFAULT_SETTINGS = {
  service: "archive.org",
  newTab: true,
};

// Entfernt Tracking-Parameter (utm_* usw.) und den #-Anker, damit das Archiv
// die Seite unter ihrer „sauberen“ Adresse findet.
function cleanUrl(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  for (const key of [...url.searchParams.keys()]) {
    if (/^(utm_|fbclid$|gclid$|mc_|wt_|xtor$|at_)/i.test(key)) {
      url.searchParams.delete(key);
    }
  }
  url.hash = "";
  return url.toString();
}

// Bereits archivierte Adressen nicht noch einmal ins Archiv schicken.
function isArchiveUrl(raw) {
  try {
    const host = new URL(raw).hostname;
    return /(^|\.)(archive\.org|archive\.(ph|today|is|li|vn|fo|md))$/.test(host);
  } catch {
    return false;
  }
}

function archiveUrl(raw, service) {
  const s = SERVICES[service] || SERVICES[DEFAULT_SETTINGS.service];
  return s.build(cleanUrl(raw));
}
