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
    // Hier werden alle Outfits aus MongoDB geladen.



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




// READ: Ein einzelnes Outfit über seine ID laden
router.get('/:id', async (req, res) => {

  try {

    const outfit =
      await Outfit.findById(
        req.params.id
      );
    // Sucht das Outfit über die übergebene MongoDB-ID.


    if (!outfit) {

      return res.status(404).json({

        message:
          'Outfit wurde nicht gefunden.',

      });
      // Sendet den Statuscode 404, wenn kein Outfit gefunden wurde.

    }


    res.json(outfit);
    // Sendet das gefundene Outfit an das Frontend.

  } catch (fehler) {

    console.error(
      'Fehler beim Laden des Outfits:',
      fehler.message
    );

    res.status(400).json({

      message:
        'Outfit konnte nicht geladen werden.',

    });
    // Sendet bei einer ungültigen ID den Statuscode 400.

  }

});




// CREATE: Ein neues Outfit mit einem optionalen Bild speichern
router.post(
  '/',   // Verarbeitet die POST-Anfrage zum Erstellen eines neuen Outfits.
  upload.single('image'),  // Lädt ein einzelnes Bild hoch.

  async (req, res) => {

    try {

 // Erstellt ein neues Outfit mit den Daten vom Frontend.
      const neuesOutfit = new Outfit({
        //Der Code erstellt ein neues Outfit.

        ...req.body, // Übernimmt die Textdaten aus dem Formular.

        favorite:
          req.body.favorite === true ||
          req.body.favorite === 'true',

        imageUrl: req.file
          ? '/uploads/' + req.file.filename
          : '', // Speichert den Bildpfad oder einen leeren Text.

      });


      const gespeichertesOutfit =
        await neuesOutfit.save(); // Hier wird das neue Outfit in MongoDB gespeichert.
                                  // save() speichert das Outfit in der Datenbank.
                                  //await wartet auf das Ergebnis von save().


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





// UPDATE: Ein Outfit und optional sein Bild ändern

router.put(
  '/:id',
  upload.single('image'),
  async (req, res) => {

    try {

      const outfit =
        await Outfit.findById(
          req.params.id
        );
      // Sucht das Outfit über seine MongoDB-ID.


      if (!outfit) {

        if (req.file) {

          await fs.promises
            .unlink(req.file.path)
            .catch(() => {});
          // Entfernt ein bereits hochgeladenes neues Bild.

        }

        return res.status(404).json({
          message:
            'Outfit wurde nicht gefunden.',
        });

      }


      const alteBildUrl =
        outfit.imageUrl;
      // Speichert den bisherigen Bildpfad.


      outfit.title =
        req.body.title ??
        outfit.title;

      outfit.season =
        req.body.season ??
        outfit.season;

      outfit.occasion =
        req.body.occasion ??
        outfit.occasion;

      outfit.color =
        req.body.color ??
        outfit.color;

      outfit.description =
        req.body.description ??
        outfit.description;
      // Ändert die übermittelten Textdaten.


      if (
        req.body.favorite !==
        undefined
      ) {

        outfit.favorite =
          req.body.favorite === true ||
          req.body.favorite === 'true';

      }


      if (req.file) {

        outfit.imageUrl =
          '/uploads/' +
          req.file.filename;
        // Verwendet das neu hochgeladene Bild.

      }


      const aktualisiertesOutfit =
        await outfit.save();
      // Speichert die Änderungen in MongoDB.


      if (
        req.file &&
        alteBildUrl
      ) {

        const relativerBildpfad =
          alteBildUrl.replace(
            /^\/+/,
            ''
          );

        const alterBildpfad =
          path.join(
            __dirname,
            '..',
            relativerBildpfad
          );


        try {

          await fs.promises.unlink(
            alterBildpfad
          );
          // Löscht das alte Bild nach erfolgreicher Änderung.

        } catch (dateiFehler) {

          if (
            dateiFehler.code !==
            'ENOENT'
          ) {

            console.error(
              'Fehler beim Löschen des alten Bildes:',
              dateiFehler.message
            );

          }

        }

      }


      res.json(
        aktualisiertesOutfit
      );
      // Sendet das aktualisierte Outfit zurück.

    } catch (fehler) {

      if (req.file) {

        await fs.promises
          .unlink(req.file.path)
          .catch(() => {});
        // Löscht das neue Bild, wenn das Speichern fehlschlägt.

      }

      console.error(
        'Fehler beim Aktualisieren des Outfits:',
        fehler.message
      );

      res.status(400).json({
        message:
          'Outfit konnte nicht aktualisiert werden.',
        fehler: fehler.message,
      });

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