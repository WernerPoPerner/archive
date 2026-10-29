if (typeof importScripts === "function") {
  importScripts("services.js");
}

const api = globalThis.browser ?? globalThis.chrome;

async function getSettings() {
  return { ...DEFAULT_SETTINGS, ...(await api.storage.sync.get(DEFAULT_SETTINGS)) };
}

async function openInArchive(url, tab, service) {
  if (!url || !/^https?:/i.test(url) || isArchiveUrl(url)) return;
  const settings = await getSettings();
  const target = archiveUrl(url, service || settings.service);
  if (settings.newTab) {
    await api.tabs.create({ url: target, index: tab ? tab.index + 1 : undefined });
  } else if (tab) {
    await api.tabs.update(tab.id, { url: target });
  } else {
    await api.tabs.create({ url: target });
  }
}

// Klick auf das Symbol in der Symbolleiste (oder Alt+Shift+A)
api.action.onClicked.addListener((tab) => openInArchive(tab.url, tab));

// Rechtsklick-Menü für Seiten und Links
function createMenus() {
  api.contextMenus.removeAll(() => {
    for (const [id, s] of Object.entries(SERVICES)) {
      api.contextMenus.create({
        id: "page|" + id,
        title: "Seite öffnen in " + s.label,
        contexts: ["page"],
      });
      api.contextMenus.create({
        id: "link|" + id,
        title: "Link öffnen in " + s.label,
        contexts: ["link"],
      });
    }
  });
}

api.runtime.onInstalled.addListener(createMenus);
api.runtime.onStartup?.addListener(createMenus);

api.contextMenus.onClicked.addListener((info, tab) => {
  const [kind, service] = String(info.menuItemId).split("|");
  const url = kind === "link" ? info.linkUrl : info.pageUrl || tab?.url;
  openInArchive(url, tab, service);
});
