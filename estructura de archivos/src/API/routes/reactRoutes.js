var express = require('express');
var router = express.Router();

const {list, last} = require('../controllers/reactController')

//  /api/reactProductsAndUsers

router.get('/', list)
router.get('/last', last)

module.exports = router