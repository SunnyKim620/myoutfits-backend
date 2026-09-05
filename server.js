const express = require('express'); // Das Express-Framework wird importiert.
const app = express(); // Eine Express-Anwendung wird erstellt und in der Konstanten app gespeichert.
const PORT = 3000; // Der Backend-Server verwendet den Port 3000.


app.use(express.json()); // Eingehende JSON-Daten werden automatisch gelesen.

app.get('/', (req, res) => { // Reagiert auf eine GET-Anfrage an die Startadresse.
  res.send('MyOutfits-Backend läuft.'); // Sendet eine Antwort an den Browser.
});

app.listen(PORT, () => { // Der Server wird auf dem festgelegten Port gestartet.
  console.log('Server läuft auf http://localhost:' + PORT); // Zeigt die Serveradresse im Terminal an.
});