
const express = require('express');
const router = express.Router();


const {getTotals} = require('../controllers/indexController');

// /api

router
    .get('/totals', getTotals)

module.exports = router;