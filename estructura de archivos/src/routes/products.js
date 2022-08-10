var express = require('express');
var router = express.Router();

const { productDetail } = require('../controllers/productsController')

/* /products */

router.get('/productDetail', productDetail)

module.exports = router;