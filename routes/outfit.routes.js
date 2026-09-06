const express = require('express'); // Das Express-Framework wird importiert.
const router = express.Router(); // Ein Router für die Outfit-Routen wird erstellt
const Outfit = require('../models/outfit.model'); // Das Outfit-Modell wird importiert.


router.get('/', async (req,res) => {  // Verarbeitet eine GET-Anfrage für alle Outfits.

      try { // Versucht, die Outfits aus der Datenbank zu laden.

           const outfits = await Outfit.find(); // Lädt alle Outfits aus der MongoDB-Datenbank.
           res.json(outfits); // Sendet die Outfits als JSON-Antwort.
    } catch(fehler){
        console.error('Fehler beim Laden der Outfits:', fehler.message);

        res.status(500).json({
            message: 'Outfits konnten nicht geladen werden',
        });
    }


});

module.exports = router; // Exportiert den Router für die server.js-Datei.