const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type : String, required : true },
    userName: {type : String, required : false, unique: false},
    email:  {type : String, required : true, unique: true },
    password: {type : String, required : false },
    street:  {type : String, required : false },
    city:  {type : String, required : false },
    streetNumber: {type : Number, required : false },
    postCode:{type :  Number, required : false },
    country: {type : String, required : false },
    pannier: {type : Array, required : false },
    //prix_ttl_panier: {type : Number, required : false },
    comande: {type : Array, required : false },
    admin : {type : Boolean, required : true },
    mobile : {type : Number, required : false },
    saveLivraison: {type : Object, required : false},
    savePrix:{type:Object, required:false},
    isActive:{type:Boolean, required:false}
});


// module.exports = Usr;
module.exports = mongoose.model('Usr', userSchema);