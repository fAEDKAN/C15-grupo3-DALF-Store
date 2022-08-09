var express = require('express');
var router = express.Router();

const { cart, productDetail } = require('../controllers/productsController')

/* /products */

router
    .get('/cart', cart)
    .get('/productDetail', productDetail)

module.exports = router;