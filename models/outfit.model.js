const mongoose = require('mongoose');  //Das Mongoose-Paket wird importiert.


const outfitSchema = new mongoose.Schema({  // Definiert die Struktur und Regeln eines Outfits.
title:{
    type: String,
    required: true,
    trim: true,
},

season:{
    type: String,
    required: true,
    enum: ['spring', 'summer', 'autumn', 'winter']

},

occasion: {
type:String,
required:true,
trim:true,

},

color:{
type:String,
required:true,
trim:true,

},

imageUrl: {

  type: String,

  default: '',

  trim: true,

}, // Speichert den Pfad des hochgeladenen Outfit-Bildes.

description:{
type: String,
default:'',
trim:true,

},
favorite:{
type:Boolean,
default:false,

},
});


const Outfit = mongoose.model('Outfit', outfitSchema); // Erstellt das Outfit-Modell aus dem Schema.
module.exports = Outfit; // Exportiert das Outfit-Modell für andere Dateien.
