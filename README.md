# Im Archiv öffnen

Ein Klick – und der aktuelle Artikel (FAZ, Spiegel, Spektrum, …) öffnet sich im Archiv.
Die Adresse wird automatisch angehängt, z. B.

```
https://www.spiegel.de/artikel.html  →  https://web.archive.org/web/https://www.spiegel.de/artikel.html
```

Unterstützte Dienste: **archive.org** (Wayback Machine, Standard) und **archive.ph** (archive.today).
Bei Bezahlartikeln klappt archive.ph oft besser – einfach ausprobieren.

## Variante 1: Browser-Erweiterung (Chrome, Edge, Brave, Firefox)

Funktionen:
- Klick auf das Symbol in der Symbolleiste → aktuelle Seite im Archiv öffnen
- Tastenkürzel **Alt+Shift+A**
- Rechtsklick auf eine Seite oder einen Link → „… öffnen in archive.org / archive.ph“
- Einstellungen (Rechtsklick aufs Symbol → Optionen): Standard-Dienst, neuer Tab ja/nein
- Tracking-Parameter (`utm_…` usw.) werden automatisch entfernt

### Installation in Chrome / Edge / Brave
1. Dieses Repository herunterladen (grüner Button „Code“ → „Download ZIP“) und entpacken.
2. `chrome://extensions` öffnen (Edge: `edge://extensions`).
3. Oben rechts **Entwicklermodus** einschalten.
4. **Entpackte Erweiterung laden** → den Ordner `extension` auswählen.
5. Optional: über das Puzzle-Symbol die Erweiterung an die Symbolleiste anheften.

### Installation in Firefox
1. `about:debugging#/runtime/this-firefox` öffnen.
2. **Temporäres Add-on laden** → die Datei `extension/manifest.json` auswählen.
   (Temporäre Add-ons verschwinden beim Neustart von Firefox. Für dauerhafte Nutzung
   müsste die Erweiterung bei addons.mozilla.org signiert werden.)

## Variante 2: Lesezeichen („Bookmarklet“) – auch für Safari, iPhone, iPad, Android

Neues Lesezeichen anlegen und als Adresse **eine** dieser Zeilen eintragen:

archive.org:
```
javascript:location.href='https://web.archive.org/web/'+location.href.split('#')[0]
```

archive.ph:
```
javascript:location.href='https://archive.ph/newest/'+location.href.split('#')[0]
```

Dann auf dem Artikel einfach das Lesezeichen antippen.
(Auf dem Handy: Lesezeichen in der Adressleiste über seinen Namen suchen und antippen.)

## Hinweis

Das Archiv zeigt nur Seiten, die dort schon gespeichert wurden. Gibt es noch keine Kopie,
bieten beide Dienste an, die Seite jetzt zu archivieren.
