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
                            pass: "StdcBoo54@", // generated ethereal password
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
    User.find({_id:req.params.id},{password:0}, (err, docs)=>{
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
                trie = { $and: [{ $or: [{"comande.id":{$regex:req.body.recherche.Global, $options:'i'}}, {"comande.facture.email":{$regex:req.body.recherche.Global, $options:'i'}}, {"strmobile":{$regex:req.body.recherche.Global, $options:'i'}},{"np":{$regex:req.body.recherche.Global, $options:'i'}},{"strdate":{$regex:req.body.recherche.Global, $options:'i'}}]}, {$or:[]}]}
            }
            else if(req.body.parametre[1] == "avancer"){
                trie = { $and: [{ $and : [{"comande.id":{$regex:req.body.recherche.id, $options:'i'}}, {"comande.facture.email":{$regex:req.body.recherche.email, $options:'i'}}, {"strmobile":{$regex:req.body.recherche.tel, $options:'i'}},{"np":{$regex:req.body.recherche.np, $options:'i'}},{"strdate":{$regex:req.body.recherche.date, $options:'i'}}]}, {$or:[]}]}
            }
            else{
                trie = { $and: [{"comande.id":{$regex:"",$options:'i'}}, {$or:[]}]}
            }
            console.log("c bug ici bro")
            console.log(req.body.recherche)
            let etatrecherche = []
            if (req.body.recherche.etat[0] || req.body.recherche.etat[4]){
                etatrecherche.push({"comande.etat":0})
            }
            if (req.body.recherche.etat[1] || req.body.recherche.etat[4]){
                etatrecherche.push({"comande.etat":1})
            }
            if (req.body.recherche.etat[2] || req.body.recherche.etat[4]){
                etatrecherche.push({"comande.etat":2})
            }
            if (req.body.recherche.etat[3] || req.body.recherche.etat[4]){
                etatrecherche.push({"comande.etat":3})
            }
            console.log(etatrecherche)
            trie.$and[1].$or = etatrecherche
            console.log(ordre)
            console.log(trie)
            if (ordre != null){
                if (req.body.limit == ""){
                    User.aggregate([{$unwind: "$comande"},{$addFields:{"strdate":{$dateToString:{format: "%Y-%m-%d", date: "$comande.date"}},"strmobile":{$toString:{$toLong:"$comande.facture.mobile"}},"np":{$concat:["$comande.facture.lastname"," ","$comande.facture.firstname"]}}},{$match:trie},{$project:{_id:0, comande:1}},{$sort:ordre}], (err, docs)=>{
                        console.log(docs)
                        res.send(docs)
                    });
                }
                else{
                    User.aggregate([{$unwind: "$comande"},{$addFields:{"strdate":{$dateToString:{format: "%Y-%m-%d", date: "$comande.date"}},"strmobile":{$toString:{$toLong:"$comande.facture.mobile"}},"np":{$concat:["$comande.facture.lastname"," ","$comande.facture.firstname"]}}},{$match:trie},{$project:{_id:0, comande:1}},{$sort:ordre}], (err, docs)=>{
                        console.log(docs)
                        res.send(docs)
                    });
                }
            }
        }
        else{
            res.send()
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

exports.getFactureAdmin = (req, res)=>{
    User.find({_id:req.params.id},{admin:1},(err,docs)=>{
        console.log(docs)
        if(docs[0].admin){
            User.find({"comande":{"$elemMatch":{"id":req.params.numfacture}}},{"comande":{"$elemMatch":{"id":req.params.numfacture}}}, (err, docs)=>{
                if(err) console.log(err);
                // console.log(docs[0])
                console.log(docs)
                res.send(docs[0])
            })
        }
    })
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
                User.updateOne({_id:req.params.id}, {$push: {pannier: {articleID: obj.article._id, articlePrice: obj.article.price, articleName: obj.article.name, articleDescription: obj.article.description, articleImg: obj.article.img, qty: obj.qty, prix_ttl: prix_obj_ttl, poids: obj.article.poids}}}, (err, docs) =>{
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
        .then(() => {console.log("mais pas ici par contre...")
        })
    });
}

exports.newCommand = (req, res) => {
    let materiels_crea = []
    const req_id = req.params.id
    //console.log("ça commence")
    User.find({_id:req_id}, (err, docs) => {
        docsancien = docs[0]
        User.updateOne({_id:req.params.id}, {$set: {pannier: [], prix_ttl_panier: 0}}, (err, docs) =>{
            if(err) console.log(err);
            else{
                let poids = 0
                docsancien.pannier.forEach(function(object){
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
                    console.log(object.poids)
                    poids += object.poids;
                })
                const prix_ttl_crea = docsancien.prix_ttl_panier
                //console.log("jaifini")
                const facture_crea = {
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
                //console.log(new Date(ajd.toISOString()))
                ajd = new Date(ajd.toISOString())
                numerocommande = String(docsancien.comande.length + 1)
                for(var i = 0; numerocommande.length <= 5; i++){
                    numerocommande = "0"+numerocommande
                }


                let lacommande = {
                    id:docsancien._id+numerocommande,
                    materiels: materiels_crea,
                    facture: facture_crea,
                    prix_ttl: prix_ttl_crea,
                    date: ajd,
                    etat: 0,
                    nometat: ["En préparation", "Envoyée", "Recue", "Annulée"],
                    fini: false,
                    pdf: '',
                    suiviColissimo: ''
                }


                const colissimo  = require('colissimo') ({ contract_number: '895244', password: 'LAPOSTE545483' })

                colissimo.label ({
                    sender: {
                        last_name: "Manessier",
                        first_name: "Clément",
                        address: "11 Bis Rue de Lorraine",
                        to_know: '',
                        zip_code: '54360',
                        city: 'Damelevières',
                        phone_number: '0620746637',
                        mail: 'contact@amc-est.fr'
                    },
                    receiver: {
                        last_name: req.body.lastname,
                        first_name: req.body.firstname,
                        address: req.body.streetNumber + ' ' + req.body.street,
                        to_know: '',
                        zip_code: req.body.postCode,
                        city: req.body.city,
                        phone_number: req.body.mobile.toString().split("33")[1],
                        mail: req.body.email
                    },
                    product: {
                        identifier: numerocommande,				// used to identify a package when you received it. its displayed before the company_name
                        insurance_value: 0,			            // the amount to insure
                        weight: poids						    // in kg, default 1
                    },
                    format: {
                        commercial_name: '895244'               // used for notifications
                    }
                }).then (infos => {
                    console.log (infos)
                    lacommande.pdf = infos.label
                    lacommande.suiviColissimo = infos.tracking_number
                    User.updateOne({_id:req_id}, {$push:{comande:lacommande}}, (err, docs) =>{
                        if(err) console.log(err);
                        //console.log(docs)
                        //VerifID

                        res.send()

                        console.log(poids)


                        async function main() {
                            let transporter = nodemailer.createTransport({
                                host: "ssl0.ovh.net",
                                port: 465,
                                secure: true,
                                auth: {
                                    user: "boutique@stodac.fr",
                                    pass: "StdcBoo54@",
                                },
                            });
                            let info = await transporter.sendMail({
                                from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
                                to: req.body.email, // list of receivers
                                subject: "Nouvelle commande", // Subject line
                                text: "Bonjour, votre commande à bien étée prise en compte. Nous faisons de notre mieux afin de vous livrer dans les plus brefs délais. \n Merci de votre confiance !", // plain text body
                                html: `<b>Bonjour, votre commande à bien étée prise en compte. Nous faisons de notre mieux afin de vous livrer dans les plus brefs délais. <br> Votre commande est disponible <a href='http://localhost:8080/mesCommandes/'>ici</a><br> Vous pouvez dès maintenant suivre votre commande avec le numéro de suivi ${lacommande.suiviColissimo} <br> Merci de votre confiance !</b>`, // html body
                            });
                            console.log("Message sent: %s", info.messageId);
                        }
                        main().catch(console.error);
                    })
                }).catch (error => {
                    console.error ("error : ", error)
                })
            }
        });
    })
}

exports.resetpanier = (req, res) => {
    console.log("ça passe")
    //console.log(req.body.length)
    User.updateOne({_id:req.params.id}, {$set: {pannier: [], prix_ttl_panier: 0}}, (err, docs) =>{
        if(err) console.log(err);
    });
    res.send();
}

exports.setEtat = (req, res) => {
    User.find({_id:req.params.id},{admin:1},(err,docs)=>{
        console.log(docs)
        if(docs[0].admin){
            console.log(req.body)
            User.updateOne({"comande":{$elemMatch:{"id":req.body.id}}}, {$set:{"comande.$.etat":req.body.etat}}, (err, docs)=>{
                console.log(docs)
                res.send()
            })
        }
        else{
            res.send()
        }
    })
}

exports.ChangeTout = (req, res) => {
    User.find({_id:req.params.id},{admin:1},(err,docs)=>{
        console.log(docs)
        if(docs[0].admin){
            User.updateOne({
                "comande":{
                    $elemMatch:{"id":req.body.id}
                }
            }, 
            {
                $set:{
                    "comande.$.etat":req.body.parametre[0], 
                    "comande.$.facture.lastname":req.body.parametre[1], 
                    "comande.$.facture.firstname":req.body.parametre[2],  
                    "comande.$.facture.streetnumber":req.body.parametre[3], 
                    "comande.$.facture.street": req.body.parametre[4],
                    "comande.$.facture.city":req.body.parametre[5],
                    "comande.$.facture.postCode":req.body.parametre[6],
                    "comande.$.facture.email":req.body.parametre[7],
                    "comande.$.facture.mobile":req.body.parametre[8],
                }
            }, 
            (err, docs)=>{
                console.log(docs)
                res.send()
            })
        }else{
            res.send()
        }
    })
}

/**DELETE Controller */

exports.deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(() => res.status(200).json({ message : "l'article à bien été suprimé."}))
        .catch(error => res.status(400).json({ error }));
};
