const express = require('express');
const axios = require("axios")
const nodemailer = require("nodemailer")
const User = require('../models/User')
const bcrypt = require('bcrypt');


exports.getColissimoToken = (req, res) => {
    axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
        "login": process.env.COLISSIMO_USER,
        "password": process.env.COLISSIMO_MDP,
    }).then((response) => {
        res.send(response.data)
    })
}

exports.contactEmail = (req, res) => {
    async function main() {
        let transporter = nodemailer.createTransport({
            host: "ssl0.ovh.net",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER, // generated ethereal user
                pass: process.env.MAIL_MDP, // generated ethereal password
            },
        });
        let info = await transporter.sendMail({
            from: '"Stodac.fr" <boutique@stodac.fr>', // sender address
            to: ["contact@stodac.fr"/*, "emilien.ginko@gmail.com"*/], // list of receivers
            subject: "Nouvelle demande", // Subject line
            text: "empty", // plain text body
            html: `    <body style='width:100%; display: flex; justify-content: center;'>\n 
                       <div width='300px'>\n 
                           <div style='width: 300px; height: 100px; text-align: center; background-color: #078A6C; color: white; padding: 5%;'>\n 
                               <h1 >Stodac</h1>\n 
                           </div> \n 
                           <p>Client : ${req.body.mail},</p>\n 
                           <p> message : ${req.body.message}</p>\n 
                       </div>\n 
                   </body>`
        });
        console.log("Message sent: %s", info.messageId);
    }

    main().then(res.status(201)).catch(console.error);

}

exports.changePasswordReques = (req,res)=>{
    async function changePswMail(adress,link) {
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
            to: adress, // list of receivers
            subject: "Mot de passe oublié", // Subject line
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
                            <p>Vous avez demandés une réinitialisation de votre mot de passe.</p>
                            <p>Si vous êtes à l'origine de cette demande, cliquez <a href="${link}">ici</a>.</p>
                            <p>Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer ce message.</p>
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
    if (req.body.email){
        User.find({email: req.body.email},(err,docs)=>{
            if(err) return res.status(500).json({message: "introuvable"})
            if(docs.length == 0) return res.status(500).json({message: "introuvable"})
            bcrypt.hash(toString(docs[0]._id), 10)
                .then( hash => {
                    changePswMail(docs[0].email, `https://stodac.fr/resetpasswordform/${docs[0].email}/${hash}`)
                }).catch(()=>{ return res.status(500).json({message: "introuvable"})
            })
            return res.status(201).json({ message : 'email envoyé'})
        })
    }
}

exports.changePassword = (req, res)=>{
    User.find({email: req.body.email},(err,docs)=> {
        bcrypt.compare(toString(docs[0]._id), req.body.id).then(valid =>{
            if(!valid) {
                return res.status(500)
            }
            bcrypt.hash(req.body.password, 10).then(hash =>{

                User.updateOne({_id :docs[0]._id}, {$set:{password:hash}}, (err, docs)=>{
                    if(err) res.status(401).json({ error : "Impossible changer le mot de passe" });
                    return res.status(200).json({status:"OK"});
                })

            }).catch(()=>{
                return res.status(400).json({error : "impossible de hacher le mot de passe"})
            })
        })
    })
}