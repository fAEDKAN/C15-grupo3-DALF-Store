var express = require('express');
var router = express.Router();

const { productDetail, productsLoad, productEdit, cart, cartAdress, cartPay} = require('../controllers/productsController')

/* /products */

router.get('/productDetail', productDetail)
router.get('/productsLoad', productsLoad)
router.get('/productEdit', productEdit)
router.get('/cart', cart)
/* rutas temporales*/ 
router.get('/cartAdress', cartAdress)
router.get('/cartPay', cartPay)

module.exports = router;