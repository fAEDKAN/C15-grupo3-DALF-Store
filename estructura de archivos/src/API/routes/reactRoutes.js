var express = require('express');
var router = express.Router();

const {list} = require('../controllers/reactController')

//  /api/productReact 

router.get('/', list)

module.exports = router