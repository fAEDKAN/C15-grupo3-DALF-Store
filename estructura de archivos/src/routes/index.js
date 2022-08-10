var express = require('express');
var router = express.Router();

const { index, cart, cartAdress, cartPay } = require('../controllers/indexController')

/* / */
router.get('/', index)
router.get('/cart', cart)
/* rutas temporales*/ 
router.get('/cartAdress', cartAdress)
router.get('/cartPay', cartPay)

module.exports = router;