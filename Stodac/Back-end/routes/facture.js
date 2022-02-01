const express = require('express');
const router = express.Router();
const factureCtrl = require('../controller/facture');
const auth = require('../middleware/auth')
//const authAdmin = require('../middleware/auth-admin')

router.get('/create/:id', auth, factureCtrl.createFactue)

module.exports = router;