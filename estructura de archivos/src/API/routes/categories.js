var express = require('express');
var router = express.Router();

const {list} = require('../controllers/apiCategories')

//  /api/categories 

router.get('/', list)

module.exports = router