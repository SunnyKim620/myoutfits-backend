const express = require('express'); // Das Express-Framework wird importiert.

const fs = require('fs'); // Ermöglicht das Löschen einer gespeicherten Bilddatei.

const path = require('path'); // Erstellt den vollständigen Pfad zur Bilddatei.

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

// UPDATE: Den Favoritenstatus eines Outfits ändern
router.patch('/:id/favorite', async (req, res) => {

  try {

    const outfit =
      await Outfit.findById(
        req.params.id
      ); // Sucht das Outfit über seine MongoDB-ID.


    if (!outfit) {

      return res.status(404).json({
        message: 'Outfit wurde nicht gefunden.',
      }); // Sendet den Statuscode 404, wenn kein Outfit gefunden wurde.

    }


    outfit.favorite =
      !outfit.favorite;
    // Wechselt zwischen Favorit und Nicht-Favorit.


    const aktualisiertesOutfit =
      await outfit.save();
    // Speichert den neuen Favoritenstatus in MongoDB.


    res.json(
      aktualisiertesOutfit
    ); // Sendet das aktualisierte Outfit zurück.

  } catch (fehler) {

    console.error(
      'Fehler beim Ändern des Favoritenstatus:',
      fehler.message
    );

    res.status(500).json({
      message:
        'Der Favoritenstatus konnte nicht geändert werden.',
    });

  }

});

// DELETE: Ein Outfit und sein Bild löschen
router.delete('/:id', async (req, res) => {

  try {

    const geloeschtesOutfit =
      await Outfit.findByIdAndDelete(
        req.params.id
      ); // Löscht das Outfit mit der übergebenen MongoDB-ID.


    if (!geloeschtesOutfit) {

      return res.status(404).json({
        message: 'Outfit wurde nicht gefunden.',
      }); // Sendet den Statuscode 404, wenn kein Outfit gefunden wurde.

    }


    if (geloeschtesOutfit.imageUrl) {

      const relativerBildpfad =
        geloeschtesOutfit.imageUrl.replace(
          /^\/+/,
          ''
        ); // Entfernt den Schrägstrich am Anfang.

      const bildpfad =
        path.join(
          __dirname,
          '..',
          relativerBildpfad
        ); // Erstellt den vollständigen Pfad zur Bilddatei.


      try {

        await fs.promises.unlink(
          bildpfad
        ); // Löscht das Bild aus dem Upload-Ordner.

      } catch (dateiFehler) {

        if (dateiFehler.code !== 'ENOENT') {

          console.error(
            'Fehler beim Löschen des Bildes:',
            dateiFehler.message
          );

        }

      }

    }


    res.json({
      message: 'Outfit wurde erfolgreich gelöscht.',
    }); // Bestätigt das erfolgreiche Löschen.

  } catch (fehler) {

    console.error(
      'Fehler beim Löschen des Outfits:',
      fehler.message
    );

    res.status(500).json({
      message: 'Outfit konnte nicht gelöscht werden.',
    });

  }

});

module.exports = router; // Exportiert den Router für die server.js-Datei.