// ************ Require's ************
const express = require('express');
const router = express.Router();

const {list,addItem,removeItem,removeQuantity,removeAllItem} = require('../../API/controllers/cartController');

router
    .get('/', list)
    .post('/',addItem)
    .delete('/:id',removeQuantity)
    .delete('/item/:id',removeItem)
    .delete('/all',removeAllItem)
module.exports = router;
