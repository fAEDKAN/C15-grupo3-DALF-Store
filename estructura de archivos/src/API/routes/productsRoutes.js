var express = require('express');
var router = express.Router();

//REQUIRE CONTROLLERS - MIDDLEWARES - VALIDATIONS
const {productsList, productDetail, create, update, destroy} = require('../controllers/productsController');
const uploadProducts =require('../../middlewares/uploadFilesProducts');
const adminCheck =require('../../middlewares/adminCheck');
const userSessionCheck =require('../../middlewares/userSessionCheck');
const productValidator = require('../../validations/productValidator');

router.get('/', productsList);
//router.get('/image/:img', image);
router.get('/productDetail/:id', productDetail);
router.post('/productsLoad', uploadProducts.array('imagen'), productValidator, create);
router.put('/update/:id', uploadProducts.array('imagen'),productValidator, update);
router.delete('/deleteProduct/:id', destroy);

module.exports = router;