const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controller/stuff');

const multer = require('../middleware/multer-config');
//const authAdmin = require('../middleware/auth-admin')

// Get routes

router.get('/all/:nb/:sk', stuffCtrl.getAllStuff);

router.get('/manufacturer/:manufacturer/', stuffCtrl.getByManufacturer);

router.get('/manufacturer/', stuffCtrl.getManufacturer);

router.get('/categories/', stuffCtrl.getCategories);

router.get('/category/:category', stuffCtrl.getByCategories);

router.get('/reference/:ref/:nb', stuffCtrl.getByReference)

router.get('/product/:id', stuffCtrl.getById)

router.get('/name/:id/:nb', stuffCtrl.getByName)

router.get('/count/', stuffCtrl.getNb)


// Create

//router.post('/', authAdmin, multer, stuffCtrl.createNewStuff);
router.post('/', multer, stuffCtrl.createNewStuff);


// PATCH 

//router.put('/:id', authAdmin, multer, stuffCtrl.updateStuff);
router.put('/:id', multer, stuffCtrl.updateStuff);

// DELETE

//router.delete('/:id', authAdmin, stuffCtrl.deleteStuff);
router.delete('/:id', stuffCtrl.deleteStuff);

module.exports = router;
