# 👗 My Outfits – Backend

Dieses Repository enthält das Backend der Webanwendung **My Outfits**.  
Die Anwendung dient als digitaler Kleiderschrank, in dem persönliche Outfits mit Bildern und zusätzlichen Informationen gespeichert und verwaltet werden können.

Das Backend stellt eine REST-API bereit, speichert die Outfit-Daten in MongoDB und verwaltet die hochgeladenen Bilder.

## Funktionen

- Alle gespeicherten Outfits laden
- Ein einzelnes Outfit über seine ID laden
- Neue Outfits erstellen
- Vorhandene Outfits aktualisieren
- Outfit-Bilder hochladen und ersetzen
- Favoritenstatus ändern
- Outfits und die dazugehörigen Bilder löschen
- Hochgeladene Bilder über eine öffentliche URL bereitstellen
- Bildformate und maximale Dateigröße überprüfen

## Verwendete Technologien

- Node.js
- Express 5
- MongoDB
- Mongoose
- Multer
- CORS
- dotenv
- JavaScript

## Architektur

Das Projekt besteht aus zwei getrennten Anwendungen:

- **Frontend:** Angular-Anwendung
- **Backend:** Node.js-, Express- und MongoDB-Anwendung in diesem Repository

Frontend-Repository:

[myoutfits-frontend](https://github.com/SunnyKim620/myoutfits-frontend)

## Voraussetzungen

Zum lokalen Ausführen werden benötigt:

- Node.js
- npm
- eine lokale MongoDB-Installation oder ein MongoDB-Atlas-Zugang

## Installation

Repository klonen:

```bash
git clone https://github.com/SunnyKim620/myoutfits-backend.git
```

In den Projektordner wechseln:

```bash
cd myoutfits-backend
```

Abhängigkeiten installieren:

```bash
npm install
```

Beispieldatei für die Umgebungsvariablen kopieren:

```bash
cp .env.example .env
```

Die Datei `.env` enthält die MongoDB-Verbindungsadresse:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/myoutfits
```

Bei der Verwendung von MongoDB Atlas muss der Beispielwert durch die eigene Atlas-Verbindungsadresse ersetzt werden.

Die echte `.env`-Datei wird nicht in Git gespeichert, damit Zugangsdaten nicht veröffentlicht werden.

## Backend starten

Backend normal starten:

```bash
npm start
```

Backend im Entwicklungsmodus mit automatischem Neustart starten:

```bash
npm run dev
```

Der Server ist anschließend unter folgender Adresse erreichbar:

```text
http://localhost:3000
```

Testantwort der Startadresse:

```text
MyOutfits-Backend läuft.
```

## REST-Schnittstelle

Die Basisadresse der Outfit-API lautet:

```text
http://localhost:3000/api/outfits
```

| Methode | Route | Funktion |
|---|---|---|
| GET | `/api/outfits` | Alle Outfits laden |
| GET | `/api/outfits/:id` | Ein einzelnes Outfit laden |
| POST | `/api/outfits` | Neues Outfit erstellen |
| PUT | `/api/outfits/:id` | Outfit und optional das Bild aktualisieren |
| PATCH | `/api/outfits/:id/favorite` | Favoritenstatus wechseln |
| DELETE | `/api/outfits/:id` | Outfit und zugehöriges Bild löschen |

## Outfit-Datenmodell

Ein Outfit enthält folgende Eigenschaften:

| Eigenschaft | Typ | Pflichtfeld | Beschreibung |
|---|---|---|---|
| `title` | String | Ja | Name des Outfits |
| `season` | String | Ja | `spring`, `summer`, `autumn` oder `winter` |
| `occasion` | String | Ja | Anlass des Outfits |
| `color` | String | Ja | Hauptfarbe des Outfits |
| `description` | String | Nein | Zusätzliche Beschreibung |
| `favorite` | Boolean | Nein | Favoritenstatus, standardmäßig `false` |
| `imageUrl` | String | Nein | Pfad zum gespeicherten Bild |

## Bild-Upload

Bilder werden mit Multer verarbeitet und im Ordner `uploads/` gespeichert.

Unterstützte Bildformate:

- JPG und JPEG
- PNG
- WebP

Maximale Dateigröße:

```text
5 MB
```

Beim Ersetzen eines Bildes wird das vorherige Bild gelöscht.  
Beim Löschen eines Outfits wird auch das dazugehörige Bild aus dem Upload-Ordner entfernt.

Gespeicherte Bilder sind über folgende Adresse erreichbar:

```text
http://localhost:3000/uploads/DATEINAME
```

## Projektstruktur

```text
myoutfits-backend/
├── middleware/
│   └── upload.js
├── models/
│   └── outfit.model.js
├── routes/
│   └── outfit.routes.js
├── uploads/
├── .env.example
├── package.json
└── server.js
```

Der Ordner `uploads/` wird automatisch erstellt, falls er noch nicht vorhanden ist. Hochgeladene Bilder und die echte `.env`-Datei werden nicht in Git gespeichert.

## Fehlerbehandlung

Die API verwendet passende HTTP-Statuscodes:

- `201` für erfolgreich erstellte Outfits
- `400` für ungültige Eingabedaten oder IDs
- `404` für nicht gefundene Outfits
- `500` für interne Serverfehler

Fehlgeschlagene Bild-Uploads werden soweit möglich aus dem Upload-Ordner entfernt.

## Verzeichnis der verwendeten KI-Werkzeuge

- **ChatGPT / Codex (OpenAI):** Unterstützung bei der Erklärung von Node.js-, Express-, MongoDB- und JavaScript-Konzepten, bei der Planung einzelner Funktionen, bei der Fehlersuche sowie bei Vorschlägen für Codeabschnitte, Kommentare und Dokumentation.

Alle Vorschläge wurden geprüft, an das Projekt angepasst und durch manuelle Funktionsprüfungen kontrolliert. Die Verantwortung für die Umsetzung und das Verständnis des Projekts liegt bei der Autorin.

## Autorin

**Son Yong Kim**  
HTW Berlin – Web-Technologien  
Sommersemester 2026
