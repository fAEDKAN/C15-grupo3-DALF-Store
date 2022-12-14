const express = require('express');
const router = express.Router();

const {list, addItem, removeAllItems, removeItem} = require('../../API/controllers/cartController');

//api

router
    .get('/', list)
    .post('/', addItem)
    .delete('/:id', removeItem)
    .delete('/all', removeAllItems)

module.exports = router;