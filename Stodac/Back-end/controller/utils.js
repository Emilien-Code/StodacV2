const express = require('express');
const axios = require("axios")
const nodemailer = require("nodemailer")

exports.getColissimoToken = (req, res) => {
    axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
        "login": process.env.COLISSIMO_USER,
        "password": process.env.COLISSIMO_MDP,
    }).then((response) => {
        res.send(response.data)
    })
}

exports.contactEmail = (req, res) => {
    console.log(req.body)


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




/*
*
*
*
* async function main() {
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
                        text: "Bonjour, vous venez de créer un compte sur la boutique en ligne Stodac.fr, merci de votre confiance !", // plain text body
                        html: "    <body style='width:100%; display: flex; justify-content: center;'>\n" +
                            "       <div width='300px'>\n" +
                            "           <div style='width: 300px; height: 100px; text-align: center; background-color: #078A6C; color: white; padding: 5%;'>\n" +
                            "               <h1 >Stodac</h1>\n" +
                            "           </div> \n" +
                            "           <p>Bonjour,</p>\n" +
                            "           <p>Vous venez de créer un compte sur la boutique en ligne <a href='https://www.stodac.fr' target=\"_blank\">Stodac.fr</a>.</p>\n" +
                            "           <p>Merci de votre confiance !</p>\n" +
                            "       </div>\n" +
                            "   </body>"
                    });

                    console.log("Message sent: %s", info.messageId);
                    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

                    // Preview only available when sending through an Ethereal account
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                }

                main().catch(console.error);
*
*
* */