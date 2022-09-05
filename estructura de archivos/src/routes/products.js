var express = require('express');
var router = express.Router();

//Middlewares
const uploadProducts =require('../middlewares/uploadFilesProducts');

//Controllers
const {productDetail, productsLoad, create, productEdit, update, cart, cartAdress, cartPay, destroy} = require('../controllers/productsController')


/* /products */

router.get('/productDetail/:id', productDetail)

/* Products load */
router.get('/productsLoad', productsLoad)
router.post('/productsLoad',uploadProducts.array('imagen'), create)

/* Product edit */
router.get('/productEdit/:id', productEdit)
router.put('/update/:id', update)


/*x */
router.get('/cart', cart)


/* rutas temporales*/ 
router.get('/cartAdress', cartAdress)
router.get('/cartPay', cartPay)
router.delete('/deleteProduct/:id', destroy)



module.exports = router;