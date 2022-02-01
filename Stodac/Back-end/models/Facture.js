const mongoose = require('mongoose');

const factureSchema = mongoose.Schema({
    userID: { type : String, required: true},
    street: { type : String, required: true },
    city: { type : String, required: true },
    streetNumber: { type : Number, required: true },
    postCode: { type : Number, required: true },
    command: { type : Array, required: true },
    prix: { type : Number, required: true },
    moyendepayement: { type : String, required: true },
    prixpayer: { type : Number, required: true }
});

module.exports = mongoose.model('Facture', factureSchema);