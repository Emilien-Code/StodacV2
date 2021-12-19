const mongoose = require('mongoose');


const thingSchema = mongoose.Schema({
    name : { type : String },
    manufacturer: {type :  String}, 
    qty: {type : Number}, 
    price:  {type : Number}, 
    compatibility:  {type : Array},
    description: {type : String},
    reference: {type : String}, 
    category: {type : String},
    img: {type : String}, 
    state: {type : String},
    commentaires: {type : Array},
    poids: {type : Number}
});

thingSchema.index({ name : 'text', manufacturer : 'text', reference : 'text', category : 'text' })

module.exports = mongoose.model('Thing', thingSchema);

/*
const Thing  = new mongoose.model('Thing', {
    name: String, 
    manufacturer:  String, 
    qty: Number, 
    price:  Number, 
    compatibility:  Array,
    description: String,
    reference: String, 
    category: String,
    img: String, 
    state: String,
    commentaires: Array,
    poids: Number
});

module.exports = Thing;


*/