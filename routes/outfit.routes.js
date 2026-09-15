const express = require('express'); // Das Express-Framework wird importiert.
const router = express.Router(); // Ein Router für die Outfit-Routen wird erstellt
const Outfit = require('../models/outfit.model'); // Das Outfit-Modell wird importiert.

// READ: Alle Outfits laden
router.get('/', async (req,res) => {  // Verarbeitet eine GET-Anfrage für alle Outfits.

      try { // Versucht, die Outfits aus der Datenbank zu laden.

        const outfits = await Outfit.find(); // Lädt alle Outfits aus der MongoDB-Datenbank.

        res.json(outfits); // Sendet die Outfits als JSON-Antwort.

    } catch(fehler){

        console.error(
        'Fehler beim Laden der Outfits:', 
        fehler.message
        ); // Zeigt den Fehler im Terminal an.



        res.status(500).json({
            message: 'Outfits konnten nicht geladen werden',
        }); // Sendet eine Fehlermeldung mit dem Statuscode 500.
    }


});

// CREATE: Ein neues Outfit speichern
router.post('/', async (req, res) => { // Verarbeitet eine POST-Anfrage zum Erstellen eines neuen Outfits.

      try { // Versucht, das neue Outfit in der Datenbank zu speichern.

         const neuesOutfit = 
           new Outfit(req.body); // Erstellt ein neues Outfit-Objekt aus den empfangenen JSON-Daten.

          const gespeichertesOutfit = 
             await neuesOutfit.save(); // Speichert das neue Outfit in der MongoDB-Datenbank.
            
        res
         .status(201)
         .json(gespeichertesOutfit); // Sendet das gespeicherte Outfit mit dem Statuscode 201 zurück.

        } catch (fehler) {



 console.error(
      'Fehler beim Erstellen des Outfits:',
      fehler.message
    ); // Zeigt den Fehler im Terminal an.

    res.status(400).json({
      message: 'Outfit konnte nicht erstellt werden.',
      fehler: fehler.message,
    }); // Sendet bei ungültigen Daten eine Fehlermeldung mit dem Statuscode 400.

  }

});



            module.exports = router; // Exportiert den Router für die server.js-Datei.
