const mongoose = require('mongoose');
const schema = mongoose.Schema({
    Proprietar: mongoose.Schema.Types.ObjectId,
    NumeAnimal: String,
    Rasa: String,
    Varsta: Number,
    Descriere: String,
    Categorie: String,
    Adoptie: Boolean,
    img_profil: String,
    poze: [String]
});

module.exports = mongoose.model('Animal', schema);
