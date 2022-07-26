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
router.post('/allFacture/:id/', auth, usrCtrl.getAllCommandes)
router.post('/changeEtat/:id', auth, usrCtrl.setEtat)
router.post(`/changeAdm/:id`, auth, usrCtrl.ChangeTout)

// Get routes

router.get('/', authAdmin, usrCtrl.getAllUsers);

router.get('/getinfos/:id/', auth, usrCtrl.getInfos);

router.get('/resetpanier/:id', auth, usrCtrl.resetpanier)

router.get('/facture/:id/:numfacture', auth, usrCtrl.getFacture)

router.get('/factureAdm/:id/:numfacture', auth, usrCtrl.getFactureAdmin)

router.get('/verify/:mail/*', usrCtrl.verify)



// PATCH 

router.patch('/:id', auth, usrCtrl.updateUser);

// DELETE

router.delete('/:id', auth, usrCtrl.deleteUser);

module.exports = router;
