// ************ Require's ************
const express = require('express');
const router = express.Router();

const {list,addItem,removeAllItems,removeQuantity} = require('../../API/controllers/cartController');

router
    .get('/', list)
    .post('/',addItem)
    .delete('/:id',removeQuantity)
    .delete('/all',removeAllItems)

module.exports = router;
