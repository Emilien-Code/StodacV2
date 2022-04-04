const express = require('express');
const router = express.Router();
const paypalCtrl = require('../controller/paypal');

router.get('/testtoken/', paypalCtrl.testToken)
// router.get('/demandetoken/', paypalCtrl.demandeToken)

module.exports = router;