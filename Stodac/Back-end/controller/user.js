const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Thing = require('../models/Thing');
//"use strict";
const nodemailer = require("nodemailer");

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
                streetNumber: 54000,
                postCode: 10,
                country: "FRA",
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
        })})
    });
    res.send();
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
