const express = require('express');
const router = express.Router();
const usrCtrl = require('../controller/user');

router.post('/signup/', usrCtrl.signup);
router.post('/login/mail/', usrCtrl.loginByMail);
router.post('/login/admin/', usrCtrl.loginAdmin);

const auth = require('../middleware/auth')
const authAdmin = require('../middleware/auth-admin')

router.post('/MA/:id', auth, usrCtrl.changeAddress)
router.post('/addpanier/:id', auth, usrCtrl.addpanier)
router.post('/addCommande/:id', auth, usrCtrl.newCommand)

// Get routes

router.get('/', authAdmin, usrCtrl.getAllUsers);

router.get('/getinfos/:id/', auth, usrCtrl.getInfos);

router.get('/resetpanier/:id', auth, usrCtrl.resetpanier)

router.get('/facture/:id/:numfacture', auth, usrCtrl.getFacture)


// PATCH 

router.patch('/:id', auth, usrCtrl.updateUser);

// DELETE

router.delete('/:id', auth, usrCtrl.deleteUser);

module.exports = router;
