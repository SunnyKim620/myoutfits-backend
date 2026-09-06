const mongoose = require('mongoose'); // Das installierte Mongoose-Paket wird geladen und in der Konstanten mongoose gespeichert.

const outfitSchema = new mongoose.Schema({   // Hier werden die Eigenschaften eines Outfits definiert.
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
