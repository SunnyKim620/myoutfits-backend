require('dotenv').config(); //Lädt die Umgebungsvariablen aus der .env-Datei.

const express = require('express'); // Das Express-Framework wird importiert.
const cors = require('cors'); // Das CORS-Paket wird importiert.
const mongoose = require('mongoose'); // Das Mongoose-Paket wird importiert.
const path = require('path'); // Das Node.js-Modul für Dateipfade wird importiert.


const outfitRoutes = require('./routes/outfit.routes'); // Die Outfit-Routen werden importiert.
const app = express(); // Eine Express-Anwendung wird erstellt und in der Konstanten app gespeichert.
const PORT = 3000; // Der Backend-Server verwendet den Port 3000.

app.use(cors()); // Erlaubt dem Angular-Frontend den Zugriff auf das Backend.
app.use(express.json()); // Eingehende JSON-Daten werden automatisch gelesen.
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'))
); // Macht die gespeicherten Bilder über den Browser erreichbar.
app.use('/api/outfits', outfitRoutes); // Verbindet die Outfit-Routen mit der Adresse /api/outfits.

mongoose
  .connect(process.env.MONGODB_URI) // Verbindet das Backend mit MongoDB über die Adresse aus der .env-Datei.
  .then(() => {
    console.log('MongoDB-Verbindung erfolgreich.'); // Wird bei erfolgreicher Verbindung ausgegeben.
  })
  .catch((fehler) => {
    console.error('MongoDB-Verbindung fehlgeschlagen:', fehler.message); // Zeigt einen Verbindungsfehler an.
  });

app.get('/', (req, res) => { // Reagiert auf eine GET-Anfrage an die Startadresse.
  res.send('MyOutfits-Backend läuft.'); // Sendet eine Antwort an den Browser.
});

app.listen(PORT, () => { // Der Server wird auf dem festgelegten Port gestartet.
  console.log('Server läuft auf http://localhost:' + PORT); // Zeigt die Serveradresse im Terminal an.
});
