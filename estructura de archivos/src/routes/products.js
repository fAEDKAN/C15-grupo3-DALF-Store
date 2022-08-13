var express = require('express');
var router = express.Router();

const { productDetail, productsLoad } = require('../controllers/productsController')

/* /products */

router.get('/productDetail', productDetail)
router.get('/productsLoad', productsLoad)

module.exports = router;