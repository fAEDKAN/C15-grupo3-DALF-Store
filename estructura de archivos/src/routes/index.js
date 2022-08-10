var express = require('express');
var router = express.Router();

const { index, cart } = require('../controllers/indexController')

/* / */
router.get('/', index)
router.get('/cart', cart)

module.exports = router;