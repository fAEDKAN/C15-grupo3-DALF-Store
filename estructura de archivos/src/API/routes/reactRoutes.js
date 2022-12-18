var express = require('express');
var router = express.Router();

const {list, last, userList} = require('../controllers/reactController')

//  /api/reactProductsAndUsers

router.get('/', list)
router.get('/userList', userList)
router.get('/last', last)

module.exports = router