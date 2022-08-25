var express = require('express');
var router = express.Router();

const { login, register,shopping, userStore } = require('../controllers/userController')

/* /users */
router
    .get('/login', login)
    .get('/register', register)
    .post('/register', userStore)
    .get('/shopping', shopping)

module.exports = router;