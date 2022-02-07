const Facture = require('../models/Facture')
const User = require('../models/User')

exports.createFactue = (req, res)=>{
    req_id = req.params.id
    //faut verifier que userID donc le _id de la bdd user existe bien car la facture doit etre enregistrer dans l'utilisateur
    User.find({_id:req_id}, (err, docs) => {
        console.log(docs[0])
        const facture = new Facture({
            userID: docs[0]._id,
            street: docs[0].street,
            city: docs[0].city,
            streetNumber: docs[0].streetNumber,
            command: docs[0].pannier,
            postCode: docs[0].postCode,
            prix: docs[0].prix_ttl_panier,
            moyendepayement: "Paypal",
            prixpayer: 0
        })
        console.log(facture)
        facture.save()
        .then(() => res.status(201).json({ message: "Facture enregistrée" }))
        // .catch(() => res.status(400).json({ error }));
    })
    .then(()=>{
        _id_facture = []
        Facture.find({userID:req_id}, {_id:1}, (err, docs) => {
            console.log(docs)
            docs.forEach(facture_trouver => {
                _id_facture.push(facture_trouver._id)
            });
            console.log(_id_facture)
            console.log(req_id)
            User.updateOne({_id:req_id}, {$set: {comande: _id_facture}}, (err, docs) =>{
                if(err) console.log(err);
                console.log(docs)
                console.log('c fait bg')
            })
        })
    })
    // facture.save()
    //     .then(() => res.status(201).json({ message: "Facture enregistrée" }))
    //     .catch(() => res.status(400).json({ error }));//.then(() => res.send('jesaispasencorebg'))
};