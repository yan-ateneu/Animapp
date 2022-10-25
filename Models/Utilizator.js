const mongoose = require('mongoose');
const schema = mongoose.Schema({
    Nume: String,
    Email: String,
    Descriere: String,
    Ingrijire: Boolean,
    img_profil: String,
    /*Animale: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Animal'
        }
    ]*/
});

module.exports = mongoose.model('Utilizator', schema);
