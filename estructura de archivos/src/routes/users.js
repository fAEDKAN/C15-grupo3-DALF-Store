var express = require('express');
var router = express.Router();

const { login, register,shopping } = require('../controllers/userController')

/* /users */
router
    .get('/login', login)
    .get('/register', register)
    .get('/shopping', shopping)

module.exports = router;