const express = require('express'); // Das Express-Framework wird importiert.

const router = express.Router(); // Ein Router für die Outfit-Routen wird erstellt.

const Outfit =
  require('../models/outfit.model'); // Das Outfit-Modell wird importiert.

const upload =
  require('../middleware/upload'); // Die Konfiguration für Bild-Uploads wird importiert.


// READ: Alle Outfits laden
router.get('/', async (req, res) => {

  try {

    const outfits =
      await Outfit.find(); // Lädt alle Outfits aus der MongoDB-Datenbank.

    res.json(outfits); // Sendet die Outfits als JSON-Antwort.

  } catch (fehler) {

    console.error(
      'Fehler beim Laden der Outfits:',
      fehler.message
    ); // Zeigt den Fehler im Terminal an.

    res.status(500).json({
      message: 'Outfits konnten nicht geladen werden.',
    }); // Sendet eine Fehlermeldung mit dem Statuscode 500.

  }

});


// CREATE: Ein neues Outfit mit einem optionalen Bild speichern
router.post(
  '/',
  upload.single('image'),
  async (req, res) => {

    try {

      const neuesOutfit = new Outfit({

        ...req.body, // Übernimmt die Textdaten aus dem Formular.

        favorite:
          req.body.favorite === true ||
          req.body.favorite === 'true',

        imageUrl: req.file
          ? '/uploads/' + req.file.filename
          : '', // Speichert den Bildpfad oder einen leeren Text.

      });


      const gespeichertesOutfit =
        await neuesOutfit.save(); // Speichert das Outfit in MongoDB.


      res
        .status(201)
        .json(gespeichertesOutfit); // Sendet das gespeicherte Outfit zurück.

    } catch (fehler) {

      console.error(
        'Fehler beim Erstellen des Outfits:',
        fehler.message
      ); // Zeigt den Fehler im Terminal an.

      res.status(400).json({
        message: 'Outfit konnte nicht erstellt werden.',
        fehler: fehler.message,
      }); // Sendet bei ungültigen Daten den Statuscode 400.

    }

  }
);


module.exports = router; // Exportiert den Router für die server.js-Datei.