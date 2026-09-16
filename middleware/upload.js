const fs = require('fs'); // Ermöglicht das Erstellen von Ordnern.
const path = require('path'); // Erstellt sichere Dateipfade.
const multer = require('multer'); // Verarbeitet hochgeladene Dateien.


const uploadDirectory =
  path.join(__dirname, '..', 'uploads'); // Bestimmt den Speicherort der Bilder.


fs.mkdirSync(
  uploadDirectory,
  { recursive: true }
); // Erstellt den Upload-Ordner automatisch, falls er nicht existiert.


const storage = multer.diskStorage({

  destination: (req, file, callback) => {

    callback(
      null,
      uploadDirectory
    ); // Speichert das Bild im Upload-Ordner.

  },


  filename: (req, file, callback) => {

    const extension =
      path.extname(file.originalname).toLowerCase(); // Liest die Dateiendung.

    const uniqueName =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1_000_000_000) +
      extension; // Erstellt einen eindeutigen Dateinamen.

    callback(
      null,
      uniqueName
    );

  },

});


const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/webp',
]; // Legt die erlaubten Bildtypen fest.


const fileFilter = (req, file, callback) => {

  if (allowedMimeTypes.includes(file.mimetype)) {

    callback(null, true); // Akzeptiert eine erlaubte Bilddatei.

  } else {

    callback(
      new Error(
        'Nur JPG-, PNG- und WebP-Bilder sind erlaubt.'
      )
    ); // Lehnt andere Dateitypen ab.

  }

};


const upload = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  }, // Begrenzt die maximale Dateigröße auf 5 MB.

});


module.exports = upload; // Exportiert die Upload-Konfiguration.