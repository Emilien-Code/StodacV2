const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Thing = require('../models/Thing');
//"use strict";
const nodemailer = require("nodemailer");
const { rawListeners } = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then( hash => {
            const user = new User({
                email: req.body.email,
                userName: req.body.email,
                password: hash,
                firstName : req.body.firstName,
                lastName : req.body.lastName,
                street:  "", 
                city:  "",
                streetNumber: -1,
                postCode: -1, 
                country: "",
                admin: false,
                mobile: req.body.mobile
            });
            user.save()
            .then(()=>{

// async..await is not allowed in global scope, must use a wrapper
                async function main() {
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "ssl0.ovh.net",
                        port: 465,
                        secure: true, // true for 465, false for other ports
                        auth: {
                            user: "boutique@stodac.fr", // generated ethereal user
                            pass: "Bouboustodac@54360", // generated ethereal password
                        },
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Création de compte", // Subject line
                        text: "Bonjour, vous venez de créer un compte sur la boutique en ligne Stodac.fr, merci de votre confiance !", // plain text body
                        html: "<b>Bonjour, bous venez de créer un compte sur la boutique en ligne Stodac.fr, merci de votre confiance !</b>", // html body
                    });

                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                }

                main().catch(console.error);
                console.log("test")
             res.status(201).json({ message : 'Utilisateur Créé'})})
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json( { error }))
};

/** GET Controller */

exports.getAllUsers = (req, res) =>{
    User.find({}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getInfos = (req, res) =>{
    User.find({_id:req.params.id}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getAllCommandes = (req, res) =>{
    console.log(req.body)
    User.find({_id:req.params.id},{admin:1},(err,docs)=>{
        console.log(docs)
        if(docs[0].admin){ 
            let ordre = null
            let trie = null
            // req.body.order.forEach(function(param){
            switch(req.body.parametre[0]){
                case "num":
                    if(req.body.num == -1 || req.body.num == 1){
                        ordre = {"comande.id":req.body.num}
                    }
                    break
                case "email":
                    if(req.body.email == -1 || req.body.email == 1){
                        ordre = {"comande.email":req.body.email}
                    }
                    break
                case "tel":
                    if(req.body.tel == -1 || req.body.tel == 1){
                        ordre = {"comande.mobile":req.body.tel}
                    }
                    break
                case "np":
                    if(req.body.np == -1 || req.body.np == 1){
                        ordre = {"comande.lastname":req.body.np,"comande.firstname":req.body.np}
                    }
                    break
                case "etat":
                    if(req.body.etat == -1 || req.body.etat == 1){
                        ordre = {"comande.etat":req.body.etat}
                    }
                    break
                case "date":
                    if(req.body.date == -1 || req.body.date == 1){
                        ordre = {"comande.date":req.body.date}
                    }
                    break
                case "default":
                    ordre = {"comande.etat":1, "comande.date":-1}
                    break
            }
            if(req.body.parametre[1] == "global"){
                trie = { $or: [{"comande.id":{$regex:req.body.recherche.Global, $options:'i'}}, {"comande.facture.email":{$regex:req.body.recherche.Global, $options:'i'}}, {"strmobile":{$regex:req.body.recherche.Global, $options:'i'}},{"np":{$regex:req.body.recherche.Global, $options:'i'}},{"nometat":{$regex:req.body.recherche.Global, $options:'i'}},{"strdate":{$regex:req.body.recherche.Global, $options:'i'}}]}
            }
            else if(req.body.parametre[1] == "avancer"){
                trie = { $and : [{"comande.id":{$regex:req.body.recherche.id, $options:'i'}}, {"comande.facture.email":{$regex:req.body.recherche.email, $options:'i'}}, {"strmobile":{$regex:req.body.recherche.tel, $options:'i'}},{"np":{$regex:req.body.recherche.np, $options:'i'}},{"nometat":{$regex:req.body.recherche.etat, $options:'i'}},{"strdate":{$regex:req.body.recherche.date, $options:'i'}}]}
            }
            else{
                trie = {"comande.id":{$regex:"",$options:'i'}}
            }
            console.log(ordre)
            console.log(trie)
            if (ordre != null){
                if (req.body.limit == ""){
                    User.aggregate([{$unwind: "$comande"},{$addFields:{"strdate":{$dateToString:{format: "%Y-%m-%d", date: "$comande.date"}},"strmobile":{$toString:{$toLong:"$comande.facture.mobile"}},"nometat":{$arrayElemAt:["$comande.nometat", "$comande.etat"]},"np":{$concat:["$comande.facture.lastname"," ","$comande.facture.firstname"]}}},{$match:trie},{$project:{_id:0, comande:1}},{$sort:ordre}], (err, docs)=>{
                        console.log(docs)
                        res.send(docs)
                    });
                }
                else{
                    User.aggregate([{$unwind: "$comande"},{$addFields:{"strdate":{$dateToString:{format: "%Y-%m-%d", date: "$comande.date"}},"strmobile":{$toString:{$toLong:"$comande.facture.mobile"}},"nometat":{$arrayElemAt:["$comande.nometat", "$comande.etat"]},"np":{$concat:["$comande.facture.lastname"," ","$comande.facture.firstname"]}}},{$match:trie},{$project:{_id:0, comande:1}},{$sort:ordre},{$limit:req.body.limit}], (err, docs)=>{
                        console.log(docs)
                        res.send(docs)
                    });
                }
            }
        }
    })
}

exports.getFacture = (req, res) =>{
    num = req.params.id+req.params.numfacture
    // num = parseInt(num)
    console.log(num)
    User.find({"_id":req.params.id},{"comande":{"$elemMatch":{"id":num}}}, (err, docs)=>{
        if(err) console.log(err);
        // console.log(docs[0])
        console.log(docs)
        res.send(docs[0])
    })
    // User.aggregate([{$match:{"_id":req.params.id}}, {$project: {comande: {$filter: {input: '$comande', as: 'com', cond: {$eq: ['$$com.id', num]}}}}}], (err, docs)=>{
    //         if(err) console.log(err);
    //         // console.log(docs[0])
    //         console.log(docs)
    //         res.send(docs[0])
    //     })
}

exports.getByEmail = (req, res) =>{
    User.find({email:req.params.email}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs);
   });
};

exports.getByCity = (req, res) =>{
    User.find({city:req.params.city}, (err, docs)=>{
       if(err) console.log(err);
       res.send(docs)
   });
};

exports.loginByMail = (req, res, next) => {
    console.log("jarrivela")
    User.findOne({ email : req.body.email })
        .then(user => {
            if(!user) {
                return res.status(401).json({ error : 'Utilisateur introuvable' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => { 
                    if(!valid){
                        return res.status(401).json({ error : 'Mot de passe erroné' });
                    }
                    return res.status(200).json({
                        userID: user._id,
                        token: jwt.sign(
                            {userID : user._id},
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '1h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }))
        })
        .catch(error => res.status(500).json({ error }))
};

exports.loginAdmin = (req, res, next) => {
    console.log('1');
    User.findOne({ email : req.body.email })
        .then(user => {
            console.log('2');
            if(!user) {
                return res.status(401).json({ error : 'Utilisateur introuvable' });
            }
            if(user.admin){
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    console.log(3);
                    if(!valid){
                        return res.status(401).json({ error : 'Mot de passe erroné' });
                    }
                    return res.status(200).json({
                        userID: user._id,
                        token: jwt.sign(
                            {userID : user._id},
                            'RANDOM_TOKEN_SECRET_ADMIN',
                            { expiresIn: '1h'}
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }, console.log('test')))}
        })
        .catch(error => res.status(500).json({ error },console.log('test2')))
};
/**PATCH Controller */

exports.updateUser = (req, res) => {
    User.updateOne({_id:req.params.id}, {$set: {...req.body}}, (err,docs)=>{
        if(err) console.log(err);

        res.send(req.body);
    });
};
exports.changeAddress = (req, res) => {
    console.log(req.params.id,req.body.street)
    User.updateOne({_id:req.params.id}, {$set: {street:req.body.street,streetNumber:req.body.streetNumber,city:req.body.city,postCode:req.body.postCode}}, (err, docs) =>{
        if(err) console.log(err);

        res.send(req.body);
    });
}

exports.addpanier = (req, res) => {
    console.log(req.body.length)
    var pasbon = []
    User.updateOne({_id:req.params.id}, {$set: {pannier: [], prix_ttl_panier: 0}}, (err, docs) =>{
        if(err) console.log(err);
    });
    prix_ttl = 0
    ttl_a_faire = req.body.length
    jensuis = 0
    req.body.forEach(function(obj){
        console.log(obj)
        console.log("bfzefzegfeziuifhuzhufhzfhzefzefzjhfizhfuze")
        Thing.find({_id:obj.article._id}, (err, docs) => {
            console.log(docs[0])
            console.log(docs[0].qty)
            console.log(obj)
            console.log(obj.qty)
            if(err){
                console.log(err)
                pasbon.push(obj.article.name)
            } else if ((docs[0].qty - obj.qty) >= 0){
                console.log(req.params.id)
                prix_obj_ttl = parseFloat(obj.article.price) * parseFloat(obj.qty)
                prix_obj_ttl = Math.round(prix_obj_ttl * 100)/100
                prix_ttl = prix_ttl + prix_obj_ttl
                console.log(prix_ttl)
                User.updateOne({_id:req.params.id}, {$push: {pannier: {articleID: obj.article._id, articlePrice: obj.article.price, articleName: obj.article.name, articleDescription: obj.article.description, articleImg: obj.article.img, qty: obj.qty, prix_ttl: prix_obj_ttl}}}, (err, docs) =>{
                    if(err) console.log(err);
                });
            } else {
                console.log("ifjeifehfoiehiofh")
                pasbon.push(obj.article._id)
            }
            if (pasbon.length > 0){
                console.log("azazazeezzeezzeezezee")
                prix_obj_ttl = 0
                User.updateOne({_id:req.params.id}, {$set: {panier: []}}, (err, docs) =>{
                    if(err) console.log(err);
                });
                // envoyer un petit message pour dire que la liste la des composant n'est pu disponible dans c quantité.
            } else {
                console.log("opp")
                // dire que tout est ok !
            }
            console.log("ici par contre...")
        })
        .then(() => {console.log("mais pas ici par contre...")
            prix_ttl = Math.round(prix_ttl * 100)/100
            console.log(prix_ttl)
            User.updateOne({_id:req.params.id}, {$set: {prix_ttl_panier: prix_ttl}}, (err, docs) =>{
                if(err) console.log(err);
            }).then(()=>{
                jensuis += 1
                if (jensuis == ttl_a_faire){
                    console.log("ditmoiqueçasortmtnlatoutalafin")
                    res.send()
                }
            })
        })
    });
}

exports.newCommand = (req, res) => {
    materiels_crea = []
    req_id = req.params.id
    console.log("ça commence")
    User.find({_id:req_id}, (err, docs) => {
        docs[0].pannier.forEach(function(object){
            materiel = {
                obj:{
                    id: object.articleID,
                    reference: object.articleRef,
                    name: object.articleName,
                    img: object.articleImg,
                    price: object.articlePrice,
                },
                qty: object.qty,
                prix_ttl: object.prix_ttl
            }
            materiels_crea.push(materiel)
        })
        prix_ttl_crea = docs[0].prix_ttl_panier
        console.log("jaifini")
        facture_crea = {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            mobile: req.body.mobile,
            email: req.body.email,
            street: req.body.street,
            city: req.body.city,
            streetNumber: req.body.streetNumber,
            postCode: req.body.postCode,
            moyendepayement: "rien",
        }
        ajd = new Date()
        // console.log(ajd.getDate())
        console.log(new Date(ajd.toISOString()))
        ajd = new Date(ajd.toISOString())
        numerocommande = String(docs[0].comande.length + 1)
        for(var i = 0; numerocommande.length <= 5; i++){
            numerocommande = "0"+numerocommande
        }
        lacommande = {
            id:docs[0]._id+numerocommande,
            materiels: materiels_crea,
            facture: facture_crea,
            prix_ttl: prix_ttl_crea,
            date: ajd,
            etat: 0,
            nometat: ["En préparation", "En livraison", "Recu"],
            fini: false
        }
        console.log(materiels_crea)
        console.log(lacommande)
        User.updateOne({_id:req_id}, {$push:{comande:lacommande}}, (err, docs) =>{
            if(err) console.log(err);
            console.log(docs)
            res.send()
        })
        // .then(()=>{})
    })
    // .then(()=>{
        // facture_crea = {
        //     street: req.body.street,
        //     city: req.body.city,
        //     streetNumber: req.body.streetNumber,
        //     postCode: req.body.postCode,
        //     moyendepayement: "rien",
        // }
        // ajd = new Date()
        // ajd = String(ajd.getDay()) + "/" + String(ajd.getMonth() + 1) + "/" + String(ajd.getFullYear())
        // lacommande = {
        //     materiels: materiels_crea,
        //     facture: facture_crea,
        //     date: ajd,
        //     fini: false
        // }
        // console.log(materiels_crea)
        // console.log(lacommande)
        // User.updateOne({_id:req_id}, {$push:{comande:lacommande}}, (err, docs) =>{
        //     if(err) console.log(err);
        //     console.log(docs)
        // }).then(()=>{res.send()})
    // })
    // commande = {
    //     materiels: materiels_crea,
    //     facture: facture_crea,
    //     date: ajd,
    //     fini: false
    // }
    // userID: docs[0]._id,
    // street: docs[0].street,
    // city: docs[0].city,
    // streetNumber: docs[0].streetNumber,
    // command: docs[0].pannier,
    // postCode: docs[0].postCode,
    // prix: docs[0].prix_ttl_panier,
    // moyendepayement: "rien",
    // prixpayer: 0
}

exports.resetpanier = (req, res) => {
    console.log("ça passe")
    //console.log(req.body.length)
    User.updateOne({_id:req.params.id}, {$set: {pannier: [], prix_ttl_panier: 0}}, (err, docs) =>{
        if(err) console.log(err);
    });
    res.send();
}

/**DELETE Controller */

exports.deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message : "l'article à bien été suprimé."}))
        .catch(error => res.status(400).json({ error }));
};
