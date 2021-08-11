# Tests erstellen

## Setup

1. Checke den folgenden Code aus und wechsele in einen neuen Branch.
2. Installiere Abhängigkeiten mit `npm install`.
3. Starte deine Entwicklungsumgebung mit `npm start`.

## Aufgabe

Ergänze und erstelle Tests für den Chrome-Browser mit einem Framework deiner Wahl, die mit dem Befehl `npm test` ausgeführt werden können. Die URL, unter welcher die Tests ausgeführt werden, sollte konfigurierbar sein und per Default die bereits laufende lokale Entwicklungsumgebung verwenden.

Folgende Angaben sind zu testen. Die Reihenfolge der Tests ist nicht relevant.

1. Der Seitentitel der Startseite ist "Newsletter-Registrierung".
2. Die Hauptüberschrift der Startseite lautet "Für unseren Newsletter anmelden".
3. Die Startseite enthält ein Formular, welches bei Desktop-Auflösung (>768px) die Hintergrundfarbe "gainsboro" hat.
4. Dieses Formular ist auf mobilen Endgeräten (<=768px) unterhalb des Teasertexts positioniert.
5. Es gibt ein Eingabefeld für die Email-Adresse.
6. Gestylte Checkboxen können an- oder abgewählt werden.
7. Mit dem Absenden-Button gelangt der Nutzer auf eine Seite mit dem Titel "Danke".
8. Der Bestätigungstext auf der Danke-Seite enthält die zuvor im Formular eingetragene Email-Adresse.
