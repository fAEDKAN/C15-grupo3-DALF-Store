var express = require('express');
var router = express.Router();

const {productDetail, productsLoad, create, productEdit, cart, cartAdress, cartPay, destroy} = require('../controllers/productsController')



/* /products */

router.get('/productDetail/:id', productDetail)

/* preparado para la correción */
router.get('/productsLoad', productsLoad)
router.post('/productsLoad', create)

/* preparado para la correción */
router.get('/productEdit/:id', productEdit)

/*edicion de productos */
router.get('/cart', cart)

/* rutas temporales*/ 
router.get('/cartAdress', cartAdress)
router.get('/cartPay', cartPay)
router.delete('/deleteProduct/:id', destroy)



module.exports = router;