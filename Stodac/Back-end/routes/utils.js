const express = require('express');
const router = express.Router();
const utilsCtrl = require('../controller/utils.js');
const stuffCtrl = require("../controller/stuff");

//router.get('/', utilsCtrl.getColissimoToken)
router.get('/token', utilsCtrl.getColissimoToken);
router.post('/mail', utilsCtrl.contactEmail);


module.exports = router