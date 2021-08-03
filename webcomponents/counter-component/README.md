# Web Worker

### Eine wachsende Anzahl und Vielfalt an Endgeräten in den letzten Jahren erfordert die Beachtung von Geräten mit geringer Leistung.

- Smartphones werden im schneller (stärkere GPU, schnellere CPU, mehr RAM)
- Low-end Geräte werden mehr
- Spannbreite vergrößert sich

### Lang laufendes JavaScript blockiert den Main Thread für wichtige Aufgaben in der UI.

- JavaScript blockiert den Main Thread, nichts passiert, während es läuft
- Main Thread hat andere wichtige Aufgaben: Seitenlayout, Styles berechnen, Ebenen zeichnen, Compositing für final screen, Benutzerinteraktionen entgegennehmen (Klicks, Scrollen)

### Eine blockierte Oberfläche wird als störend wahrgenommen und führt zu höherer Abbruchrate.

- Was ist blockierend?
- RAIL Modell versucht, das zu beantworten: https://web.dev/rail/
- Menschen nehmen Animationen, bei denen mehr als 16ms zwischen gerenderten Frames liegen, nicht mehr als flüssig wahr

### Code-Splitting und regelmäßige Breakpoints im Code helfen nur begrenzt.

- langsame Low-end Geräte ausschließen?
- inklusives Denken an den Tag legen

- Chunking JS: in regelmäßigen Abständen Breakpoints im Code schaffen
- Browser hat die Gelegenheit, JS-Ausführung zu stoppen und Frames rendern oder Events verarbeiten
- schedule tasks: setTimeout, postMessage, async/await
- trotzdem keine Unabhängigkeit von Performance des Endgeräts (16ms)

### Off-Main-Thread Architektur mit Web Workern erhält die Responsiveness der UI.

- Lösung: weg vom Main Thread - Framerate bleibt stabil
- (Web) Worker kommunizieren nur über Nachrichten (Aktorenmodell), kein Zugriff auf Dinge in anderen Threads
- Kommunikations-Overhead erschwert Implementierung (Comlink etc.) und drückt Performance
- Off-Main-Thread Architektur verringert nicht die Ausführungszeit(!) UI bleibt responsive

### Eine Worker-freundliche Entwicklung erleichtert den Umstieg zu einem späteren Zeitpunkt.

- Worker ready: UI Code und reine Berechnungen trennen (Tests!)
- asynchroner Code mit Callbacks und async/await
- Code einfacher in Worker verschieben + Performance messen

- aktuelle Entwicklung begünstigt Integration von Workern
- Webpack 5 versteht Worker automatisch und kann Module für Worker und Main Thread bereitstellen (Double-Loading)
- ES Module: `new Worker("./worker.js", {type: "module"})`
