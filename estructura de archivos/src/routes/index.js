var express = require('express');
var router = express.Router();

//CONTROLLERS
const {index, search, navBarFilter} = require('../controllers/indexController');

//HOME
router.get('/', index);

//SEARCH
router.get('/search', search);
router.get('/filter/:x',navBarFilter)
module.exports = router; 