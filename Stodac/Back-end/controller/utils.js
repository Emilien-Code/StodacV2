const express = require('express');
const axios = require("axios")


exports.getColissimoToken = (req, res) => {
    axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
        "login": process.env.COLISSIMO_USER,
        "password": process.env.COLISSIMO_MDP,
    }).then((response) => {
        res.send(response.data)
    })
}

