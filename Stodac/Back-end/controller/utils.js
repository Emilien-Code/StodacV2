const express = require('express');
const axios = require("axios")


exports.getColissimoToken = (req, res) => {
    axios.post('https://ws.colissimo.fr/widget-point-retrait/rest/authenticate.rest', {
        "login": "895244",
        "password": "MDP",
    }).then((response) => {
        res.send(response.data)
    })
}

