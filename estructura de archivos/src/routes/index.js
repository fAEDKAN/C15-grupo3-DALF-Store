var express = require('express');
var router = express.Router();

//CONTROLLERS
const {index, search, categoriesFilter, sectionsFilter, allSectionsProducts, brandsFilter, contact} = require('../controllers/indexController');

//HOME
router.get('/', index);

//SEARCH
router.get('/search', search);
router.get('/categorias/:x',categoriesFilter)
router.get('/section/:x', sectionsFilter)
router.get('/allProducts', allSectionsProducts)
router.get('/brand/:x', brandsFilter)

//OTHERS
router.get("/contact", contact)
module.exports = router; 