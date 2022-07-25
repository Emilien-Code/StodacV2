const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Thing = require('../models/Thing');
const paypalCtrl = require('../controller/paypal');
const nodemailer = require("nodemailer");
//require('dotenv').config();
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
                            user: process.env.MAIL_USER, // generated ethereal user
                            pass: process.env.MAIL_MDP, // generated ethereal password
                        },
                    });

                    // send mail with defined transport object
                    let info = await transporter.sendMail({
                        from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Création de compte", // Subject line
                        html: `<!DOCTYPE html>
                    <html lang="en">
                        <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Document</title>
                    <style>
                        *{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        border: 0;
                    }
                        body{
                        font-family: sans-serif;
                        height: 100%;
                        padding: 3%;
                        max-width: 800px;

                    }
                        .titre{
                        padding: 14px;
                        text-align: center;
                        font-size: 4em;
                    }
                        .banner{
                        color: white;
                        background-color: #007057;
                        height: 100px;
                        width: 100%;
                    }
                        #wrapper{
                        width: 100%;

                    }
                        #main{
                        padding: 100px 15% 50px 15%;
                        width: 100%;
                    }
                        header{
                        width: 100%;
                    }
                        p{
                        font-size: 1em;
                        margin: 0 0 10px 20px;
                    }

                        footer ul{
                        margin: 10px;
                        text-decoration: none;
                        list-style: none;
                    }
                        footer{
                        width: 100%;
                        position: relative;
                        bottom: 0px;
                        margin-top: 50px;
                        height: 150px;
                        color: white;
                        z-index: 5;
                    }
                        footer .img{
                        height: 40px;
                    }
                        #payements{
                        width: 40%;
                        display: flex;
                        justify-content: space-around;
                        align-items: center;
                    }
                        #bottom_footer {
                        padding-top: 10px;
                        background-color: #007057;
                        height: 100px;
                        text-align: center;
                    }
                        .footerLink{
                        padding: 10px;
                        text-decoration: none;
                        color: white;
                    }


                    </style>
                </head>
                    <body>
                    <div id="wrapper">
                        <header>
                            <div class="banner">
                                <h1 class="titre">Stodac.</h1>
                            </div>
                        </header>
                        <div id="main">
                            <p>Bonjour,</p>
                            <p>Vous venez de vous inscrire sur le site <a href="https://www.stodac.fr">Stodac.fr</a>.</p>
                            <p>Merci de votre confiance.</p>
                        </div>
                        <footer>
                            <div id="bottom_footer">
                                <ul style="text-align: center">
                                    <li>
                                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                                            Mention légales
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                                            Conditions générales de vente
                                        </a>
                                    </li>
                                    <li>
                                        © Stodac tous droits réservés
                                    </li>
                                </ul>

                            </div>

                        </footer>
                    </div>
                    </body>
                </html>`
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
    //console.log(req.body)
    User.find({_id:req.params.id},{admin:1},(err,docs)=>{
        //console.log(docs)
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
            // console.log("c bug ici bro")
            // console.log(req.body.recherche)
            let etatrecherche = []
            if (req.body.recherche.etat[0] || req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":0})
            }
            if (req.body.recherche.etat[1] || req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":1})
            }
            if (req.body.recherche.etat[2] || req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":2})
            }
            if (req.body.recherche.etat[3] || req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":3})
            }
            if (req.body.recherche.etat[4] || req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":4})
            }
            if (req.body.recherche.etat[5] || req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":5})
            }
            if (req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":-1})
            }
            if (req.body.recherche.etat[6]){
                etatrecherche.push({"comande.etat":-2})
            }
            // console.log(etatrecherche)
            trie.$and[1].$or = etatrecherche
            // console.log(ordre)
            // console.log(trie)
            if (ordre != null){
                if (req.body.limit == ""){
                    User.aggregate([{$unwind: "$comande"},{$addFields:{"strdate":{$dateToString:{format: "%Y-%m-%d", date: "$comande.date"}},"strmobile":{$toString:{$toLong:"$comande.facture.mobile"}},"np":{$concat:["$comande.facture.lastname"," ","$comande.facture.firstname"]}}},{$match:trie},{$project:{_id:0, comande:1}},{$sort:ordre}], (err, docs)=>{
                        // console.log(docs)
                        res.send(docs)
                    });
                }
                else{
                    User.aggregate([{$unwind: "$comande"},{$addFields:{"strdate":{$dateToString:{format: "%Y-%m-%d", date: "$comande.date"}},"strmobile":{$toString:{$toLong:"$comande.facture.mobile"}},"np":{$concat:["$comande.facture.lastname"," ","$comande.facture.firstname"]}}},{$match:trie},{$project:{_id:0, comande:1}},{$sort:ordre}], (err, docs)=>{
                        // console.log(docs)
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
                            process.env.JWT,
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
    console.log(req.body.panier.length)
    var pasbon = []
    User.updateOne({_id:req.params.id}, {$set: {pannier: [], prix_ttl_panier: 0}}, (err, docs) =>{
        if(err) console.log(err);
    });
    prix_ttl = 0
    ttl_a_faire = req.body.panier.length
    jensuis = 0
    let poids_ttl = 0
    req.body.panier.forEach(function(obj){
        console.log(obj)
        console.log("bfzefzegfeziuifhuzhufhzfhzefzefzjhfizhfuze")
        Thing.find({_id:obj.article._id}, (err, docs) => {
            console.log(docs[0])
            console.log(docs[0].qty)
            console.log(obj)
            console.log(obj.qty)
            if(err){
                console.log(err)
                // pasbon.push(obj.article.name)
            } else {
                console.log(req.params.id)
                if (req.body.modeDeLivraison != "surPlace"){
                    poids_ttl += obj.article.poids * obj.qty
                }
                prix_obj_ttl = parseFloat(obj.article.price) * parseFloat(obj.qty)
                prix_obj_ttl = Math.round(prix_obj_ttl * 100)/100
                prix_ttl = prix_ttl + prix_obj_ttl
                console.log(prix_ttl)
                User.updateOne({_id:req.params.id}, {$push: {pannier: {articleID: obj.article._id, articlePrice: obj.article.price,articlePriceHT:Math.round((obj.article.price/1.2)*100)/100, articleName: obj.article.name, articleDescription: obj.article.description, articleImg: obj.article.img, qty: obj.qty, prix_ttl: prix_obj_ttl, poids: obj.article.poids}}}, (err, docs) =>{
                    if(err) console.log(err);
                });
            }
            // if (pasbon.length > 0){
            //     console.log("azazazeezzeezzeezezee")
            //     prix_obj_ttl = 0
            //     User.updateOne({_id:req.params.id}, {$set: {panier: []}}, (err, docs) =>{
            //         if(err) console.log(err);
            //     });
            //     // envoyer un petit message pour dire que la liste la des composant n'est pu disponible dans c quantité.
            // } else {
            //     console.log("opp")
            //     // dire que tout est ok !
            // }
            console.log("ici par contre...")
            console.log(prix_ttl)
            // User.updateOne({_id:req.params.id}, {$set: {prix_ttl_panier: prix_ttl}}, (err, docs) =>{
            //     if(err) console.log(err);
            // }).then(()=>{
            jensuis += 1
            if (jensuis == ttl_a_faire){
                let prix_fdp = 0
                if (req.body.modeDeLivraison != "surPlace"){
                    let poids_ttl = obj.article.poids * obj.qty
                    if (poids_ttl < 100 ) prix_fdp = 8
                    if (poids_ttl >= 100 && poids_ttl < 500) prix_fdp = 10
                    if (poids_ttl >= 500 && poids_ttl < 1000) prix_fdp = 12
                    if (poids_ttl >= 1000 && poids_ttl < 1500) prix_fdp = 14
                    if (poids_ttl >= 1500 && poids_ttl < 2000) prix_fdp = 16
                    if (poids_ttl >= 2000 && poids_ttl < 2500 ) prix_fdp = 18
                    if (poids_ttl >= 2500 && poids_ttl < 3000) prix_fdp = 20
                    if (poids_ttl >= 3000 && poids_ttl < 3500) prix_fdp = 22
                    if (poids_ttl >= 3500 ) prix_fdp += 24
                }
                prix_fdp_AT = (prix_fdp * 1.2 * 100)/100
                prix_ttl_panier_horsfdp = prix_ttl
                prix_ttl = Math.round((prix_ttl+prix_fdp_AT) * 100)/100
                prix_panier_HT = Math.round((prix_ttl_panier_horsfdp/1.2)*100)/100
                const prix={
                    prix_ttl_panier_HT:prix_panier_HT,
                    prix_ttl_panier:prix_ttl_panier_horsfdp,
                    prix_ttl_fdp_HT:prix_fdp,
                    prix_ttl_fdp:prix_fdp_AT,
                    prix_ttl_HT:prix_panier_HT+prix_fdp,
                    prix_ttl:prix_ttl
                }
                console.log("ditmoiqueçasortmtnlatoutalafin")
                const saveLivraison = {adresse:req.body.adresseLivraison, modeDeLivraison:req.body.modeDeLivraison}
                User.updateOne({_id:req.params.id},{$set: {saveLivraison:saveLivraison, savePrix:prix}}, (err, docs)=>{if(err) console.log(err);}).then(()=>{
                    res.send()
                })
            }
            // })
        })
        .then(() => {console.log("mais pas ici par contre...")
        })
    });
}

exports.newCommand = (req, res) => {
    let materiels_crea = []
    const req_id = req.params.id
    const id_paypal = req.body.idp
    const mdp = req.body.mdp
    //console.log("ça commence")
    User.find({_id:req_id}, (err, docs) => {
        docsancien = docs[0]
        console.log(docs[0])
        // console.log(paypalCtrl.getFacture(id_paypal))
        if(id_paypal===-1){
            console.log("commande passée")
        }
        paypalCtrl.getFacture(mdp,id_paypal).then((resul)=>{
            //console.log('lafautquejefassesupergaffecarlerreursembleici')
            //console.log(resul)
            //console.log(resul.purchase_units)
            // resul.id = '1M6567226T5919711'
            User.find({"comande":{$elemMatch:{"paypal_info.id":resul.id}}},{"comande":{"$elemMatch":{"paypal_info.id":resul.id}}}, (err, docs)=>{
                //console.log("docs")
                let etat = 0
                if (mdp==="paypal"){
                    console.log(docs)
                    etat = 1
                    // resul.purchase_units[0].amount.value = 0
                    if (docs[0]!=null){
                        console.log("l'idpaypal est pas bon")
                        etat = -2
                        console.log(docs[0])
                        id_double = docs[0].comande[0].id
                    }
                    else if (resul.purchase_units[0].amount.value != docsancien.savePrix.prix_ttl){
                        console.log("payé : " + resul.purchase_units[0].amount.value + " devait payer " + docsancien.savePrix.prix_ttl)
                        etat = -1
                        console.log('le prix payer est pas le bon')
                    }
                }
                //console.log(resul.purchase_units[0].amount.value)
                User.updateOne({_id:req.params.id}, {$set: {pannier: []}}, (err, docs) =>{
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
                            let retire = -1 * object.qty
                            Thing.updateOne({_id:object.articleID},{$inc:{qty:retire}}, (err, docs) =>{
                                console.log("ceci est l'update")
                                if(err) console.log(err);
                                else{console.log(docs)}
                            })
                        })
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
                            moyendepayement: req.body.mdp,
                        }
                        ajd = new Date()
                        // console.log(ajd.getDate())
                        //console.log(new Date(ajd.toISOString()))
                        ajd = new Date(ajd.toISOString())
                        numerocommande = String(docsancien.comande.length + 1)
                        for(var i = 0; numerocommande.length <= 5; i++){
                            numerocommande = "0"+numerocommande
                        }
                        let livraison
                        //console.log("c la que ca pose pb enfaite ca casse les couilles la !")
                        //console.log(docsancien)
                        if(docsancien.saveLivraison.modeDeLivraison === "domicile"){
                            livraison = {
                                adresse:{
                                    adresse:docsancien.saveLivraison.adresse.streetNumber + " " + docsancien.saveLivraison.adresse.street,
                                    city:docsancien.saveLivraison.adresse.city,
                                    postCode:docsancien.saveLivraison.adresse.postCode
                                },
                                modeDeLivraison:docsancien.saveLivraison.modeDeLivraison
                            }
                        }else{
                            livraison = docsancien.saveLivraison
                        }
                        let lacommande = {
                            id:docsancien._id+numerocommande,
                            materiels: materiels_crea,
                            livraison: livraison,
                            facture: facture_crea,
                            prix: docsancien.savePrix,
                            date: ajd,
                            etat: etat,
                            nometat: ["En attente de paiement","Traitement en cours", "En préparation", "Envoyée", "Recue", "Annulée", "erreur payement (100)", "erreur payement (101)"],
                            fini: false,
                            pdf: '',
                            suiviColissimo: ''
                        }
                        if(mdp==="paypal"){
                            const paypal = {
                                id:resul.id,
                                prix_payer:resul.purchase_units[0].amount.value,
                            }
                            if(etat == -2){
                                paypal.doublon = id_double
                            }
                            lacommande.paypal_info=paypal
                        }

                        const colissimo  = require('colissimo') ({ contract_number: process.env.COLISSIMO_USER, password: process.env.COLISSIMO_MDP })
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
                                address: livraison.adresse.adresse,
                                to_know: '',
                                zip_code: livraison.adresse.postCode,
                                city: livraison.adresse.city,
                                phone_number: req.body.mobile.toString().split("33")[1],
                                mail: req.body.email
                            },
                            product: {
                                identifier: numerocommande,				// used to identify a package when you received it. its displayed before the company_name
                                insurance_value: 0,			            // the amount to insure
                                weight: poids/1000					    // in kg, default 1
                            },
                            format: {
                                commercial_name: process.env.COLISSIMO_USER               // used for notifications
                            }
                        }).then (infos => {
                            //console.log (infos)
                            lacommande.pdf = infos.label
                            lacommande.suiviColissimo = infos.tracking_number
                            User.updateOne({_id:req_id}, {$push:{comande:lacommande}}, (err, docs) =>{
                                if(err) console.log(err);
                                //console.log(docs)
                                //VerifID

                                res.send()

                                //console.log(poids)
                                
                                sendEmail(0, {mdp:mdp, prix:lacommande.prix.prix_ttl}, req.body.email)

                                // async function main() {
                                //     let transporter = nodemailer.createTransport({
                                //         host: "ssl0.ovh.net",
                                //         port: 465,
                                //         secure: true,
                                //         auth: {
                                //             user: "boutique@stodac.fr",
                                //             pass: "C3ci3stUnMotD3P@ss3Long",
                                //         },
                                //     });
                                //     if
                                //     let info = await transporter.sendMail({
                                //         from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
                                //         to: req.body.email, // list of receivers
                                //         subject: "Nouvelle commande", // Subject line
                                //         text: "Bonjour, votre commande à bien étée prise en compte. Nous faisons de notre mieux afin de vous livrer dans les plus brefs délais. \n Merci de votre confiance !", // plain text body
                                //         html: `<b>Bonjour, votre commande à bien étée prise en compte. Nous faisons de notre mieux afin de vous livrer dans les plus brefs délais. <br> Votre commande est disponible <a href='http://localhost:8080/mesCommandes/'>ici</a><br> Vous pouvez dès maintenant suivre votre commande avec le numéro de suivi ${lacommande.suiviColissimo} <br> Merci de votre confiance !</b>`, // html body
                                //     });
                                //     console.log("Message sent: %s", info.messageId);
                                // }
                                // main().catch(console.error);
                            })
                        }).catch (error => {
                            console.error ("error : ", error)
                            //console.log(poids)
                            //c moche mais ca fais le taff :(
                            lacommande.pdf = ""
                            lacommande.suiviColissimo = "error"
                            lacommande.errorColissimo = error
                            User.updateOne({_id:req_id}, {$push:{comande:lacommande}}, (err, docs) =>{
                                if(err) console.log(err);
                                res.send()
                                // async function main() {
                                //     let transporter = nodemailer.createTransport({
                                //         host: "ssl0.ovh.net",
                                //         port: 465,
                                //         secure: true,
                                //         auth: {
                                //             user: "boutique@stodac.fr",
                                //             pass: "C3ci3stUnMotD3P@ss3Long",
                                //         },
                                //     });
                                //     let info = await transporter.sendMail({
                                //         from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
                                //         to: req.body.email, // list of receivers
                                //         subject: "Nouvelle commande", // Subject line
                                //         text: "Bonjour, votre commande à bien étée prise en compte. Nous faisons de notre mieux afin de vous livrer dans les plus brefs délais. \n Merci de votre confiance !", // plain text body
                                //         html: `<b>Bonjour, votre commande à bien étée prise en compte. Nous faisons de notre mieux afin de vous livrer dans les plus brefs délais. <br> Votre commande est disponible <a href='http://localhost:8080/mesCommandes/'>ici</a><br> Vous pouvez dès maintenant suivre votre commande avec le numéro de suivi ${lacommande.suiviColissimo} <br> Merci de votre confiance !</b>`, // html body
                                //     });
                                //     console.log("Message sent: %s", info.messageId);
                                // }
                                // main().catch(console.error);
                                sendEmail(0, {mdp:mdp, prix:lacommande.prix.prix_ttl},req.body.email)
                            })
                        })
                    }
                })
            })
        });
    })
}

function sendEmail(etat, options, adressemail){
    async function main() {
        let transporter = nodemailer.createTransport({
            host: "ssl0.ovh.net",
            port: 465,
            secure: true,
            auth: {
                user: process.env.MAIL_USER, // generated ethereal user
                pass: process.env.MAIL_MDP,
            },
        });
        let email = {
            from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
            to: adressemail, // list of receivers
        }
        if(etat===0){ //options = {mdp}
            email.subject="Nouvelle commande"
            if (options.mdp === "paypal"){                
                email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre commande à bien étée prise en compte.</p>
            <p>Cette dernière est accessible <a href="https://stodac.fr/login/mesCommandes">ici</a>.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>` // html body
            }else if (options.mdp === "cheque"){
                email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre commande à bien étée prise en compte.</p>
            <p>Pour passer a l'étape suivante vous devez envoyer un cheque (ordre : AMC EST) d'une valeur de ${options.prix}€ ou le deposer directement à l'adresse suivante : 11 Bis Rue de Lorraine à Damelevières, 54360.</p>
            <p> Votre commande est disponible <a href="https://stodac.fr/login/mesCommandes">ici</a>.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>`
            }else{
                email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre commande à bien étée prise en compte.</p>
            <p>Pour passer a l'étape suivante vous devez effectuer un virement d'une valeure de ${options.prix}€ (IBAN : FR7614707090263112192565018 BIC : CCBPFRPPMTZ).</p>
            <p>Votre commande est disponible <a href="https://stodac.fr/login/mesCommandes">ici</a>.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>`
            }
        }else if (etat===1){
            email.subject = "Payement pris en compte" // Subject line
            email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre payement a bien été pris en compte.</p>
            <p>Nous faisons de notre mieux afin de traiter votre commande les plus brefs délais.</p>
            <p>Votre commande est disponible <a href="https://stodac.fr/login/mesCommandes">ici</a>.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>` // html body
        }else if (etat === 2){ //options = {suiviColissimo}
            email.subject = "Votre commande est en preparation"
            email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre commande est en préparation.</p>
            <p>Nous faisons de notre mieux afin de traiter votre commande les plus brefs délais.</p>
            <p>Votre commande est disponible <a href="https://stodac.fr/login/mesCommandes">ici</a>.</p>
            <p>Vous pouvez dès maintenant suivre votre commande avec le numéro de suivi ${options.suiviColissimo}.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>` // html body
        }else if (etat === 3){ //options = {suiviColissimo}
            email.subject = "Votre commande est envoyée"
            email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre commande a été envoyée.</p>
            <p>Votre commande est disponible <a href="https://stodac.fr/login/mesCommandes">ici</a>.</p>
            <p>Vous pouvez dès maintenant suivre votre commande avec le numéro de suivi ${options.suiviColissimo}.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>`
        }else if (etat === 5){
            email.subject = "Votre commande est anulée"
            email.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            border: 0;
        }
        body{
            font-family: sans-serif;
            height: 100%;
            padding: 3%;
            max-width: 800px;

        }
        .titre{
            padding: 14px;
            text-align: center;
            font-size: 4em;
        }
        .banner{
            color: white;
            background-color: #007057;
            height: 100px;
            width: 100%;
        }
        #wrapper{
            width: 100%;

        }
        #main{
            padding: 100px 15% 50px 15%;
            width: 100%;
        }
        header{
            width: 100%;
        }
        p{
            font-size: 1em;
            margin: 0 0 10px 20px;
        }

        footer ul{
            margin: 10px;
            text-decoration: none;
            list-style: none;
        }
        footer{
            width: 100%;
            position: relative;
            bottom: 0px;
            margin-top: 50px;
            height: 150px;
            color: white;
            z-index: 5;
        }
        footer .img{
            height: 40px;
        }
        #payements{
            width: 40%;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        #bottom_footer {
            padding-top: 10px;
            background-color: #007057;
            height: 100px;
            text-align: center;
        }
        .footerLink{
            padding: 10px;
            text-decoration: none;
            color: white;
        }
        

    </style>
</head>
<body>
    <div id="wrapper">
        <header>
            <div class="banner">
                <h1 class="titre">Stodac.</h1>
            </div>
        </header>
        <div id="main">
            <p>Bonjour,</p>
            <p>Votre commande a été anulée.</p>
            <p>Merci de votre confiance !</p>
        </div>
        <footer>
                <div id="bottom_footer">
                    <ul style="text-align: center">
                      <li>
                        <a href="https://www.stodac.fr/MentionsLegales/" class="footerLink">
                          Mention légales
                      </a>
                      </li>
                      <li>
                        <a href="https://www.stodac.fr/conditionsGeneralesDeVente/" class="footerLink">
                          Conditions générales de vente
                        </a>
                      </li>
                      <li>
                        © Stodac tous droits réservés
                      </li>
                    </ul>
            
                </div>
            
        </footer>
    </div>
</body>
</html>`
        }
        let info = await transporter.sendMail(email);
        console.log("Message sent: %s", info.messageId);
    }
    main().catch(console.error);
}

exports.resetpanier = (req, res) => {
    console.log("ça passe")
    //console.log(req.body.length)
    User.updateOne({_id:req.params.id}, {$set: {pannier: []}}, (err, docs) =>{
        if(err) console.log(err);
    });
    res.send();
}

exports.setEtat = (req, res) => {
    console.log("----------")
    console.log(req.body)
    console.log("----------")
    User.find({_id:req.params.id},{admin:1},(err,docs)=>{
        console.log(docs)
        if(docs[0].admin){
            User.findOne({"comande":{$elemMatch:{"id":req.body.id}}},{"comande":{"$elemMatch":{"id":req.body.id}}}, (err, docs) =>{
                console.log(req.body)
                User.updateOne({"comande":{$elemMatch:{"id":req.body.id}}}, {$set:{"comande.$.etat":req.body.etat}}, (err, docsapres)=>{
                    console.log(docsapres)
                    console.log(docs.comande[0].etat)
                    console.log(req.body.etat)
                    if(docs.comande[0].etat < req.body.etat){
                        sendEmail(req.body.etat,{suiviColissimo:docs.comande[0].suiviColissimo},docs.comande[0].facture.email)
                    }
                    res.send()
                })
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
