var express = require('express');
var router = express.Router();

//CONTROLLERS
const {index, search} = require('../controllers/indexController');

//HOME
router.get('/', index);

//SEARCH
router.get('/search', search);

module.exports = router;