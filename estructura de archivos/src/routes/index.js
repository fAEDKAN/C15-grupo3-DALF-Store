var express = require('express');
var router = express.Router();

//Controllers
const {index, search} = require('../controllers/indexController')

/* / */
router.get('/', index)
router.get('/search', search);

module.exports = router;