var express = require('express');
var router = express.Router();

const {productDetail, productsLoad, productEdit, cart, cartAdress, cartPay, productDelete} = require('../controllers/productsController')

/* /products */

router.get('/productDetail', productDetail)

/*carga de productos */
router.get('/productsLoad', productsLoad)
router.post('/productsLoad', store)

/*edicion de productos */
router.get('/productEdit', productEdit)
router.get('/cart', cart)
/* rutas temporales*/ 
router.get('/cartAdress', cartAdress)
router.get('/cartPay', cartPay)
router.delete('/productDelete', productDelete)

module.exports = router;