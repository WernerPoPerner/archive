const api = globalThis.browser ?? globalThis.chrome;
const container = document.getElementById("services");
const newTab = document.getElementById("newTab");
const status = document.getElementById("status");

for (const [id, s] of Object.entries(SERVICES)) {
  const label = document.createElement("label");
  const input = document.createElement("input");
  input.type = "radio";
  input.name = "service";
  input.value = id;
  label.append(input, " " + s.label);
  container.append(label);
}

async function load() {
  const settings = { ...DEFAULT_SETTINGS, ...(await api.storage.sync.get(DEFAULT_SETTINGS)) };
  const radio = container.querySelector(`input[value="${settings.service}"]`);
  if (radio) radio.checked = true;
  newTab.checked = settings.newTab;
}

async function save() {
  const service = container.querySelector("input:checked")?.value || DEFAULT_SETTINGS.service;
  await api.storage.sync.set({ service, newTab: newTab.checked });
  status.textContent = "Gespeichert.";
  setTimeout(() => (status.textContent = ""), 1500);
}

container.addEventListener("change", save);
newTab.addEventListener("change", save);
load();
