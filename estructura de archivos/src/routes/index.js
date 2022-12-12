var express = require('express');
var router = express.Router();

//CONTROLLERS
const {index, search, categoriesFilter} = require('../controllers/indexController');

//HOME
router.get('/', index);

//SEARCH
router.get('/search', search);
router.get('/categorias/:x',categoriesFilter)
module.exports = router; 