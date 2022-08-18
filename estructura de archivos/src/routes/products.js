var express = require('express');
var router = express.Router();

const { productDetail, productsLoad, productEdit } = require('../controllers/productsController')

/* /products */

router.get('/productDetail', productDetail)
router.get('/productsLoad', productsLoad)
router.get('/productEdit', productEdit)

module.exports = router;